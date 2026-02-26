import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware as authenticate } from '../middleware/auth.middleware';

const router = Router();

// Protected routes
router.get('/profile', authenticate, UserController.getProfile);
router.put('/profile', authenticate, UserController.updateProfile);
router.get('/dashboard', authenticate, UserController.getDashboard);
router.get('/orders', authenticate, UserController.getOrderHistory);
router.get('/sales', authenticate, UserController.getSalesHistory);
router.post('/verify-seller', authenticate, UserController.requestSellerVerification);

// Public routes
router.get('/:userId', UserController.getPublicProfile);

export default router;
