export interface UserProfile {
    id: string;
    email: string;
    name: string;
    role: 'BUYER' | 'SELLER' | 'ADMIN';
    university?: string;
    isVerified: boolean;
    createdAt: string;
}

export interface AuthResponse {
    token?: string;
    message: string;
    data?: UserProfile;
}

export interface LoginCredentials {
    email: string;
    password?: string;
}

export interface RegisterCredentials extends LoginCredentials {
    name: string;
}
