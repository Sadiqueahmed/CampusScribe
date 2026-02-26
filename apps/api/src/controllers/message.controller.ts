import { Request, Response } from 'express';
import { MessageService } from '../services/message.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class MessageController {
    static async getConversations(req: AuthRequest, res: Response) {
        try {
            const conversations = await MessageService.getConversations(req.user.id);
            res.status(200).json({ data: conversations });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getConversation(req: AuthRequest, res: Response) {
        try {
            const { conversationId } = req.params;
            const conversation = await MessageService.getConversation(conversationId, req.user.id);
            res.status(200).json({ data: conversation });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async createConversation(req: AuthRequest, res: Response) {
        try {
            const { participantId } = req.body;

            if (!participantId) {
                return res.status(400).json({ error: 'Participant ID is required' });
            }

            if (participantId === req.user.id) {
                return res.status(400).json({ error: 'Cannot create conversation with yourself' });
            }

            const conversation = await MessageService.createConversation(req.user.id, participantId);
            res.status(201).json({ 
                message: 'Conversation created',
                data: conversation 
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async sendMessage(req: AuthRequest, res: Response) {
        try {
            const { conversationId } = req.params;
            const { content } = req.body;

            if (!content || !content.trim()) {
                return res.status(400).json({ error: 'Message content is required' });
            }

            const message = await MessageService.sendMessage(conversationId, req.user.id, content.trim());
            res.status(201).json({ 
                message: 'Message sent',
                data: message 
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getUnreadCount(req: AuthRequest, res: Response) {
        try {
            const count = await MessageService.getUnreadCount(req.user.id);
            res.status(200).json({ data: { count } });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteConversation(req: AuthRequest, res: Response) {
        try {
            const { conversationId } = req.params;
            const result = await MessageService.deleteConversation(conversationId, req.user.id);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
