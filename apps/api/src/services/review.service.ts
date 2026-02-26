import { prisma } from '@campus-scribe/database';

export class ReviewService {
    static async createReview(data: {
        userId: string;
        noteId: string;
        rating: number;
        comment?: string;
    }) {
        // Validate rating
        if (data.rating < 1 || data.rating > 5) {
            throw new Error('Rating must be between 1 and 5');
        }

        // Check if note exists and user has purchased it
        const purchase = await prisma.purchase.findFirst({
            where: {
                buyerId: data.userId,
                noteId: data.noteId,
                status: 'COMPLETED'
            }
        });

        if (!purchase) {
            throw new Error('You can only review notes you have purchased');
        }

        // Check if user already reviewed this note
        const existingReview = await prisma.review.findFirst({
            where: {
                userId: data.userId,
                noteId: data.noteId
            }
        });

        if (existingReview) {
            throw new Error('You have already reviewed this note');
        }

        const review = await prisma.review.create({
            data: {
                userId: data.userId,
                noteId: data.noteId,
                rating: data.rating,
                comment: data.comment
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true
                    }
                }
            }
        });

        return review;
    }

    static async getNoteReviews(noteId: string) {
        const reviews = await prisma.review.findMany({
            where: {
                noteId,
                isVisible: true
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        university: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Calculate average rating
        const averageRating = reviews.length > 0
            ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviews.length
            : 0;

        return {
            reviews,
            averageRating,
            totalReviews: reviews.length,
            ratingDistribution: this.calculateRatingDistribution(reviews)
        };
    }

    static async getSellerReviews(sellerId: string) {
        const reviews = await prisma.review.findMany({
            where: {
                note: {
                    sellerId
                },
                isVisible: true
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true
                    }
                },
                note: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        const averageRating = reviews.length > 0
            ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviews.length
            : 0;

        return {
            reviews,
            averageRating,
            totalReviews: reviews.length
        };
    }

    static async updateReview(reviewId: string, userId: string, data: {
        rating?: number;
        comment?: string;
    }) {
        // Validate rating if provided
        if (data.rating && (data.rating < 1 || data.rating > 5)) {
            throw new Error('Rating must be between 1 and 5');
        }

        const review = await prisma.review.findFirst({
            where: {
                id: reviewId,
                userId
            }
        });

        if (!review) {
            throw new Error('Review not found or you do not have permission to update it');
        }

        const updatedReview = await prisma.review.update({
            where: { id: reviewId },
            data: {
                ...data,
                updatedAt: new Date()
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true
                    }
                }
            }
        });

        return updatedReview;
    }

    static async deleteReview(reviewId: string, userId: string) {
        const review = await prisma.review.findFirst({
            where: {
                id: reviewId,
                userId
            }
        });

        if (!review) {
            throw new Error('Review not found or you do not have permission to delete it');
        }

        await prisma.review.delete({
            where: { id: reviewId }
        });

        return { message: 'Review deleted successfully' };
    }

    static async canReview(userId: string, noteId: string) {
        const purchase = await prisma.purchase.findFirst({
            where: {
                buyerId: userId,
                noteId,
                status: 'COMPLETED'
            }
        });

        const existingReview = await prisma.review.findFirst({
            where: {
                userId,
                noteId
            }
        });

        return {
            canReview: !!purchase && !existingReview,
            hasPurchased: !!purchase,
            hasReviewed: !!existingReview
        };
    }

    private static calculateRatingDistribution(reviews: any[]) {
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach((review: any) => {
            distribution[review.rating as keyof typeof distribution]++;
        });
        return distribution;
    }
}
