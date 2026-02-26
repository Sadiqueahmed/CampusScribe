import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class UserController {
    static async getProfile(req: AuthRequest, res: Response) {
        try {
            const profile = await UserService.getProfile(req.user.id);
            res.status(200).json({ data: profile });
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    static async updateProfile(req: AuthRequest, res: Response) {
        try {
            const { name, university, bio, avatar } = req.body;
            const updatedProfile = await UserService.updateProfile(req.user.id, {
                name,
                university,
                bio,
                avatar
            });
            res.status(200).json({ message: 'Profile updated successfully', data: updatedProfile });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getDashboard(req: AuthRequest, res: Response) {
        try {
            const dashboard = await UserService.getDashboardStats(req.user.id);
            res.status(200).json({ data: dashboard });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getOrderHistory(req: AuthRequest, res: Response) {
        try {
            const orders = await UserService.getOrderHistory(req.user.id);
            res.status(200).json({ data: orders });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getSalesHistory(req: AuthRequest, res: Response) {
        try {
            const sales = await UserService.getSalesHistory(req.user.id);
            res.status(200).json({ data: sales });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async requestSellerVerification(req: AuthRequest, res: Response) {
        try {
            const result = await UserService.requestSellerVerification(req.user.id);
            res.status(200).json({ 
                message: 'Seller verification request submitted successfully',
                data: result 
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getPublicProfile(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const profile = await UserService.getPublicProfile(userId);
            res.status(200).json({ data: profile });
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }
}
