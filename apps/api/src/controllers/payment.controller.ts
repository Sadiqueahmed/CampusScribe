import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class PaymentController {
    static async createPaymentIntent(req: AuthRequest, res: Response) {
        try {
            const { noteIds } = req.body;

            if (!noteIds || !Array.isArray(noteIds) || noteIds.length === 0) {
                return res.status(400).json({ error: 'Note IDs are required' });
            }

            const result = await PaymentService.createPaymentIntent(req.user.id, noteIds);
            res.status(200).json({ 
                message: 'Payment intent created',
                data: result 
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async confirmPayment(req: AuthRequest, res: Response) {
        try {
            const { paymentIntentId } = req.body;

            if (!paymentIntentId) {
                return res.status(400).json({ error: 'Payment intent ID is required' });
            }

            const result = await PaymentService.confirmPayment(paymentIntentId);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getPurchaseHistory(req: AuthRequest, res: Response) {
        try {
            const purchases = await PaymentService.getPurchaseHistory(req.user.id);
            res.status(200).json({ data: purchases });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getSalesHistory(req: AuthRequest, res: Response) {
        try {
            const sales = await PaymentService.getSalesHistory(req.user.id);
            res.status(200).json({ data: sales });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async requestPayout(req: AuthRequest, res: Response) {
        try {
            const { amount } = req.body;

            if (!amount || amount <= 0) {
                return res.status(400).json({ error: 'Valid amount is required' });
            }

            const payout = await PaymentService.requestPayout(req.user.id, amount);
            res.status(201).json({ 
                message: 'Payout request submitted',
                data: payout 
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getPayoutHistory(req: AuthRequest, res: Response) {
        try {
            const payouts = await PaymentService.getPayoutHistory(req.user.id);
            res.status(200).json({ data: payouts });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
