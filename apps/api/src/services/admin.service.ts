import { prisma } from '@campus-scribe/database';

export class AdminService {
    // User Management
    static async getAllUsers(query: any = {}) {
        const where: any = {};
        if (query.role) where.role = query.role;
        if (query.isVerified !== undefined) where.isVerified = query.isVerified === 'true';
        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { email: { contains: query.search, mode: 'insensitive' } }
            ];
        }

        const skip = query.page ? (parseInt(query.page) - 1) * (parseInt(query.limit) || 20) : 0;
        const take = parseInt(query.limit) || 20;

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    university: true,
                    isVerified: true,
                    isSellerVerified: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: {
                        select: {
                            notes: true,
                            purchases: true,
                            reviews: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take
            }),
            prisma.user.count({ where })
        ]);

        return { users, total, page: parseInt(query.page) || 1, totalPages: Math.ceil(total / take) };
    }

    static async updateUser(userId: string, data: any) {
        const { role, isVerified, isSellerVerified } = data;
        
        const updateData: any = {};
        if (role) updateData.role = role;
        if (isVerified !== undefined) updateData.isVerified = isVerified;
        if (isSellerVerified !== undefined) {
            updateData.isSellerVerified = isSellerVerified;
            if (isSellerVerified) {
                updateData.sellerVerifiedAt = new Date();
            }
        }

        return prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                isVerified: true,
                isSellerVerified: true,
                updatedAt: true
            }
        });
    }

    // Note Management
    static async getAllNotes(query: any = {}) {
        const where: any = {};
        if (query.isApproved !== undefined) where.isApproved = query.isApproved === 'true';
        if (query.isFeatured !== undefined) where.isFeatured = query.isFeatured === 'true';
        if (query.search) {
            where.OR = [
                { title: { contains: query.search, mode: 'insensitive' } },
                { description: { contains: query.search, mode: 'insensitive' } }
            ];
        }

        const skip = query.page ? (parseInt(query.page) - 1) * (parseInt(query.limit) || 20) : 0;
        const take = parseInt(query.limit) || 20;

        const [notes, total] = await Promise.all([
            prisma.note.findMany({
                where,
                include: {
                    seller: { select: { id: true, name: true, email: true } },
                    category: true,
                    _count: { select: { reviews: true, purchases: true } }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take
            }),
            prisma.note.count({ where })
        ]);

        return { notes, total, page: parseInt(query.page) || 1, totalPages: Math.ceil(total / take) };
    }

    static async approveNote(noteId: string) {
        return prisma.note.update({
            where: { id: noteId },
            data: { isApproved: true },
            include: {
                seller: { select: { id: true, name: true, email: true } },
                category: true
            }
        });
    }

    static async rejectNote(noteId: string, reason: string) {
        // In a real app, you might want to store the rejection reason
        // For now, we'll just not approve it or delete it
        return prisma.note.update({
            where: { id: noteId },
            data: { isApproved: false },
            include: {
                seller: { select: { id: true, name: true, email: true } },
                category: true
            }
        });
    }

    static async featureNote(noteId: string, isFeatured: boolean = true) {
        return prisma.note.update({
            where: { id: noteId },
            data: { isFeatured },
            include: {
                seller: { select: { id: true, name: true } },
                category: true
            }
        });
    }

    // Verification Requests
    static async getVerificationRequests(status: string = 'pending') {
        const where: any = {};
        if (status === 'pending') {
            where.isSellerVerified = false;
            where.sellerVerifiedAt = null;
        } else if (status === 'approved') {
            where.isSellerVerified = true;
        }

        return prisma.user.findMany({
            where,
            select: {
                id: true,
                email: true,
                name: true,
                university: true,
                bio: true,
                isSellerVerified: true,
                sellerVerifiedAt: true,
                createdAt: true,
                _count: {
                    select: {
                        notes: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    static async approveVerification(userId: string) {
        return prisma.user.update({
            where: { id: userId },
            data: {
                isSellerVerified: true,
                sellerVerifiedAt: new Date()
            },
            select: {
                id: true,
                email: true,
                name: true,
                isSellerVerified: true,
                sellerVerifiedAt: true
            }
        });
    }

    // Analytics
    static async getAnalytics() {
        const [
            totalUsers,
            totalNotes,
            totalPurchases,
            totalRevenue,
            recentUsers,
            recentNotes,
            recentPurchases,
            topSellers,
            topNotes
        ] = await Promise.all([
            prisma.user.count(),
            prisma.note.count(),
            prisma.purchase.count({ where: { status: 'COMPLETED' } }),
            prisma.purchase.aggregate({
                where: { status: 'COMPLETED' },
                _sum: { amount: true }
            }),
            prisma.user.findMany({
                orderBy: { createdAt: 'desc' },
                take: 5,
                select: { id: true, name: true, email: true, createdAt: true }
            }),
            prisma.note.findMany({
                orderBy: { createdAt: 'desc' },
                take: 5,
                include: {
                    seller: { select: { id: true, name: true } },
                    _count: { select: { purchases: true } }
                }
            }),
            prisma.purchase.findMany({
                where: { status: 'COMPLETED' },
                orderBy: { createdAt: 'desc' },
                take: 5,
                include: {
                    buyer: { select: { id: true, name: true } },
                    note: { select: { id: true, title: true } }
                }
            }),
            prisma.user.findMany({
                where: { role: 'SELLER' },
                orderBy: { totalEarnings: 'desc' },
                take: 5,
                select: {
                    id: true,
                    name: true,
                    totalEarnings: true,
                    _count: { select: { notes: true } }
                }
            }),
            prisma.note.findMany({
                where: { isApproved: true },
                orderBy: { purchaseCount: 'desc' },
                take: 5,
                include: {
                    seller: { select: { id: true, name: true } },
                    _count: { select: { reviews: true } }
                }
            })
        ]);

        return {
            overview: {
                totalUsers,
                totalNotes,
                totalPurchases,
                totalRevenue: totalRevenue._sum.amount || 0
            },
            recentActivity: {
                users: recentUsers,
                notes: recentNotes,
                purchases: recentPurchases
            },
            topPerformers: {
                sellers: topSellers,
                notes: topNotes
            }
        };
    }

    // Category Management
    static async createCategory(data: { university: string; course: string; subject: string }) {
        return prisma.category.create({
            data
        });
    }

    static async updateCategory(categoryId: string, data: { university?: string; course?: string; subject?: string }) {
        return prisma.category.update({
            where: { id: categoryId },
            data
        });
    }

    static async deleteCategory(categoryId: string) {
        // Check if category has notes
        const notesCount = await prisma.note.count({
            where: { categoryId }
        });

        if (notesCount > 0) {
            throw new Error('Cannot delete category with existing notes');
        }

        return prisma.category.delete({
            where: { id: categoryId }
        });
    }
}
