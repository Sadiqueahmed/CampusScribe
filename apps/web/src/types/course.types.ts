export interface Course {
    id: string;
    title: string;
    slug: string;
    description: string;
    price?: number;
    discountedPrice?: number;
    thumbnailUrl?: string;
    duration?: number; // in minutes
    instructor?: {
        name: string;
        avatarUrl?: string;
    };
    category?: {
        name: string;
        slug: string;
    };
    averageRating?: number;
    reviewCount?: number;
    provider?: string;
    courseType?: string;
    // New fields for Coursera integration
    courseraUrl?: string;
    enrollmentCount?: number;
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
    isFree?: boolean;
    syllabus?: string[];
    skills?: string[];
}
