export interface UserProfile {
    id: string;
    email: string;
    name: string;
    role: 'BUYER' | 'SELLER' | 'ADMIN';
    university?: string;
    isVerified: boolean;
    createdAt: string;
    bio?: string;
    avatar?: string;
    isSellerVerified: boolean;
    sellerVerifiedAt?: string;
    _count?: {
        notes: number;
        reviews: number;
    };
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
