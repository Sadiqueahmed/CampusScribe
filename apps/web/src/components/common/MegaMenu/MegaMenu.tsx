import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, BookOpen, Calculator, FlaskConical, Palette, Briefcase, Stethoscope, Scale, GraduationCap } from 'lucide-react';

interface Category {
    name: string;
    icon: React.ReactNode;
    subcategories: string[];
    link: string;
}

const categories: Category[] = [
    {
        name: 'Engineering & CS',
        icon: <Calculator size={20} />,
        subcategories: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering'],
        link: '/browse?category=engineering'
    },
    {
        name: 'Science',
        icon: <FlaskConical size={20} />,
        subcategories: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Statistics'],
        link: '/browse?category=science'
    },
    {
        name: 'Arts & Humanities',
        icon: <Palette size={20} />,
        subcategories: ['History', 'Literature', 'Philosophy', 'Psychology', 'Sociology'],
        link: '/browse?category=arts'
    },
    {
        name: 'Business',
        icon: <Briefcase size={20} />,
        subcategories: ['Economics', 'Finance', 'Marketing', 'Management', 'Accounting'],
        link: '/browse?category=business'
    },
    {
        name: 'Medical',
        icon: <Stethoscope size={20} />,
        subcategories: ['Anatomy', 'Physiology', 'Pharmacology', 'Pathology', 'Nursing'],
        link: '/browse?category=medical'
    },
    {
        name: 'Law',
        icon: <Scale size={20} />,
        subcategories: ['Constitutional Law', 'Criminal Law', 'Corporate Law', 'International Law', 'Legal Studies'],
        link: '/browse?category=law'
    }
];

export const MegaMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => {
                setIsOpen(false);
                setActiveCategory(null);
            }}
        >
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors py-2">
                Categories
                <ChevronDown size={16} className={`transition-transform ₹{isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Menu Dropdown */}
            {isOpen && (
                <div className="absolute left-0 top-full mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="flex">
                        {/* Left: Category List */}
                        <div className="w-64 bg-gray-50 border-r border-gray-100">
                            {categories.map((category, idx) => (
                                <button
                                    key={idx}
                                    onMouseEnter={() => setActiveCategory(idx)}
                                    className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors ₹{
                                        activeCategory === idx ? 'bg-white text-brand-600' : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className={activeCategory === idx ? 'text-brand-500' : 'text-gray-500'}>
                                        {category.icon}
                                    </span>
                                    <span className="font-medium">{category.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Right: Subcategories */}
                        <div className="flex-1 p-6 bg-white">
                            {activeCategory !== null ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 mb-2">
                                        <Link 
                                            to={categories[activeCategory].link}
                                            className="text-lg font-bold text-gray-900 hover:text-brand-600 flex items-center gap-2"
                                        >
                                            {categories[activeCategory].name}
                                            <BookOpen size={18} className="text-brand-500" />
                                        </Link>
                                    </div>
                                    {categories[activeCategory].subcategories.map((sub, subIdx) => (
                                        <Link
                                            key={subIdx}
                                            to={`₹{categories[activeCategory].link}&subcategory=₹{encodeURIComponent(sub)}`}
                                            className="block px-4 py-2.5 rounded-lg text-gray-600 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                                        >
                                            {sub}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    <div className="text-center">
                                        <GraduationCap size={48} className="mx-auto mb-3 text-gray-300" />
                                        <p>Hover over a category to see subcategories</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Banner */}
                    <div className="bg-gradient-to-r from-brand-50 to-pink-50 px-6 py-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900">Start Selling Your Notes</p>
                                <p className="text-sm text-gray-600">Earn up to 90% commission on every sale</p>
                            </div>
                            <Link 
                                to="/notes/upload" 
                                className="px-5 py-2 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-colors"
                            >
                                Upload Now
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

