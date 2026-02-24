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

    private static sanitizeUser(user: User) {
        const { passwordHash, ...safeUser } = user;
        return safeUser;
    }
}
