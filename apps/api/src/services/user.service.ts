import { prisma } from '@campus-scribe/database';

export class UserService {
    static async getProfile(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                university: true,
                avatar: true,
                bio: true,
                isSellerVerified: true,
                sellerVerifiedAt: true,
                totalEarnings: true,
                availableBalance: true,
                createdAt: true,
                _count: {
                    select: {
                        notes: true,
                        purchases: true,
                        reviews: true
                    }
                }
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    static async updateProfile(userId: string, data: {
        name?: string;
        university?: string;
        bio?: string;
        avatar?: string;
    }) {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                ...data,
                updatedAt: new Date()
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                university: true,
                avatar: true,
                bio: true,
                isSellerVerified: true,
                createdAt: true
            }
        });

        return user;
    }

    static async getDashboardStats(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                totalEarnings: true,
                availableBalance: true,
                _count: {
                    select: {
                        notes: true,
                        purchases: true
                    }
                }
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Get recent purchases
        const recentPurchases = await prisma.purchase.findMany({
            where: { buyerId: userId },
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                note: {
                    select: {
                        id: true,
                        title: true,
                        price: true,
                        seller: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        // Get recent sales (if user is a seller)
        const recentSales = await prisma.purchase.findMany({
            where: {
                note: {
                    sellerId: userId
                }
            },
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                note: {
                    select: {
                        id: true,
                        title: true,
                        price: true
                    }
                },
                buyer: {
                    select: {
                        name: true
                    }
                }
            }
        });

        // Get total notes sold
        const totalSold = await prisma.purchase.count({
            where: {
                note: {
                    sellerId: userId
                },
                status: 'COMPLETED'
            }
        });

        return {
            stats: {
                totalEarnings: user.totalEarnings,
                availableBalance: user.availableBalance,
                totalNotes: user._count.notes,
                totalPurchases: user._count.purchases,
                totalSold
            },
            recentPurchases,
            recentSales
        };
    }

    static async getOrderHistory(userId: string) {
        const purchases = await prisma.purchase.findMany({
            where: { buyerId: userId },
            orderBy: { createdAt: 'desc' },
            include: {
                note: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        fileUrl: true,
                        seller: {
                            select: {
                                id: true,
                                name: true,
                                university: true
                            }
                        }
                    }
                }
            }
        });

        return purchases;
    }

    static async getSalesHistory(userId: string) {
        const sales = await prisma.purchase.findMany({
            where: {
                note: {
                    sellerId: userId
                }
            },
            orderBy: { createdAt: 'desc' },
            include: {
                note: {
                    select: {
                        id: true,
                        title: true,
                        price: true
                    }
                },
                buyer: {
                    select: {
                        id: true,
                        name: true,
                        university: true
                    }
                }
            }
        });

        return sales;
    }

    static async requestSellerVerification(userId: string) {
        // In a real app, this would create a verification request
        // For now, we'll just mark the user as pending verification
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                role: 'SELLER'
            },
            select: {
                id: true,
                name: true,
                role: true,
                isSellerVerified: true
            }
        });

        return user;
    }

    static async getPublicProfile(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                university: true,
                avatar: true,
                bio: true,
                isSellerVerified: true,
                sellerVerifiedAt: true,
                _count: {
                    select: {
                        notes: true,
                        reviews: true
                    }
                }
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Get seller's notes
        const notes = await prisma.note.findMany({
            where: {
                sellerId: userId,
                isApproved: true
            },
            take: 6,
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                _count: {
                    select: {
                        reviews: true
                    }
                }
            }
        });

        // Get average rating
        const reviews = await prisma.review.findMany({
            where: {
                note: {
                    sellerId: userId
                }
            },
            select: {
                rating: true
            }
        });

        const averageRating = reviews.length > 0
            ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0)
            : 0;


        return {
            ...user,
            notes,
            averageRating,
            totalReviews: reviews.length
        };
    }
}
