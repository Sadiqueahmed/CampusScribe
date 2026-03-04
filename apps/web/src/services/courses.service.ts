import { Course } from '../types/course.types';
import { mockCourses, freeCourses, paidCourses, searchCourses } from './mock.courses';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCourses = async (): Promise<Course[]> => {
    await delay(300); // Simulate network delay
    return mockCourses;
};

export const getFreeCourses = async (): Promise<Course[]> => {
    await delay(300);
    return freeCourses;
};

export const getPaidCourses = async (): Promise<Course[]> => {
    await delay(300);
    return paidCourses;
};

export const searchCoursesByQuery = async (query: string): Promise<Course[]> => {
    await delay(300);
    return searchCourses(query);
};

export const getCoursesByProvider = async (provider: string): Promise<Course[]> => {
    await delay(300);
    return mockCourses.filter(course => 
        course.provider?.toLowerCase() === provider.toLowerCase()
    );
};

export const getCoursesByLevel = async (level: string): Promise<Course[]> => {
    await delay(300);
    return mockCourses.filter(course => 
        course.level?.toLowerCase() === level.toLowerCase()
    );
};
