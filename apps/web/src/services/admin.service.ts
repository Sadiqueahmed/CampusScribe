import { api } from './api';

export const adminService = {
    // Get dashboard statistics
    getDashboardStats: async (timeRange: string = '7d') => {
        const response = await api.get(`/admin/dashboard?range=${timeRange}`);
        return response.data;
    },

    // Get all users
    getUsers: async (params?: { page?: number; limit?: number; search?: string; role?: string }) => {
        const response = await api.get('/admin/users', { params });
        return response.data;
    },

    // Update user
    updateUser: async (userId: string, data: any) => {
        const response = await api.put(`/admin/users/${userId}`, data);
        return response.data;
    },

    // Get all notes (admin view)
    getNotes: async (params?: { page?: number; limit?: number; status?: string }) => {
        const response = await api.get('/admin/notes', { params });
        return response.data;
    },

    // Approve note
    approveNote: async (noteId: string) => {
        const response = await api.put(`/admin/notes/${noteId}/approve`);
        return response.data;
    },

    // Reject note
    rejectNote: async (noteId: string, reason: string) => {
        const response = await api.put(`/admin/notes/${noteId}/reject`, { reason });
        return response.data;
    },

    // Feature/unfeature note
    toggleFeatureNote: async (noteId: string, featured: boolean) => {
        const response = await api.put(`/admin/notes/${noteId}/feature`, { featured });
        return response.data;
    },

    // Get verification requests
    getVerifications: async () => {
        const response = await api.get('/admin/verifications');
        return response.data;
    },

    // Approve seller verification
    approveVerification: async (userId: string) => {
        const response = await api.post(`/admin/verifications/${userId}/approve`);
        return response.data;
    },

    // Reject seller verification
    rejectVerification: async (userId: string, reason: string) => {
        const response = await api.post(`/admin/verifications/${userId}/reject`, { reason });
        return response.data;
    },

    // Get site analytics
    getAnalytics: async (timeRange: string = '30d') => {
        const response = await api.get(`/admin/analytics?range=${timeRange}`);
        return response.data;
    },

    // Create category
    createCategory: async (data: { university: string; course: string; subject: string }) => {
        const response = await api.post('/admin/categories', data);
        return response.data;
    },

    // Update category
    updateCategory: async (categoryId: string, data: any) => {
        const response = await api.put(`/admin/categories/${categoryId}`, data);
        return response.data;
    },

    // Delete category
    deleteCategory: async (categoryId: string) => {
        const response = await api.delete(`/admin/categories/${categoryId}`);
        return response.data;
    }
};
