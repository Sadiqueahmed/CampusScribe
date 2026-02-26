import { prisma } from '@campus-scribe/database';

export class MessageService {
    static async getConversations(userId: string) {
        const conversations = await prisma.conversation.findMany({
            where: {
                participants: {
                    some: {
                        userId
                    }
                }
            },
            include: {
                participants: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true
                            }
                        }
                    }
                },
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                    include: {
                        sender: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        messages: {
                            where: {
                                isRead: false,
                                senderId: {
                                    not: userId
                                }
                            }
                        }
                    }
                }
            },
            orderBy: { updatedAt: 'desc' }
        });

        return conversations;
    }

    static async getConversation(conversationId: string, userId: string) {
        // Verify user is part of this conversation
        const conversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                participants: {
                    some: {
                        userId
                    }
                }
            },
            include: {
                participants: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true
                            }
                        }
                    }
                },
                messages: {
                    orderBy: { createdAt: 'asc' },
                    include: {
                        sender: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true
                            }
                        }
                    }
                }
            }
        });

        if (!conversation) {
            throw new Error('Conversation not found or you do not have access');
        }

        // Mark messages as read
        await prisma.message.updateMany({
            where: {
                conversationId,
                senderId: {
                    not: userId
                },
                isRead: false
            },
            data: {
                isRead: true
            }
        });

        return conversation;
    }

    static async createConversation(userId: string, participantId: string) {
        // Check if conversation already exists
        const existingConversation = await prisma.conversation.findFirst({
            where: {
                AND: [
                    {
                        participants: {
                            some: {
                                userId
                            }
                        }
                    },
                    {
                        participants: {
                            some: {
                                userId: participantId
                            }
                        }
                    }
                ]
            }
        });

        if (existingConversation) {
            return existingConversation;
        }

        const conversation = await prisma.conversation.create({
            data: {
                participants: {
                    create: [
                        { userId },
                        { userId: participantId }
                    ]
                }
            },
            include: {
                participants: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true
                            }
                        }
                    }
                }
            }
        });

        return conversation;
    }

    static async sendMessage(conversationId: string, senderId: string, content: string) {
        // Verify sender is part of this conversation
        const conversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                participants: {
                    some: {
                        userId: senderId
                    }
                }
            }
        });

        if (!conversation) {
            throw new Error('Conversation not found or you do not have access');
        }

        const message = await prisma.message.create({
            data: {
                conversationId,
                senderId,
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

        // Update conversation updatedAt
        await prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() }
        });

        return message;
    }

    static async getUnreadCount(userId: string) {
        const count = await prisma.message.count({
            where: {
                conversation: {
                    participants: {
                        some: {
                            userId
                        }
                    }
                },
                senderId: {
                    not: userId
                },
                isRead: false
            }
        });

        return count;
    }

    static async deleteConversation(conversationId: string, userId: string) {
        // Verify user is part of this conversation
        const conversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                participants: {
                    some: {
                        userId
                    }
                }
            }
        });

        if (!conversation) {
            throw new Error('Conversation not found or you do not have access');
        }

        // Remove user from conversation (soft delete for user)
        await prisma.conversationParticipant.deleteMany({
            where: {
                conversationId,
                userId
            }
        });

        return { message: 'Conversation removed from your list' };
    }
}
