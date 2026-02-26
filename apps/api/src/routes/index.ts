import { Router } from 'express';
import authRoutes from './auth.routes';
import notesRoutes from './notes.routes';
import uploadRoutes from './upload.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/notes', notesRoutes);
router.use('/upload', uploadRoutes);
// router.use('/users', usersRoutes);
// router.use('/payments', paymentsRoutes);

export default router;
