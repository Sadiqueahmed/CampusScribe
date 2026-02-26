import { api } from './api';

export interface CartItem {
    id: string;
    noteId: string;
    title: string;
    price: number;
    quantity: number;
    seller: {
        id: string;
        name: string;
    };
}

export interface Cart {
    id: string;
    items: CartItem[];
    total: number;
    itemCount: number;
}

export const cartService = {
    // Get user's cart
    getCart: async (): Promise<Cart> => {
        const response = await api.get('/cart');
        return response.data.data;
    },

    // Add item to cart
    addItem: async (noteId: string, quantity: number = 1): Promise<Cart> => {
        const response = await api.post('/cart/items', { noteId, quantity });
        return response.data.data;
    },

    // Update cart item quantity
    updateItem: async (itemId: string, quantity: number): Promise<Cart> => {
        const response = await api.put(`/cart/items/${itemId}`, { quantity });
        return response.data.data;
    },

    // Remove item from cart
    removeItem: async (itemId: string): Promise<Cart> => {
        const response = await api.delete(`/cart/items/${itemId}`);
        return response.data.data;
    },

    // Clear cart
    clearCart: async (): Promise<void> => {
        await api.delete('/cart');
    },

    // Get cart count (for navbar badge)
    getCartCount: async (): Promise<number> => {
        const response = await api.get('/cart/count');
        return response.data.data.count;
    }
};
