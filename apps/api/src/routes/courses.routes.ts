import { Router } from 'express';
import { CoursesController } from '../controllers/courses.controller';

const router = Router();

router.get('/', CoursesController.getAllCourses);

export default router;
