import React, { createContext, useContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { UserProfile } from '../types/user.types';
import { authService } from '../services/auth.service';

interface AuthContextType {
    user: UserProfile | null;
    isLoading: boolean;
    isSignedIn: boolean;
    login: (token: string, userData: UserProfile) => void;
    logout: () => void;
    getToken: () => Promise<string | null>;
    setClerkUser: (user: unknown) => void;
    setClerkSignedIn: (signedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// These will be set by the App component when Clerk user is available
let clerkUser: unknown = null;
let clerkSignedIn = false;

export const setClerkUser = (user: unknown) => {
    clerkUser = user;
};

export const setClerkSignedIn = (signedIn: boolean) => {
    clerkSignedIn = signedIn;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [clerkToken, setClerkToken] = useState<string | null>(null);

    // Function to sync user with backend
    const syncUserWithBackend = useCallback(async (clerkUserData: unknown) => {
        try {
            // Get Clerk JWT token - clerkUserData has getToken method
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const token = await (clerkUserData as any).getToken();
            
            if (token) {
                setClerkToken(token);
                localStorage.setItem('clerk_token', token);
                
                // Sync user data with backend
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const userData = await authService.syncClerkUser({
                    clerkId: (clerkUserData as any).id,
                    email: (clerkUserData as any).primaryEmailAddress?.emailAddress || '',
                    name: (clerkUserData as any).fullName || (clerkUserData as any).firstName || '',
                    avatar: (clerkUserData as any).imageUrl,
                });
                
                setUser(userData);
                setIsSignedIn(true);
            }
        } catch (error) {
            console.error('Failed to sync user with backend:', error);
        }
    }, []);

    // Listen for Clerk user changes (set from App component)
    useEffect(() => {
        const checkAuth = async () => {
            if (clerkUser && clerkSignedIn) {
                await syncUserWithBackend(clerkUser);
            } else {
                localStorage.removeItem('clerk_token');
                setClerkToken(null);
                setUser(null);
                setIsSignedIn(false);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [clerkUser, clerkSignedIn, syncUserWithBackend]);

    const login = (token: string, userData: UserProfile) => {
        localStorage.setItem('clerk_token', token);
        setUser(userData);
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
        localStorage.removeItem('clerk_token');
        setClerkToken(null);
        setUser(null);
        setIsSignedIn(false);
    };

    const getToken = async (): Promise<string | null> => {
        if (clerkToken) return clerkToken;
        
        // Try to get fresh token from Clerk user
        try {
            if (clerkUser) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const token = await (clerkUser as any).getToken();
                if (token) {
                    setClerkToken(token);
                    localStorage.setItem('clerk_token', token);
                }
                return token || null;
            }
            return null;
        } catch {
            return null;
        }
    };

    const value = { 
        user, 
        isLoading, 
        isSignedIn,
        login, 
        logout,
        getToken,
        setClerkUser,
        setClerkSignedIn
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
