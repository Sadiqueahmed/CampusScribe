import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma, User } from '@campus-scribe/database';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthService {
    static async register(data: any) {
        const { email, password, name, role, university } = data;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                name,
                role: role || 'BUYER',
                university
            }
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

        return { user: this.sanitizeUser(user), token };
    }

    static async login(data: any) {
        const { email, password } = data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error('Invalid credentials');

        if (!user.passwordHash) {
            throw new Error('This account was created with Google. Please use Google Login.');
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) throw new Error('Invalid credentials');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

        return { user: this.sanitizeUser(user), token };
    }

    static async googleLogin(idToken: string) {
        let ticket;
        try {
            ticket = await googleClient.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
        } catch (error) {
            throw new Error('Invalid Google token');
        }

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            throw new Error('Invalid Google payload');
        }

        const { email, name } = payload;

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    name: name || 'User',
                    role: 'BUYER',
                    authProvider: 'GOOGLE'
                }
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

        return { user: this.sanitizeUser(user), token };
    }

    static async getProfile(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) throw new Error('User not found');
        return this.sanitizeUser(user);
    }

    // Sync Clerk user to database
    static async syncClerkUser(data: { clerkId: string; email: string; name: string; avatar?: string }) {
        const { clerkId, email, name, avatar } = data;

        // Check if user already exists by clerkId
        let user = await prisma.user.findUnique({ where: { clerkId } });

        if (!user) {
            // Check if user exists by email
            user = await prisma.user.findUnique({ where: { email } });
            
            if (user) {
                // Link existing user to Clerk
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        clerkId,
                        avatar: avatar || user.avatar,
                        authProvider: 'CLERK'
                    }
                });
            } else {
                // Create new user
                user = await prisma.user.create({
                    data: {
                        clerkId,
                        email,
                        name: name || 'User',
                        role: 'BUYER',
                        avatar,
                        authProvider: 'CLERK'
                    }
                });
            }
        } else {
            // Update existing Clerk user
            user = await prisma.user.update({
                where: { id: user.id },
                data: {
                    email: email || user.email,
                    name: name || user.name,
                    avatar: avatar || user.avatar
                }
            });
        }

        // Generate JWT token for API access
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

        return { user: this.sanitizeUser(user), token };
    }

    private static sanitizeUser(user: User) {
        const { passwordHash, ...safeUser } = user;
        return safeUser;
    }
}
