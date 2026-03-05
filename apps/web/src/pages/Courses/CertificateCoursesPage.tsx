import React, { useState, useEffect } from 'react';
import { Search, Filter, X, GraduationCap, DollarSign, Tag } from 'lucide-react';
import { getCourses, getFreeCourses, getPaidCourses, searchCoursesByQuery } from '../../services/courses.service';
import { Course } from '../../types/course.types';
import CourseCard from '../../components/courses/CourseCard';
import FilterSidebar from '../../components/courses/FilterSidebar';

const CertificateCoursesPage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const data = await getCourses();
                setCourses(data);
                setFilteredCourses(data);
            } catch (err) {
                setError('Failed to fetch courses. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const applyFilters = async () => {
            setLoading(true);
            try {
                let result: Course[];
                
                if (searchQuery) {
                    result = await searchCoursesByQuery(searchQuery);
                } else if (filter === 'free') {
                    result = await getFreeCourses();
                } else if (filter === 'paid') {
                    result = await getPaidCourses();
                } else {
                    result = courses;
                }
                
                setFilteredCourses(result);
            } catch (err) {
                console.error('Filter error:', err);
            } finally {
                setLoading(false);
            }
        };

        applyFilters();
    }, [filter, searchQuery, courses]);

    const clearSearch = () => {
        setSearchQuery('');
    };

    const getFilterCount = () => {
        let count = 0;
        if (filter !== 'all') count++;
        return count;
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            Professional Certificate Courses
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Advance your career with industry-recognized credentials from top universities and companies.
                        </p>
                    </div>
                    
                    {/* Stats */}
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold">{courses.length}+</div>
                            <div className="text-sm text-blue-100">Courses</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold">{courses.filter(c => (c.price ?? 0) === 0).length}</div>
                            <div className="text-sm text-blue-100">Free</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold">{courses.filter(c => (c.price ?? 0) > 0).length}</div>
                            <div className="text-sm text-blue-100">Paid</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold">{(courses.reduce((acc, c) => acc + (c.enrollmentCount || 0), 0) / 1000000).toFixed(1)}M+</div>
                            <div className="text-sm text-blue-100">Enrollments</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses, skills, or providers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex items-center gap-3">
                            {/* Free/Paid Filter */}
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        filter === 'all' 
                                            ? 'bg-white text-gray-900 shadow-sm' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setFilter('free')}
                                    className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        filter === 'free' 
                                            ? 'bg-green-500 text-white shadow-sm' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    <Tag className="w-4 h-4" />
                                    Free
                                </button>
                                <button
                                    onClick={() => setFilter('paid')}
                                    className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        filter === 'paid' 
                                            ? 'bg-amber-500 text-white shadow-sm' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    <DollarSign className="w-4 h-4" />
                                    Paid
                                </button>
                            </div>

                            {/* Toggle Filters */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                                    showFilters 
                                        ? 'border-blue-500 bg-blue-50 text-blue-600' 
                                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                                {getFilterCount() > 0 && (
                                    <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                        {getFilterCount()}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Search Results Info */}
                    {searchQuery && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                            <span>Showing results for "<strong>{searchQuery}</strong>"</span>
                            <span className="text-gray-400">({filteredCourses.length} courses)</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filter Sidebar */}
                    {showFilters && (
                        <aside className="w-full lg:w-64 flex-shrink-0">
                            <div className="bg-white rounded-xl shadow-sm p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-900">Filters</h3>
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="lg:hidden text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <FilterSidebar />
                            </div>
                        </aside>
                    )}

                    {/* Course Grid */}
                    <main className="flex-1 min-w-0">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-gray-600">Loading courses...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : filteredCourses.length === 0 ? (
                            <div className="text-center py-20">
                                <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                                <p className="text-gray-500">Try adjusting your search or filters.</p>
                                <button
                                    onClick={() => { clearSearch(); setFilter('all'); }}
                                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-gray-600">
                                        Showing <strong>{filteredCourses.length}</strong> courses
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                    {filteredCourses.map(course => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CertificateCoursesPage;
