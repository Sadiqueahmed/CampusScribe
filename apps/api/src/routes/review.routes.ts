import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { authMiddleware as authenticate } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/notes/:noteId', ReviewController.getNoteReviews);
router.get('/sellers/:sellerId', ReviewController.getSellerReviews);

// Protected routes
router.post('/notes/:noteId', authenticate, ReviewController.createReview);
router.get('/notes/:noteId/can-review', authenticate, ReviewController.canReview);
router.put('/:reviewId', authenticate, ReviewController.updateReview);
router.delete('/:reviewId', authenticate, ReviewController.deleteReview);

export default router;
