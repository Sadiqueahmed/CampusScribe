import { prisma } from '@campus-scribe/database';

export class NotesService {
    static async getAllNotes(query: any = {}) {
        const where: any = { isApproved: true };
        
        if (query.categoryId) where.categoryId = query.categoryId;
        if (query.sellerId) where.sellerId = query.sellerId;
        if (query.university) where.category = { university: query.university };
        if (query.minPrice !== undefined || query.maxPrice !== undefined) {
            where.price = {};
            if (query.minPrice !== undefined) where.price.gte = parseFloat(query.minPrice);
            if (query.maxPrice !== undefined) where.price.lte = parseFloat(query.maxPrice);
        }
        if (query.search) {
            where.OR = [
                { title: { contains: query.search, mode: 'insensitive' } },
                { description: { contains: query.search, mode: 'insensitive' } }
            ];
        }

        const orderBy: any = {};
        if (query.sortBy === 'price') {
            orderBy.price = query.sortOrder === 'asc' ? 'asc' : 'desc';
        } else if (query.sortBy === 'popular') {
            orderBy.purchaseCount = 'desc';
        } else if (query.sortBy === 'views') {
            orderBy.viewCount = 'desc';
        } else {
            orderBy.createdAt = 'desc';
        }

        const skip = query.page ? (parseInt(query.page) - 1) * (parseInt(query.limit) || 10) : 0;
        const take = parseInt(query.limit) || 10;

        const [notes, total] = await Promise.all([
            prisma.note.findMany({
                where,
                include: {
                    seller: { select: { id: true, name: true, university: true, avatar: true, isSellerVerified: true } },
                    category: true,
                    tags: { include: { tag: true } },
                    _count: { select: { reviews: true, purchases: true } }
                },
                orderBy,
                skip,
                take
            }),
            prisma.note.count({ where })
        ]);

        return { notes, total, page: parseInt(query.page) || 1, totalPages: Math.ceil(total / take) };
    }

    static async getNoteById(id: string, userId?: string, ipAddress?: string, userAgent?: string) {
        const note = await prisma.note.findUnique({
            where: { id },
            include: {
                seller: { 
                    select: { 
                        id: true, 
                        name: true, 
                        university: true, 
                        avatar: true, 
                        bio: true,
                        isSellerVerified: true,
                        totalEarnings: true,
                        createdAt: true
                    } 
                },
                category: true,
                tags: { include: { tag: true } },
                reviews: {
                    where: { isVisible: true },
                    include: {
                        user: { select: { id: true, name: true, avatar: true } }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 5
                },
                _count: { select: { reviews: true, purchases: true } }
            }
        });

        if (note) {
            await prisma.note.update({
                where: { id },
                data: { viewCount: { increment: 1 } }
            });

            if (ipAddress) {
                await prisma.noteView.create({
                    data: {
                        noteId: id,
                        userId,
                        ipAddress,
                        userAgent
                    }
                });
            }
        }

        return note;
    }

    static async createNote(data: {
        title: string;
        description: string;
        price: number;
        fileUrl: string;
        fileType: string;
        fileSize: number;
        pageCount?: number;
        previewUrl?: string;
        sellerId: string;
        categoryId: string;
        tagNames?: string[];
    }) {
        const { tagNames, ...noteData } = data;
        
        const note = await prisma.note.create({
            data: noteData,
            include: {
                seller: { select: { id: true, name: true, university: true } },
                category: true
            }
        });

        if (tagNames && tagNames.length > 0) {
            await this.addTagsToNote(note.id, tagNames);
        }

        return prisma.note.findUnique({
            where: { id: note.id },
            include: {
                seller: { select: { id: true, name: true, university: true } },
                category: true,
                tags: { include: { tag: true } }
            }
        });
    }

    static async updateNote(id: string, sellerId: string, data: {
        title?: string;
        description?: string;
        price?: number;
        categoryId?: string;
        tagNames?: string[];
    }) {
        const note = await prisma.note.findFirst({
            where: { id, sellerId }
        });

        if (!note) {
            throw new Error('Note not found or you do not have permission to edit it');
        }

        const { tagNames, ...updateData } = data;

        if (tagNames) {
            await prisma.noteTag.deleteMany({ where: { noteId: id } });
            await this.addTagsToNote(id, tagNames);
        }

        return prisma.note.update({
            where: { id },
            data: updateData,
            include: {
                seller: { select: { id: true, name: true, university: true } },
                category: true,
                tags: { include: { tag: true } }
            }
        });
    }

    static async deleteNote(id: string, sellerId: string) {
        const note = await prisma.note.findFirst({
            where: { id, sellerId }
        });

        if (!note) {
            throw new Error('Note not found or you do not have permission to delete it');
        }

        await prisma.note.delete({ where: { id } });
        return { message: 'Note deleted successfully' };
    }

    static async addTagsToNote(noteId: string, tagNames: string[]) {
        for (const name of tagNames) {
            const normalizedName = name.toLowerCase().trim();
            
            let tag = await prisma.tag.findUnique({
                where: { name: normalizedName }
            });

            if (!tag) {
                tag = await prisma.tag.create({
                    data: { name: normalizedName }
                });
            }

            await prisma.noteTag.upsert({
                where: {
                    noteId_tagId: {
                        noteId,
                        tagId: tag.id
                    }
                },
                update: {},
                create: {
                    noteId,
                    tagId: tag.id
                }
            });
        }
    }

    static async getTrendingNotes(limit: number = 10) {
        return prisma.note.findMany({
            where: { isApproved: true },
            orderBy: [
                { purchaseCount: 'desc' },
                { viewCount: 'desc' }
            ],
            take: limit,
            include: {
                seller: { select: { id: true, name: true, university: true, avatar: true } },
                category: true,
                _count: { select: { reviews: true } }
            }
        });
    }

    static async getFeaturedNotes(limit: number = 6) {
        return prisma.note.findMany({
            where: { isApproved: true, isFeatured: true },
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: {
                seller: { select: { id: true, name: true, university: true, avatar: true } },
                category: true,
                _count: { select: { reviews: true, purchases: true } }
            }
        });
    }

    static async getNotesBySeller(sellerId: string) {
        return prisma.note.findMany({
            where: { sellerId, isApproved: true },
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                _count: { select: { reviews: true, purchases: true } }
            }
        });
    }

    static async getRelatedNotes(noteId: string, limit: number = 4) {
        const note = await prisma.note.findUnique({
            where: { id: noteId },
            select: { categoryId: true, sellerId: true }
        });

        if (!note) throw new Error('Note not found');

        return prisma.note.findMany({
            where: {
                id: { not: noteId },
                isApproved: true,
                OR: [
                    { categoryId: note.categoryId },
                    { sellerId: note.sellerId }
                ]
            },
            orderBy: { purchaseCount: 'desc' },
            take: limit,
            include: {
                seller: { select: { id: true, name: true, university: true, avatar: true } },
                category: true,
                _count: { select: { reviews: true } }
            }
        });
    }

    static async getCategories() {
        return prisma.category.findMany({
            orderBy: { university: 'asc' }
        });
    }

    static async getTags() {
        return prisma.tag.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: { select: { notes: true } }
            }
        });
    }

    static async recordDownload(noteId: string, userId: string) {
        const purchase = await prisma.purchase.findFirst({
            where: { noteId, buyerId: userId, status: 'COMPLETED' }
        });

        if (!purchase) {
            throw new Error('You must purchase this note before downloading');
        }

        return { downloadUrl: purchase.note.fileUrl };
    }
}
