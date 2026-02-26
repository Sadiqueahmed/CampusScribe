import { Request, Response } from 'express';
import { NotesService } from '../services/notes.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class NotesController {
    static async getAllNotes(req: Request, res: Response) {
        try {
            const result = await NotesService.getAllNotes(req.query);
            res.status(200).json({ 
                success: true,
                data: result.notes,
                pagination: {
                    total: result.total,
                    page: result.page,
                    totalPages: result.totalPages,
                    limit: parseInt(req.query.limit as string) || 10
                }
            });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static async getNoteById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = (req as AuthRequest).user?.id;
            const ipAddress = req.ip;
            const userAgent = req.headers['user-agent'];

            const note = await NotesService.getNoteById(id, userId, ipAddress, userAgent);
            if (!note) {
                return res.status(404).json({ success: false, error: 'Note not found' });
            }
            res.status(200).json({ success: true, data: note });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static async createNote(req: AuthRequest, res: Response) {
        try {
            const sellerId = req.user.id;
            const noteData = { ...req.body, sellerId };

            const newNote = await NotesService.createNote(noteData);
            res.status(201).json({ 
                success: true,
                message: 'Note created successfully', 
                data: newNote 
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    static async updateNote(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            const sellerId = req.user.id;

            const updatedNote = await NotesService.updateNote(id, sellerId, req.body);
            res.status(200).json({ 
                success: true,
                message: 'Note updated successfully', 
                data: updatedNote 
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    static async deleteNote(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            const sellerId = req.user.id;

            const result = await NotesService.deleteNote(id, sellerId);
            res.status(200).json({ success: true, message: result.message });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    static async getTrendingNotes(req: Request, res: Response) {
        try {
            const limit = parseInt(req.query.limit as string) || 10;
            const notes = await NotesService.getTrendingNotes(limit);
            res.status(200).json({ success: true, data: notes });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static async getFeaturedNotes(req: Request, res: Response) {
        try {
            const limit = parseInt(req.query.limit as string) || 6;
            const notes = await NotesService.getFeaturedNotes(limit);
            res.status(200).json({ success: true, data: notes });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static async getRelatedNotes(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const limit = parseInt(req.query.limit as string) || 4;
            const notes = await NotesService.getRelatedNotes(id, limit);
            res.status(200).json({ success: true, data: notes });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static async getCategories(req: Request, res: Response) {
        try {
            const categories = await NotesService.getCategories();
            res.status(200).json({ success: true, data: categories });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static async getTags(req: Request, res: Response) {
        try {
            const tags = await NotesService.getTags();
            res.status(200).json({ success: true, data: tags });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static async getNotesBySeller(req: Request, res: Response) {
        try {
            const { sellerId } = req.params;
            const notes = await NotesService.getNotesBySeller(sellerId);
            res.status(200).json({ success: true, data: notes });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static async recordDownload(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const result = await NotesService.recordDownload(id, userId);
            res.status(200).json({ 
                success: true,
                message: 'Download authorized',
                data: result 
            });
        } catch (error: any) {
            res.status(403).json({ success: false, error: error.message });
        }
    }
}
