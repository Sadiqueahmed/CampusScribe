import { Request, Response } from 'express';
import { CoursesService } from '../services/courses.service';

export class CoursesController {
    static async getAllCourses(req: Request, res: Response) {
        try {
            const courses = await CoursesService.getAllCourses(req.query);
            res.status(200).json(courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).json({ message: 'Error fetching courses' });
        }
    }

    // Controller for single course can be added here
}
