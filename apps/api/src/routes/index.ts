import { Router } from 'express';
import authRoutes from './auth.routes';
import notesRoutes from './notes.routes';
import uploadRoutes from './upload.routes';
import userRoutes from './user.routes';
import cartRoutes from './cart.routes';
import wishlistRoutes from './wishlist.routes';
import reviewRoutes from './review.routes';
import messageRoutes from './message.routes';
import paymentRoutes from './payment.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/notes', notesRoutes);
router.use('/upload', uploadRoutes);
router.use('/users', userRoutes);
router.use('/cart', cartRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/reviews', reviewRoutes);
router.use('/conversations', messageRoutes);
router.use('/checkout', paymentRoutes);
router.use('/admin', adminRoutes);

export default router;
