import { Router } from 'express';
import { NotesController } from '../controllers/notes.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', NotesController.getAllNotes);
router.get('/:id', NotesController.getNoteById);

// Protected route
router.post('/', authMiddleware as any, NotesController.createNote as any);

export default router;
