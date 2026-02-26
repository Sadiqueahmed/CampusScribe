import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Clearing existing data...');
    await prisma.transaction.deleteMany();
    await prisma.purchase.deleteMany();
    await prisma.review.deleteMany();
    await prisma.note.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    console.log('Seeding Database...');

    // Create Categories
    const cs101 = await prisma.category.create({
        data: { university: 'Harvard', subject: 'Computer Science', course: 'CS50' }
    });

    const math101 = await prisma.category.create({
        data: { university: 'Stanford', subject: 'Mathematics', course: 'MATH51' }
    });

    // Create Users
    const passwordHash = await bcrypt.hash('password123', 10);

    const seller = await prisma.user.create({
        data: {
            email: 'seller@edu.com',
            name: 'Alice Seller',
            passwordHash,
            role: 'SELLER',
            university: 'Harvard',
            isVerified: true
        }
    });

    const buyer = await prisma.user.create({
        data: {
            email: 'buyer@edu.com',
            name: 'Bob Buyer',
            passwordHash,
            role: 'BUYER',
            university: 'Stanford',
            isVerified: true
        }
    });

    // Create Notes
    const note1 = await prisma.note.create({
        data: {
            title: 'Complete CS50 Study Guide',
            description: 'Everything you need to ace Harvard CS50, complete with code snippets and diagrams.',
            price: 15.99,
            fileUrl: 'https://example.com/notes/cs50.pdf',
            previewUrl: 'https://example.com/notes/cs50-preview.pdf',
            fileType: 'application/pdf',
            fileSize: 2500000,
            sellerId: seller.id,
            categoryId: cs101.id
        }
    });

    console.log('Database Seeded Successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
