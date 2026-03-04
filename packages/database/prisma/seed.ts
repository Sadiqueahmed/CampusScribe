import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Sample Categories (Universities, Courses, Subjects)
const categories = [
    // Harvard University
    { university: 'Harvard University', course: 'Computer Science', subject: 'Introduction to CS' },
    { university: 'Harvard University', course: 'Computer Science', subject: 'Data Structures' },
    { university: 'Harvard University', course: 'Mathematics', subject: 'Calculus I' },
    { university: 'Harvard University', course: 'Mathematics', subject: 'Linear Algebra' },
    { university: 'Harvard University', course: 'Economics', subject: 'Microeconomics' },
    { university: 'Harvard University', course: 'Economics', subject: 'Macroeconomics' },
    { university: 'Harvard University', course: 'Business', subject: 'Financial Accounting' },
    
    // MIT
    { university: 'MIT', course: 'Computer Science', subject: 'Algorithms' },
    { university: 'MIT', course: 'Computer Science', subject: 'Machine Learning' },
    { university: 'MIT', course: 'Physics', subject: 'Classical Mechanics' },
    { university: 'MIT', course: 'Electrical Engineering', subject: 'Circuit Analysis' },
    
    // Stanford University
    { university: 'Stanford University', course: 'Computer Science', subject: 'Artificial Intelligence' },
    { university: 'Stanford University', course: 'Computer Science', subject: 'Web Development' },
    { university: 'Stanford University', course: 'Medicine', subject: 'Anatomy' },
    { university: 'Stanford University', course: 'Psychology', subject: 'Introduction to Psychology' },
    
    // Yale University
    { university: 'Yale University', course: 'Philosophy', subject: 'Introduction to Philosophy' },
    { university: 'Yale University', course: 'History', subject: 'World History' },
    { university: 'Yale University', course: 'Law', subject: 'Constitutional Law' },
    
    // Oxford University
    { university: 'Oxford University', course: 'Literature', subject: 'English Literature' },
    { university: 'Oxford University', course: 'Politics', subject: 'Political Theory' },
    { university: 'Oxford University', course: 'Chemistry', subject: 'Organic Chemistry' },
    
    // Princeton University
    { university: 'Princeton University', course: 'Physics', subject: 'Quantum Mechanics' },
    { university: 'Princeton University', course: 'Mathematics', subject: 'Probability Theory' },
    { university: 'Princeton University', course: 'Engineering', subject: 'Thermodynamics' },
    
    // Columbia University
    { university: 'Columbia University', course: 'Business', subject: 'Marketing' },
    { university: 'Columbia University', course: 'Finance', subject: 'Corporate Finance' },
    { university: 'Columbia University', course: 'Journalism', subject: 'News Writing' },
    
    // UCLA
    { university: 'UCLA', course: 'Biology', subject: 'Cell Biology' },
    { university: 'UCLA', course: 'Sociology', subject: 'Introduction to Sociology' },
    { university: 'UCLA', course: 'Film', subject: 'Film Studies' },
];

// Sample Notes Data
const sampleNotes = [
    {
        title: 'Complete Introduction to Computer Science Notes',
        description: 'Comprehensive notes covering all fundamental concepts of computer science including programming basics, algorithms, and data structures. Perfect for beginners.',
        price: 29.99,
        fileType: 'PDF',
        fileSize: 2500000,
        pageCount: 150,
        viewCount: 1250,
        purchaseCount: 89,
    },
    {
        title: 'Data Structures & Algorithms Cheat Sheet',
        description: 'Quick reference guide for all essential data structures and algorithms. Includes time complexity analysis and implementation examples.',
        price: 19.99,
        fileType: 'PDF',
        fileSize: 1200000,
        pageCount: 45,
        viewCount: 2100,
        purchaseCount: 156,
    },
    {
        title: 'Calculus I - Complete Study Guide',
        description: 'Full semester notes covering limits, derivatives, integrals, and applications. Includes practice problems with detailed solutions.',
        price: 24.99,
        fileType: 'PDF',
        fileSize: 3800000,
        pageCount: 200,
        viewCount: 890,
        purchaseCount: 67,
    },
    {
        title: 'Linear Algebra Lecture Notes',
        description: 'Comprehensive notes from top linear algebra courses. Covers matrices, vectors, eigenvalues, and eigenvectors with examples.',
        price: 22.99,
        fileType: 'PDF',
        fileSize: 2100000,
        pageCount: 120,
        viewCount: 560,
        purchaseCount: 42,
    },
    {
        title: 'Microeconomics Complete Notes',
        description: 'Understanding consumer behavior, market structures, and price theory. Includes diagrams and real-world examples.',
        price: 27.99,
        fileType: 'PDF',
        fileSize: 2900000,
        pageCount: 180,
        viewCount: 720,
        purchaseCount: 51,
    },
    {
        title: 'Machine Learning Fundamentals',
        description: 'Introduction to ML algorithms including supervised and unsupervised learning. Python examples included.',
        price: 34.99,
        fileType: 'PDF',
        fileSize: 4200000,
        pageCount: 250,
        viewCount: 1800,
        purchaseCount: 134,
    },
    {
        title: 'Financial Accounting Textbook Notes',
        description: 'Complete coverage of financial accounting principles, balance sheets, income statements, and cash flow.',
        price: 26.99,
        fileType: 'PDF',
        fileSize: 3100000,
        pageCount: 190,
        viewCount: 650,
        purchaseCount: 48,
    },
    {
        title: 'Organic Chemistry Reaction Mechanisms',
        description: 'Detailed explanations of organic chemistry reactions with mechanisms, stereochemistry, and synthesis examples.',
        price: 31.99,
        fileType: 'PDF',
        fileSize: 4500000,
        pageCount: 280,
        viewCount: 920,
        purchaseCount: 73,
    },
    {
        title: 'Introduction to Psychology Notes',
        description: 'Comprehensive psychology notes covering cognitive, developmental, and social psychology concepts.',
        price: 21.99,
        fileType: 'PDF',
        fileSize: 2800000,
        pageCount: 165,
        viewCount: 480,
        purchaseCount: 35,
    },
    {
        title: 'Circuit Analysis Workbook',
        description: 'Complete circuit analysis problems with step-by-step solutions. Covers DC, AC, and transient analysis.',
        price: 28.99,
        fileType: 'PDF',
        fileSize: 3500000,
        pageCount: 210,
        viewCount: 780,
        purchaseCount: 62,
    },
    {
        title: 'Philosophy: Ancient to Modern',
        description: 'Journey through philosophical thought from Plato to Nietzsche. Key concepts, arguments, and critical analysis.',
        price: 23.99,
        fileType: 'PDF',
        fileSize: 2400000,
        pageCount: 140,
        viewCount: 340,
        purchaseCount: 28,
    },
    {
        title: 'Web Development Bootcamp Notes',
        description: 'Full stack web development notes covering HTML, CSS, JavaScript, React, and Node.js with projects.',
        price: 32.99,
        fileType: 'PDF',
        fileSize: 5200000,
        pageCount: 320,
        viewCount: 2100,
        purchaseCount: 167,
    },
];

// Tags for notes
const tags = [
    'exam-prep', 'study-guide', 'lecture-notes', 'assignment-help', 
    'comprehensive', 'beginner-friendly', 'advanced', 'practice-problems',
    'formulas', 'cheat-sheet', 'review', 'summary'
];

async function main() {
    console.log('Starting database seed...');
    
    // 1. Clear existing data
    console.log('Clearing existing data...');
    await prisma.noteTag.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.note.deleteMany();
    await prisma.category.deleteMany();
    await prisma.course.deleteMany();
    await prisma.purchase.deleteMany();
    await prisma.review.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.wishlist.deleteMany();
    await prisma.user.deleteMany();
    
    // 2. Create Categories
    console.log('Creating categories...');
    const createdCategories = await Promise.all(
        categories.map(cat => 
            prisma.category.create({
                data: cat
            })
        )
    );
    console.log(`Created ${createdCategories.length} categories`);
    
    // 3. Create a Demo Seller
    console.log('Creating demo seller...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const seller = await prisma.user.create({
        data: {
            email: 'seller@campuscribe.com',
            name: 'Academic Experts Team',
            passwordHash: hashedPassword,
            role: 'SELLER',
            isSellerVerified: true,
            sellerVerifiedAt: new Date(),
            university: 'Harvard University',
            bio: 'We are a team of experienced tutors and academics providing high-quality study materials for students worldwide.',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AE&backgroundColor=6366f1',
        }
    });
    console.log('Created demo seller:', seller.email);
    
    // 4. Create a Demo Buyer
    console.log('Creating demo buyer...');
    const buyer = await prisma.user.create({
        data: {
            email: 'buyer@campuscribe.com',
            name: 'John Student',
            passwordHash: hashedPassword,
            role: 'BUYER',
            university: 'MIT',
        }
    });
    console.log('Created demo buyer:', buyer.email);
    
    // 5. Create Tags
    console.log('Creating tags...');
    const createdTags = await Promise.all(
        tags.map(name => prisma.tag.create({ data: { name } }))
    );
    console.log(`Created ${createdTags.length} tags`);
    
    // 6. Create Sample Notes
    console.log('Creating sample notes...');
    for (let i = 0; i < sampleNotes.length; i++) {
        const noteData = sampleNotes[i];
        // Pick a random category
        const randomCategory = createdCategories[Math.floor(Math.random() * createdCategories.length)];
        
        // Pick 2-3 random tags
        const shuffledTags = [...createdTags].sort(() => 0.5 - Math.random());
        const selectedTags = shuffledTags.slice(0, Math.floor(Math.random() * 2) + 2);
        
        const note = await prisma.note.create({
            data: {
                title: noteData.title,
                description: noteData.description,
                price: noteData.price,
                fileType: noteData.fileType,
                fileSize: noteData.fileSize,
                pageCount: noteData.pageCount,
                sellerId: seller.id,
                categoryId: randomCategory.id,
                isApproved: true, // Important: make notes visible
                isFeatured: i < 4, // Make first 4 notes featured
                viewCount: noteData.viewCount,
                purchaseCount: noteData.purchaseCount,
                fileUrl: 'https://example.com/sample-note.pdf',
                previewUrl: 'https://example.com/preview.pdf',
            }
        });
        
        // Add tags to note
        for (const tag of selectedTags) {
            await prisma.noteTag.create({
                data: {
                    noteId: note.id,
                    tagId: tag.id
                }
            });
        }
        
        console.log(`Created note: ${note.title}`);
    }
    
    // 7. Create Sample Courses (for certificate courses page)
    console.log('Creating sample courses...');
    const mockCourses = [
        {
            title: 'Google Data Analytics',
            slug: 'google-data-analytics',
            description: 'This is your path to a career in data analytics. In this program, you will learn in-demand skills that will have you job-ready in less than 6 months.',
            provider: 'Google',
            courseType: 'Professional Certificate',
            averageRating: 4.8,
            reviewCount: 105000,
            price: 39,
            thumbnailUrl: '/src/assets/study.png',
            duration: 360,
            instructor: 'Google',
            category: 'Data Science',
        },
        {
            title: 'Python for Everybody',
            slug: 'python-for-everybody',
            description: 'This Specialization builds on the success of the Python for Everybody course and will introduce fundamental programming concepts.',
            provider: 'University of Michigan',
            courseType: 'Specialization',
            averageRating: 4.8,
            reviewCount: 330000,
            price: 49,
            thumbnailUrl: '/src/assets/study.png',
            duration: 240,
            instructor: 'Charles Russell Severance',
            category: 'Programming',
        },
        {
            title: 'Google Project Management',
            slug: 'google-project-management',
            description: 'This is your path to a career in project management. Learn in-demand skills that will have you job-ready in less than 6 months.',
            provider: 'Google',
            courseType: 'Professional Certificate',
            averageRating: 4.8,
            reviewCount: 95000,
            price: 39,
            thumbnailUrl: '/src/assets/study.png',
            duration: 300,
            instructor: 'Google',
            category: 'Business',
        },
        {
            title: 'Microsoft Power BI Data Analyst',
            slug: 'microsoft-power-bi-data-analyst',
            description: 'Learn the skills needed to become a Microsoft Power BI data analyst. Prepare for the PL-300 certification exam.',
            provider: 'Microsoft',
            courseType: 'Professional Certificate',
            averageRating: 4.6,
            reviewCount: 12000,
            price: 49,
            thumbnailUrl: '/src/assets/study.png',
            duration: 420,
            instructor: 'Microsoft',
            category: 'Data Science',
        },
        {
            title: 'AI For Everyone',
            slug: 'ai-for-everyone',
            description: 'AI is not only for engineers. Learn how AI can impact your work and your business.',
            provider: 'DeepLearning.AI',
            courseType: 'Course',
            averageRating: 4.8,
            reviewCount: 50000,
            price: 0,
            thumbnailUrl: '/src/assets/study.png',
            duration: 60,
            instructor: 'Andrew Ng',
            category: 'AI',
        },
        {
            title: 'IBM Generative AI Engineering',
            slug: 'ibm-generative-ai-engineering',
            description: 'Professional Certificate for AI/ML developers, data scientists and software engineers looking to build generative AI solutions.',
            provider: 'IBM',
            courseType: 'Professional Certificate',
            averageRating: 4.7,
            reviewCount: 1500,
            price: 59,
            thumbnailUrl: '/src/assets/study.png',
            duration: 360,
            instructor: 'IBM',
            category: 'AI',
        }
    ];
    
    for (const courseData of mockCourses) {
        await prisma.course.create({
            data: courseData,
        });
    }
    console.log('Created sample courses');
    
    // 8. Create some reviews for the notes
    console.log('Creating sample reviews...');
    const notes = await prisma.note.findMany({ take: 5 });
    const reviewComments = [
        'Excellent notes! Very comprehensive and helped me ace my exams.',
        'Great quality content. Highly recommended for anyone taking this course.',
        'Very helpful study guide. The examples are clear and well-explained.',
        'Good notes overall. Some sections could be more detailed but still very useful.',
        'Perfect for exam preparation. Saved me so much time!',
    ];
    
    for (const note of notes) {
        // Create 2-3 reviews per note
        const numReviews = Math.floor(Math.random() * 2) + 2;
        for (let j = 0; j < numReviews; j++) {
            await prisma.review.create({
                data: {
                    rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
                    comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
                    userId: buyer.id,
                    noteId: note.id,
                    isVisible: true,
                }
            });
        }
    }
    console.log('Created sample reviews');
    
    console.log('\n========================================');
    console.log('Database Seeded Successfully!');
    console.log('========================================');
    console.log('\nDemo Accounts:');
    console.log('   Seller: seller@campuscribe.com / password123');
    console.log('   Buyer:  buyer@campuscribe.com / password123');
    console.log('\nSample Data:');
    console.log('   - ' + createdCategories.length + ' Categories');
    console.log('   - ' + notes.length + ' Sample Notes');
    console.log('   - ' + createdTags.length + ' Tags');
    console.log('   - ' + mockCourses.length + ' Certificate Courses');
    console.log('\nYour site is ready to use!');
    console.log('========================================\n');
}

main()
    .catch((e) => {
        console.error('Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
