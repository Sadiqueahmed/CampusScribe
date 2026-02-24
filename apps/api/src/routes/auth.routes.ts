import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/google', AuthController.googleLogin as any);
router.get('/profile', authMiddleware as any, AuthController.getProfile as any);

export default router;
