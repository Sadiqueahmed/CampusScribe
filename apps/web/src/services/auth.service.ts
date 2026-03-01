import { api } from './api';
import type { LoginCredentials, RegisterCredentials, AuthResponse, UserProfile } from '../types/user.types';

interface ClerkUserData {
    clerkId: string;
    email: string;
    name: string;
    avatar?: string;
}

export const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    googleLogin: async (idToken: string) => {
        const response = await api.post<AuthResponse>('/auth/google', { idToken });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    register: async (credentials: RegisterCredentials) => {
        const response = await api.post<AuthResponse>('/auth/register', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    // Sync Clerk user with backend
    syncClerkUser: async (clerkData: ClerkUserData) => {
        const response = await api.post<{ data: { user: UserProfile; token: string } }>('/auth/clerk/sync', clerkData);
        return response.data.data.user;
    },

    getProfile: async () => {
        const response = await api.get<{ data: UserProfile }>('/auth/profile');
        return response.data.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('clerk_token');
    }
};
