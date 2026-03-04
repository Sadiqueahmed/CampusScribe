import { useState } from 'react';
import { StarRating } from '../common/StarRating/StarRating';

const courseProviders = ['Google', 'University of Michigan', 'Microsoft', 'DeepLearning.AI', 'IBM'];
const courseTypes = ['Professional Certificate', 'Specialization', 'Course'];
const ratings = [5, 4, 3, 2, 1];

const FilterSidebar = () => {
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
    const [selectedCourseTypes, setSelectedCourseTypes] = useState<string[]>([]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleProviderChange = (provider: string) => {
        const newSelection = selectedProviders.includes(provider)
            ? selectedProviders.filter(p => p !== provider)
            : [...selectedProviders, provider];
        setSelectedProviders(newSelection);
    };

    const handleCourseTypeChange = (type: string) => {
        const newSelection = selectedCourseTypes.includes(type)
            ? selectedCourseTypes.filter(t => t !== type)
            : [...selectedCourseTypes, type];
        setSelectedCourseTypes(newSelection);
    };

    const handleResetFilters = () => {
        setPriceRange({ min: '', max: '' });
        setSelectedProviders([]);
        setSelectedCourseTypes([]);
        setSelectedRating(null);
    };

    return (
        <aside className="w-full">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                    <button onClick={handleResetFilters} className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                        Reset All
                    </button>
                </div>

                {/* Price Filter */}
                <div className="py-6 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4">💰 Price Range</h3>
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            placeholder="Min"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>
                </div>

                {/* Providers Filter */}
                <div className="py-6 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4">🎓 Providers</h3>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                        {courseProviders.map(provider => (
                            <label key={provider} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedProviders.includes(provider)}
                                    onChange={() => handleProviderChange(provider)}
                                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-700">{provider}</span>
                            </label>
                        ))}
                    </div>
                </div>
                
                {/* Course Type Filter */}
                <div className="py-6 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4">📚 Course Type</h3>
                    <div className="space-y-3">
                        {courseTypes.map(type => (
                            <label key={type} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCourseTypes.includes(type)}
                                    onChange={() => handleCourseTypeChange(type)}
                                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-700">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Rating Filter */}
                <div className="pt-6">
                    <h3 className="font-semibold text-gray-800 mb-4">⭐ Rating</h3>
                    <div className="space-y-3">
                        {ratings.map(rating => (
                            <label key={rating} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={selectedRating === rating}
                                    onChange={() => setSelectedRating(rating)}
                                    className="h-5 w-5 border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <StarRating rating={rating} />
                                {rating < 5 && <span className="text-sm text-gray-500">& up</span>}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;
