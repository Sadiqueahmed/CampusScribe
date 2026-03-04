import { prisma } from '@campus-scribe/database';

export class CoursesService {
    static async getAllCourses(query: any = {}) {
        const where: any = { isPublished: true };

        // Filtering logic can be added here later
        // e.g., by category, price range, etc.

        const courses = await prisma.course.findMany({
            where,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return courses;
    }

    // A method to get a single course can be added here
}
