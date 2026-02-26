import { api } from './api';

export interface Message {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
    isRead: boolean;
}

export interface Conversation {
    id: string;
    participant: {
        id: string;
        name: string;
        avatar?: string;
    };
    lastMessage?: Message;
    unreadCount: number;
    updatedAt: string;
}

export const messageService = {
    // Get user's conversations
    getConversations: async (): Promise<Conversation[]> => {
        const response = await api.get('/conversations');
        return response.data.data;
    },

    // Start a new conversation
    startConversation: async (participantId: string, initialMessage: string): Promise<Conversation> => {
        const response = await api.post('/conversations', { participantId, initialMessage });
        return response.data.data;
    },

    // Get messages in a conversation
    getMessages: async (conversationId: string): Promise<{ messages: Message[]; conversation: Conversation }> => {
        const response = await api.get(`/conversations/${conversationId}`);
        return response.data.data;
    },

    // Send a message
    sendMessage: async (conversationId: string, content: string): Promise<Message> => {
        const response = await api.post(`/conversations/${conversationId}/messages`, { content });
        return response.data.data;
    },

    // Mark conversation as read
    markAsRead: async (conversationId: string): Promise<void> => {
        await api.put(`/conversations/${conversationId}/read`);
    },

    // Get unread message count
    getUnreadCount: async (): Promise<number> => {
        const response = await api.get('/conversations/unread-count');
        return response.data.data.count;
    }
};
