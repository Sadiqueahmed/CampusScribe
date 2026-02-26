import { api } from './api';

export interface Review {
    id: string;
    rating: number;
    comment: string;
    user: {
        id: string;
        name: string;
        avatar?: string;
    };
    createdAt: string;
}

export interface ReviewStats {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}

export const reviewService = {
    // Get reviews for a note
    getNoteReviews: async (noteId: string): Promise<{ reviews: Review[]; stats: ReviewStats }> => {
        const response = await api.get(`/notes/${noteId}/reviews`);
        return response.data.data;
    },

    // Create a review
    createReview: async (noteId: string, rating: number, comment: string): Promise<Review> => {
        const response = await api.post(`/notes/${noteId}/reviews`, { rating, comment });
        return response.data.data;
    },

    // Update a review
    updateReview: async (reviewId: string, rating: number, comment: string): Promise<Review> => {
        const response = await api.put(`/reviews/${reviewId}`, { rating, comment });
        return response.data.data;
    },

    // Delete a review
    deleteReview: async (reviewId: string): Promise<void> => {
        await api.delete(`/reviews/${reviewId}`);
    },

    // Get reviews by a seller
    getSellerReviews: async (sellerId: string): Promise<{ reviews: Review[]; stats: ReviewStats }> => {
        const response = await api.get(`/users/${sellerId}/reviews`);
        return response.data.data;
    },

    // Check if user can review (has purchased the note)
    canReview: async (noteId: string): Promise<boolean> => {
        const response = await api.get(`/notes/${noteId}/can-review`);
        return response.data.data.canReview;
    }
};
