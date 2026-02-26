import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class ReviewController {
    static async createReview(req: AuthRequest, res: Response) {
        try {
            const { noteId } = req.params;
            const { rating, comment } = req.body;

            if (!rating) {
                return res.status(400).json({ error: 'Rating is required' });
            }

            const review = await ReviewService.createReview({
                userId: req.user.id,
                noteId,
                rating,
                comment
            });

            res.status(201).json({ 
                message: 'Review created successfully',
                data: review 
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getNoteReviews(req: Request, res: Response) {
        try {
            const { noteId } = req.params;
            const reviews = await ReviewService.getNoteReviews(noteId);
            res.status(200).json({ data: reviews });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getSellerReviews(req: Request, res: Response) {
        try {
            const { sellerId } = req.params;
            const reviews = await ReviewService.getSellerReviews(sellerId);
            res.status(200).json({ data: reviews });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateReview(req: AuthRequest, res: Response) {
        try {
            const { reviewId } = req.params;
            const { rating, comment } = req.body;

            const review = await ReviewService.updateReview(reviewId, req.user.id, {
                rating,
                comment
            });

            res.status(200).json({ 
                message: 'Review updated successfully',
                data: review 
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteReview(req: AuthRequest, res: Response) {
        try {
            const { reviewId } = req.params;
            const result = await ReviewService.deleteReview(reviewId, req.user.id);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async canReview(req: AuthRequest, res: Response) {
        try {
            const { noteId } = req.params;
            const result = await ReviewService.canReview(req.user.id, noteId);
            res.status(200).json({ data: result });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
