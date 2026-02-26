import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';

export class AdminController {
    // User Management
    static async getAllUsers(req: Request, res: Response) {
        try {
            const result = await AdminService.getAllUsers(req.query);
            res.status(200).json({
                success: true,
                data: result.users,
                pagination: {
                    total: result.total,
                    page: result.page,
                    totalPages: result.totalPages,
                    limit: parseInt(req.query.limit as string) || 20
                }
            });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const updatedUser = await AdminService.updateUser(userId, req.body);
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: updatedUser
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Note Management
    static async getAllNotes(req: Request, res: Response) {
        try {
            const result = await AdminService.getAllNotes(req.query);
            res.status(200).json({
                success: true,
                data: result.notes,
                pagination: {
                    total: result.total,
                    page: result.page,
                    totalPages: result.totalPages,
                    limit: parseInt(req.query.limit as string) || 20
                }
            });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static async approveNote(req: Request, res: Response) {
        try {
            const { noteId } = req.params;
            const note = await AdminService.approveNote(noteId);
            res.status(200).json({
                success: true,
                message: 'Note approved successfully',
                data: note
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    static async rejectNote(req: Request, res: Response) {
        try {
            const { noteId } = req.params;
            const { reason } = req.body;
            const note = await AdminService.rejectNote(noteId, reason);
            res.status(200).json({
                success: true,
                message: 'Note rejected successfully',
                data: note
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    static async featureNote(req: Request, res: Response) {
        try {
            const { noteId } = req.params;
            const { isFeatured } = req.body;
            const note = await AdminService.featureNote(noteId, isFeatured);
            res.status(200).json({
                success: true,
                message: isFeatured ? 'Note featured successfully' : 'Note unfeatured successfully',
                data: note
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Verification Requests
    static async getVerificationRequests(req: Request, res: Response) {
        try {
            const { status } = req.query;
            const requests = await AdminService.getVerificationRequests(status as string);
            res.status(200).json({
                success: true,
                data: requests
            });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static async approveVerification(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const user = await AdminService.approveVerification(userId);
            res.status(200).json({
                success: true,
                message: 'Seller verification approved',
                data: user
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Analytics
    static async getAnalytics(req: Request, res: Response) {
        try {
            const analytics = await AdminService.getAnalytics();
            res.status(200).json({
                success: true,
                data: analytics
            });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Category Management
    static async createCategory(req: Request, res: Response) {
        try {
            const category = await AdminService.createCategory(req.body);
            res.status(201).json({
                success: true,
                message: 'Category created successfully',
                data: category
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    static async updateCategory(req: Request, res: Response) {
        try {
            const { categoryId } = req.params;
            const category = await AdminService.updateCategory(categoryId, req.body);
            res.status(200).json({
                success: true,
                message: 'Category updated successfully',
                data: category
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    static async deleteCategory(req: Request, res: Response) {
        try {
            const { categoryId } = req.params;
            await AdminService.deleteCategory(categoryId);
            res.status(200).json({
                success: true,
                message: 'Category deleted successfully'
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    }
}
