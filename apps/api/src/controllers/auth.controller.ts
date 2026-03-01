import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const data = await AuthService.register(req.body);
            res.status(201).json({ message: 'User registered successfully', data });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const data = await AuthService.login(req.body);
            res.status(200).json({ message: 'Login successful', data });
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }

    static async googleLogin(req: Request, res: Response) {
        try {
            const { idToken } = req.body;
            if (!idToken) {
                return res.status(400).json({ error: 'idToken is required' });
            }
            const data = await AuthService.googleLogin(idToken);
            res.status(200).json({ message: 'Google login successful', data });
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }

    // Clerk sync endpoint - sync Clerk user to database
    static async clerkSync(req: Request, res: Response) {
        try {
            const { clerkId, email, name, avatar } = req.body;
            if (!clerkId) {
                return res.status(400).json({ error: 'clerkId is required' });
            }
            const data = await AuthService.syncClerkUser({ clerkId, email, name, avatar });
            res.status(200).json({ data });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getProfile(req: AuthRequest, res: Response) {
        try {
            const profile = await AuthService.getProfile(req.user.id);
            res.status(200).json({ data: profile });
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }
}
