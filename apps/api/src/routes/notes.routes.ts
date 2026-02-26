import { Router } from 'express';
import { NotesController } from '../controllers/notes.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', NotesController.getAllNotes);
router.get('/trending', NotesController.getTrendingNotes);
router.get('/featured', NotesController.getFeaturedNotes);
router.get('/categories', NotesController.getCategories);
router.get('/tags', NotesController.getTags);
router.get('/seller/:sellerId', NotesController.getNotesBySeller);
router.get('/search', NotesController.getAllNotes);
router.get('/:id/related', NotesController.getRelatedNotes);
router.get('/:id', NotesController.getNoteById);

// Protected routes
router.post('/', authMiddleware as any, NotesController.createNote as any);
router.put('/:id', authMiddleware as any, NotesController.updateNote as any);
router.delete('/:id', authMiddleware as any, NotesController.deleteNote as any);
router.post('/:id/download', authMiddleware as any, NotesController.recordDownload as any);

export default router;
