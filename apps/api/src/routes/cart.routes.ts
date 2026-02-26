import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { authMiddleware as authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, CartController.getCart);
router.post('/items', authenticate, CartController.addToCart);
router.delete('/items/:itemId', authenticate, CartController.removeFromCart);
router.delete('/', authenticate, CartController.clearCart);
router.get('/count', authenticate, CartController.getCartCount);

export default router;
