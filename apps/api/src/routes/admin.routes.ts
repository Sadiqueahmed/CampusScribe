import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// All admin routes require authentication and admin role
router.use(authMiddleware as any);

// User Management
router.get('/users', AdminController.getAllUsers);
router.put('/users/:userId', AdminController.updateUser);

// Note Management
router.get('/notes', AdminController.getAllNotes);
router.put('/notes/:noteId/approve', AdminController.approveNote);
router.put('/notes/:noteId/reject', AdminController.rejectNote);
router.put('/notes/:noteId/feature', AdminController.featureNote);

// Verification Requests
router.get('/verifications', AdminController.getVerificationRequests);
router.post('/verifications/:userId/approve', AdminController.approveVerification);

// Analytics
router.get('/analytics', AdminController.getAnalytics);

// Category Management
router.post('/categories', AdminController.createCategory);
router.put('/categories/:categoryId', AdminController.updateCategory);
router.delete('/categories/:categoryId', AdminController.deleteCategory);

export default router;
