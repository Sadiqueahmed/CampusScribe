import { Response } from 'express';
import { CartService } from '../services/cart.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class CartController {
    static async getCart(req: AuthRequest, res: Response) {
        try {
            const cart = await CartService.getCart(req.user.id);
            res.status(200).json({ data: cart });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async addToCart(req: AuthRequest, res: Response) {
        try {
            const { noteId } = req.body;
            if (!noteId) {
                return res.status(400).json({ error: 'Note ID is required' });
            }

            const cartItem = await CartService.addToCart(req.user.id, noteId);
            res.status(201).json({ 
                message: 'Item added to cart',
                data: cartItem 
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async removeFromCart(req: AuthRequest, res: Response) {
        try {
            const { itemId } = req.params;
            const result = await CartService.removeFromCart(req.user.id, itemId);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async clearCart(req: AuthRequest, res: Response) {
        try {
            const result = await CartService.clearCart(req.user.id);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getCartCount(req: AuthRequest, res: Response) {
        try {
            const count = await CartService.getCartCount(req.user.id);
            res.status(200).json({ data: { count } });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
