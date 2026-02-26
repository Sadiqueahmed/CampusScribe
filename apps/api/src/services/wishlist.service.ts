import { prisma } from '@campus-scribe/database';

export class WishlistService {
    static async getWishlist(userId: string) {
        const wishlist = await prisma.wishlist.findMany({
            where: { userId },
            include: {
                note: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        previewUrl: true,
                        fileType: true,
                        pageCount: true,
                        viewCount: true,
                        createdAt: true,
                        seller: {
                            select: {
                                id: true,
                                name: true,
                                university: true
                            }
                        },
                        category: true,
                        _count: {
                            select: {
                                reviews: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return wishlist;
    }

    static async addToWishlist(userId: string, noteId: string) {
        // Check if note exists and is approved
        const note = await prisma.note.findFirst({
            where: {
                id: noteId,
                isApproved: true
            }
        });

        if (!note) {
            throw new Error('Note not found or not available');
        }

        // Check if already in wishlist
        const existing = await prisma.wishlist.findFirst({
            where: {
                userId,
                noteId
            }
        });

        if (existing) {
            throw new Error('Note already in wishlist');
        }

        const wishlistItem = await prisma.wishlist.create({
            data: {
                userId,
                noteId
            },
            include: {
                note: {
                    select: {
                        id: true,
                        title: true,
                        price: true
                    }
                }
            }
        });

        return wishlistItem;
    }

    static async removeFromWishlist(userId: string, noteId: string) {
        const wishlistItem = await prisma.wishlist.findFirst({
            where: {
                userId,
                noteId
            }
        });

        if (!wishlistItem) {
            throw new Error('Note not found in wishlist');
        }

        await prisma.wishlist.delete({
            where: { id: wishlistItem.id }
        });

        return { message: 'Note removed from wishlist' };
    }

    static async isInWishlist(userId: string, noteId: string) {
        const wishlistItem = await prisma.wishlist.findFirst({
            where: {
                userId,
                noteId
            }
        });

        return !!wishlistItem;
    }

    static async getWishlistCount(userId: string) {
        const count = await prisma.wishlist.count({
            where: { userId }
        });

        return count;
    }
}
