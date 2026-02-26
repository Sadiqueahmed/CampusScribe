import { api } from './api';

export interface WishlistItem {
    id: string;
    noteId: string;
    title: string;
    price: number;
    seller: {
        id: string;
        name: string;
    };
    addedAt: string;
}

export const wishlistService = {
    // Get user's wishlist
    getWishlist: async (): Promise<WishlistItem[]> => {
        const response = await api.get('/wishlist');
        return response.data.data;
    },

    // Add item to wishlist
    addToWishlist: async (noteId: string): Promise<void> => {
        await api.post('/wishlist', { noteId });
    },

    // Remove item from wishlist
    removeFromWishlist: async (noteId: string): Promise<void> => {
        await api.delete(`/wishlist/${noteId}`);
    },

    // Check if note is in wishlist
    checkWishlist: async (noteId: string): Promise<boolean> => {
        const response = await api.get(`/wishlist/check/${noteId}`);
        return response.data.data.isInWishlist;
    },

    // Toggle wishlist status
    toggleWishlist: async (noteId: string): Promise<{ isInWishlist: boolean }> => {
        const response = await api.post(`/wishlist/toggle/${noteId}`);
        return response.data.data;
    },

    // Get wishlist count
    getWishlistCount: async (): Promise<number> => {
        const response = await api.get('/wishlist/count');
        return response.data.data.count;
    }
};
