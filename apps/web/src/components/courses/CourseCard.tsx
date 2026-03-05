import { ExternalLink, Users } from 'lucide-react';
import { Course } from '../../types/course.types';
import { StarRating } from '../common/StarRating/StarRating';

interface CourseCardProps {
    course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
    const priceDisplay = course.price === 0 ? 'Free' : `₹${course.price}`;

    const formatEnrollment = (count?: number) => {
        if (!count) return null;
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
        return count.toString();
    };

    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
            {/* Image */}
            <div className="relative">
                <a href={course.courseraUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <img
                        src={course.thumbnailUrl || 'https://via.placeholder.com/400x225'}
                        alt={course.title}
                        className="h-48 w-full object-cover"
                    />
                </a>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {course.isFree && (
                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            FREE
                        </span>
                    )}
                    <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-2 py-1 rounded-full">
                        {course.courseType}
                    </span>
                </div>

                {/* Level Badge */}
                {course.level && (
                    <div className="absolute bottom-3 left-3">
                        <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {course.level}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-blue-600">{course.provider}</span>
                    {course.isFree === false && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                            Paid
                        </span>
                    )}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-700 line-clamp-2">
                    <a href={course.courseraUrl} target="_blank" rel="noopener noreferrer">
                        {course.title}
                    </a>
                </h3>
                
                <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-grow">{course.description}</p>
                
                {/* Skills */}
                {course.skills && course.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                        {course.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {skill}
                            </span>
                        ))}
                        {course.skills.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                +{course.skills.length - 3}
                            </span>
                        )}
                    </div>
                )}
                
                {/* Rating and Reviews */}
                {course.averageRating && course.reviewCount && (
                    <div className="mt-4 flex items-center gap-2">
                        <span className="font-bold text-amber-500">{course.averageRating.toFixed(1)}</span>
                        <StarRating rating={course.averageRating} />
                        <span className="text-sm text-gray-500">({course.reviewCount.toLocaleString()})</span>
                    </div>
                )}

                {/* Enrollments */}
                {course.enrollmentCount && (
                    <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{formatEnrollment(course.enrollmentCount)} enrolled</span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-extrabold text-gray-900">
                            {priceDisplay}
                        </p>
                        {course.price && course.price > 0 && (
                            <p className="text-xs text-gray-500">Monthly subscription</p>
                        )}
                    </div>
                    <a 
                        href={course.courseraUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                        Enroll Now
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
