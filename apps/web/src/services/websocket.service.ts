import { io, Socket } from 'socket.io-client';

interface WebSocketError {
    message: string;
    code?: string;
}

interface MessageData {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    createdAt: string;
}

interface ReadStatusData {
    conversationId: string;
    userId: string;
    readAt: string;
}

interface TypingData {
    conversationId: string;
    userId: string;
    isTyping: boolean;
}

interface UserStatusData {
    userId: string;
    isOnline: boolean;
    lastSeen?: string;
}

class WebSocketService {
    private socket: Socket | null = null;
    private messageCallbacks: Map<string, Function[]> = new Map();

    connect(token: string) {
        this.socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5001', {
            auth: { token },
            transports: ['websocket']
        });

        this.socket.on('connect', () => {
            console.log('WebSocket connected');
        });

        this.socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });

        this.socket.on('error', (error: WebSocketError) => {
            console.error('WebSocket error:', error);
        });

        // Listen for new messages
        this.socket.on('new_message', (data: MessageData) => {
            this.triggerCallbacks('new_message', data);
        });

        // Listen for message read status
        this.socket.on('message_read', (data: ReadStatusData) => {
            this.triggerCallbacks('message_read', data);
        });

        // Listen for typing indicators
        this.socket.on('typing', (data: TypingData) => {
            this.triggerCallbacks('typing', data);
        });

        // Listen for user online status
        this.socket.on('user_status', (data: UserStatusData) => {
            this.triggerCallbacks('user_status', data);
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    joinConversation(conversationId: string) {
        if (this.socket) {
            this.socket.emit('join_conversation', conversationId);
        }
    }

    leaveConversation(conversationId: string) {
        if (this.socket) {
            this.socket.emit('leave_conversation', conversationId);
        }
    }

    sendMessage(conversationId: string, content: string) {
        if (this.socket) {
            this.socket.emit('send_message', { conversationId, content });
        }
    }

    sendTyping(conversationId: string, isTyping: boolean) {
        if (this.socket) {
            this.socket.emit('typing', { conversationId, isTyping });
        }
    }

    markAsRead(conversationId: string) {
        if (this.socket) {
            this.socket.emit('mark_read', { conversationId });
        }
    }

    on(event: string, callback: Function) {
        if (!this.messageCallbacks.has(event)) {
            this.messageCallbacks.set(event, []);
        }
        this.messageCallbacks.get(event)?.push(callback);
    }

    off(event: string, callback: Function) {
        const callbacks = this.messageCallbacks.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    private triggerCallbacks(event: string, data: any) {
        const callbacks = this.messageCallbacks.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
}

export const websocketService = new WebSocketService();
