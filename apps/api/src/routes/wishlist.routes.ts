import { Router } from 'express';
import { WishlistController } from '../controllers/wishlist.controller';
import { authMiddleware as authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, WishlistController.getWishlist);
router.post('/', authenticate, WishlistController.addToWishlist);
router.delete('/:noteId', authenticate, WishlistController.removeFromWishlist);
router.get('/check/:noteId', authenticate, WishlistController.checkWishlist);
router.get('/count', authenticate, WishlistController.getWishlistCount);

export default router;
