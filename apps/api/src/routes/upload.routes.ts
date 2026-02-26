import { Router } from 'express';
import { uploadController } from '../controllers/upload.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// All upload routes require authentication
router.use(authMiddleware);

router.post('/presigned-url', uploadController.getPresignedUrl);
router.post('/complete', uploadController.completeUpload);
router.delete('/file', uploadController.deleteFile);

export default router;
