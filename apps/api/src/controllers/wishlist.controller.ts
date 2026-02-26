import { Response } from 'express';
import { WishlistService } from '../services/wishlist.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class WishlistController {
    static async getWishlist(req: AuthRequest, res: Response) {
        try {
            const wishlist = await WishlistService.getWishlist(req.user.id);
            res.status(200).json({ data: wishlist });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async addToWishlist(req: AuthRequest, res: Response) {
        try {
            const { noteId } = req.body;
            if (!noteId) {
                return res.status(400).json({ error: 'Note ID is required' });
            }

            const wishlistItem = await WishlistService.addToWishlist(req.user.id, noteId);
            res.status(201).json({ 
                message: 'Note added to wishlist',
                data: wishlistItem 
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async removeFromWishlist(req: AuthRequest, res: Response) {
        try {
            const { noteId } = req.params;
            const result = await WishlistService.removeFromWishlist(req.user.id, noteId);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async checkWishlist(req: AuthRequest, res: Response) {
        try {
            const { noteId } = req.params;
            const isInWishlist = await WishlistService.isInWishlist(req.user.id, noteId);
            res.status(200).json({ data: { isInWishlist } });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getWishlistCount(req: AuthRequest, res: Response) {
        try {
            const count = await WishlistService.getWishlistCount(req.user.id);
            res.status(200).json({ data: { count } });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
