import { prisma } from '@campus-scribe/database';

export class NotesService {
    static async getAllNotes(query: any = {}) {
        // Map query params to Prisma where clause
        const where: any = {};
        if (query.categoryId) where.categoryId = query.categoryId;
        if (query.sellerId) where.sellerId = query.sellerId;
        if (query.search) {
            where.title = { contains: query.search, mode: 'insensitive' };
        }

        return prisma.note.findMany({
            where,
            include: {
                seller: { select: { id: true, name: true, university: true } },
                category: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    static async getNoteById(id: string) {
        return prisma.note.findUnique({
            where: { id },
            include: {
                seller: { select: { id: true, name: true, university: true } },
                category: true
            }
        });
    }

    static async createNote(data: {
        title: string;
        description: string;
        price: number;
        fileUrl: string;
        previewUrl: string;
        sellerId: string;
        categoryId: string;
    }) {
        return prisma.note.create({
            data
        });
    }
}
