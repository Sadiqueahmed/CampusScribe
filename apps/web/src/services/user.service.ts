import { api } from './api';
import { UserProfile } from '../types/user.types';

export const userService = {
    // Get current user profile
    getProfile: async (): Promise<UserProfile> => {
        const response = await api.get('/users/profile');
        return response.data.data;
    },

    // Update user profile
    updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
        const response = await api.put('/users/profile', data);
        return response.data.data;
    },

    // Upload avatar
    uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
        const formData = new FormData();
        formData.append('avatar', file);
        const response = await api.post('/users/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.data;
    },

    // Request seller verification
    requestVerification: async (): Promise<void> => {
        await api.post('/users/verify-seller');
    },

    // Get user dashboard stats
    getDashboard: async (): Promise<any> => {
        const response = await api.get('/users/dashboard');
        return response.data.data;
    },

    // Get order history
    getOrders: async (): Promise<any[]> => {
        const response = await api.get('/users/orders');
        return response.data.data;
    },

    // Get sales history (for sellers)
    getSales: async (): Promise<any[]> => {
        const response = await api.get('/users/sales');
        return response.data.data;
    },

    // Alias for getSales to match the naming in SellerDashboard
    getSalesHistory: async (): Promise<any> => {
        const response = await api.get('/users/sales');
        return response.data;
    },

    // Get public user profile
    getPublicProfile: async (userId: string): Promise<UserProfile> => {
        const response = await api.get(`/users/${userId}`);
        return response.data.data;
    }
};
