import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import { authMiddleware as authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, MessageController.getConversations);
router.post('/', authenticate, MessageController.createConversation);
router.get('/unread-count', authenticate, MessageController.getUnreadCount);
router.get('/:conversationId', authenticate, MessageController.getConversation);
router.post('/:conversationId/messages', authenticate, MessageController.sendMessage);
router.delete('/:conversationId', authenticate, MessageController.deleteConversation);

export default router;
