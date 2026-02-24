import { Request, Response } from 'express';
import { NotesService } from '../services/notes.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class NotesController {
    static async getAllNotes(req: Request, res: Response) {
        try {
            const notes = await NotesService.getAllNotes(req.query);
            res.status(200).json({ data: notes });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getNoteById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const note = await NotesService.getNoteById(id);
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            res.status(200).json({ data: note });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createNote(req: AuthRequest, res: Response) {
        try {
            // Assume user details are placed on req by authMiddleware
            const sellerId = req.user.id;
            const noteData = { ...req.body, sellerId };

            const newNote = await NotesService.createNote(noteData);
            res.status(201).json({ message: 'Note created successfully', data: newNote });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
