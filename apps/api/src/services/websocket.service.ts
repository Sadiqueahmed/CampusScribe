import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { prisma } from '@campus-scribe/database';

interface AuthenticatedSocket extends Socket {
    userId?: string;
}

export class WebSocketService {
    private io: SocketIOServer | null = null;

    initialize(server: HttpServer) {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: process.env.FRONTEND_URL || 'http://localhost:5173',
                methods: ['GET', 'POST']
            }
        });

        this.io.use(async (socket: AuthenticatedSocket, next) => {
            try {
                const token = socket.handshake.auth.token;
                if (!token) {
                    return next(new Error('Authentication error'));
                }

                const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
                socket.userId = decoded.userId;
                next();
            } catch (error) {
                next(new Error('Authentication error'));
            }
        });

        this.io.on('connection', (socket: AuthenticatedSocket) => {
            console.log(`User connected: ${socket.userId}`);

            // Join user's personal room for notifications
            socket.join(`user_${socket.userId}`);

            // Handle joining conversation
            socket.on('join_conversation', (conversationId: string) => {
                socket.join(`conversation_${conversationId}`);
                console.log(`User ${socket.userId} joined conversation ${conversationId}`);
            });

            // Handle leaving conversation
            socket.on('leave_conversation', (conversationId: string) => {
                socket.leave(`conversation_${conversationId}`);
                console.log(`User ${socket.userId} left conversation ${conversationId}`);
            });

            // Handle sending message
            socket.on('send_message', async (data: { conversationId: string; content: string }) => {
                try {
                    const { conversationId, content } = data;

                    // Verify user is part of conversation
                    const conversation = await prisma.conversation.findFirst({
                        where: {
                            id: conversationId,
                            OR: [
                                { buyerId: socket.userId },
                                { sellerId: socket.userId }
                            ]
                        }
                    });

                    if (!conversation) {
                        socket.emit('error', { message: 'Not authorized to send message in this conversation' });
                        return;
                    }

                    // Create message
                    const message = await prisma.message.create({
                        data: {
                            conversationId,
                            senderId: socket.userId!,
                            content
                        },
                        include: {
                            sender: {
                                select: {
                                    id: true,
                                    name: true,
                                    avatar: true
                                }
                            }
                        }
                    });

                    // Update conversation lastMessageAt
                    await prisma.conversation.update({
                        where: { id: conversationId },
                        data: { lastMessageAt: new Date() }
                    });

                    // Broadcast to conversation room
                    this.io?.to(`conversation_${conversationId}`).emit('new_message', message);

                    // Notify other participant
                    const otherUserId = conversation.buyerId === socket.userId 
                        ? conversation.sellerId 
                        : conversation.buyerId;
                    
                    this.io?.to(`user_${otherUserId}`).emit('new_conversation_message', {
                        conversationId,
                        message: message.content,
                        senderName: message.sender.name
                    });

                } catch (error) {
                    console.error('Error sending message:', error);
                    socket.emit('error', { message: 'Failed to send message' });
                }
            });

            // Handle typing indicator
            socket.on('typing', (data: { conversationId: string; isTyping: boolean }) => {
                socket.to(`conversation_${data.conversationId}`).emit('typing', {
                    userId: socket.userId,
                    isTyping: data.isTyping
                });
            });

            // Handle mark as read
            socket.on('mark_read', async (data: { conversationId: string }) => {
                try {
                    await prisma.message.updateMany({
                        where: {
                            conversationId: data.conversationId,
                            senderId: { not: socket.userId },
                            isRead: false
                        },
                        data: { isRead: true, readAt: new Date() }
                    });

                    socket.to(`conversation_${data.conversationId}`).emit('message_read', {
                        userId: socket.userId,
                        conversationId: data.conversationId
                    });
                } catch (error) {
                    console.error('Error marking messages as read:', error);
                }
            });

            // Handle disconnect
            socket.on('disconnect', () => {
                console.log(`User disconnected: ${socket.userId}`);
            });
        });
    }

    // Emit event to specific user
    emitToUser(userId: string, event: string, data: any) {
        this.io?.to(`user_${userId}`).emit(event, data);
    }

    // Emit event to all connected clients
    emitToAll(event: string, data: any) {
        this.io?.emit(event, data);
    }
}

export const websocketService = new WebSocketService();
