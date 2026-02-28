import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    X, 
    ChevronDown, 
    ChevronRight,
    User,
    LayoutDashboard,
    Upload,
    DollarSign,
    HelpCircle,
    Shield,
    LogIn,
    UserPlus
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Category {
    name: string;
    subcategories: string[];
}

const categories: Category[] = [
    {
        name: 'Engineering',
        subcategories: ['B.Tech', 'B.E.', 'M.Tech', 'BCA', 'MCA']
    },
    {
        name: 'Science',
        subcategories: ['B.Sc', 'M.Sc', 'B.pharm', 'M.pharm']
    },
    {
        name: 'Arts',
        subcategories: ['BA', 'MA', 'BFA', 'Mass Communication']
    },
    {
        name: 'Commerce',
        subcategories: ['B.Com', 'M.Com', 'BBA', 'MBA', 'CA']
    },
    {
        name: 'Management',
        subcategories: ['BBA', 'MBA', 'PGDM']
    },
    {
        name: 'Law',
        subcategories: ['LLB', 'LLM', 'BA.LLB']
    }
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleCategory = (categoryName: string) => {
        setExpandedCategories(prev => 
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        );
    };

    const handleCategoryClick = (categoryName: string, subcategory?: string) => {
        const params = new URLSearchParams();
        params.set('category', categoryName);
        if (subcategory) {
            params.set('subcategory', subcategory);
        }
        navigate(`/browse?${params.toString()}`);
        onClose();
    };

    const handleSellerToolClick = (path: string) => {
        navigate(path);
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div 
                className={`fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
                    <Link 
                        to="/" 
                        className="text-xl font-bold text-navy-800"
                        onClick={onClose}
                    >
                        Campus Scribe
                    </Link>
                    <button 
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* User Section */}
                <div className="border-b border-gray-200 px-4 py-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white font-semibold">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-medium text-navy-800">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-medium text-navy-800 mb-3">Welcome, Student!</p>
                            <div className="flex gap-2">
                                <Link 
                                    to="/login"
                                    onClick={onClose}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-navy-800 text-navy-800 rounded-lg hover:bg-navy-50 transition-colors"
                                >
                                    <LogIn size={16} />
                                    Log in
                                </Link>
                                <Link 
                                    to="/register"
                                    onClick={onClose}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                                >
                                    <UserPlus size={16} />
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Scrollable Content */}
                <div className="h-[calc(100vh-220px)] overflow-y-auto">
                    {/* Categories */}
                    <div className="py-2">
                        <button
                            onClick={() => setExpandedSection(expandedSection === 'categories' ? null : 'categories')}
                            className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-navy-800 hover:bg-gray-50"
                        >
                            <span>Streams & Categories</span>
                            <ChevronDown 
                                size={18} 
                                className={`transition-transform duration-200 ${
                                    expandedSection === 'categories' ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        
                        {expandedSection === 'categories' && (
                            <div className="bg-gray-50">
                                {categories.map((category) => (
                                    <div key={category.name} className="border-b border-gray-100 last:border-0">
                                        <button
                                            onClick={() => toggleCategory(category.name)}
                                            className="flex w-full items-center justify-between px-6 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <span>{category.name}</span>
                                            {category.subcategories.length > 0 && (
                                                <ChevronRight 
                                                    size={16} 
                                                    className={`transition-transform duration-200 ${
                                                        expandedCategories.includes(category.name) ? 'rotate-90' : ''
                                                    }`}
                                                />
                                            )}
                                        </button>
                                        
                                        {expandedCategories.includes(category.name) && (
                                            <div className="bg-white pb-2">
                                                {category.subcategories.map((sub) => (
                                                    <button
                                                        key={sub}
                                                        onClick={() => handleCategoryClick(category.name, sub)}
                                                        className="block w-full px-8 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-500"
                                                    >
                                                        {sub}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Seller Tools */}
                    <div className="border-t border-gray-200 py-2">
                        <button
                            onClick={() => setExpandedSection(expandedSection === 'seller' ? null : 'seller')}
                            className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-navy-800 hover:bg-gray-50"
                        >
                            <span>Seller Tools</span>
                            <ChevronDown 
                                size={18} 
                                className={`transition-transform duration-200 ${
                                    expandedSection === 'seller' ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        {expandedSection === 'seller' && (
                            <div className="bg-navy-800 px-4 py-3 space-y-1">
                                <button
                                    onClick={() => handleSellerToolClick('/seller/dashboard')}
                                    className="flex w-full items-center gap-3 px-3 py-2.5 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <LayoutDashboard size={18} />
                                    <span>Seller Dashboard</span>
                                </button>
                                <button
                                    onClick={() => handleSellerToolClick('/notes/upload')}
                                    className="flex w-full items-center gap-3 px-3 py-2.5 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Upload size={18} />
                                    <span>Upload Notes</span>
                                </button>
                                <button
                                    onClick={() => handleSellerToolClick('/seller/sales')}
                                    className="flex w-full items-center gap-3 px-3 py-2.5 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <DollarSign size={18} />
                                    <span>Earnings</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div className="border-t border-gray-200 py-2">
                        <Link
                            to="/browse"
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50"
                        >
                            <span>Browse All Notes</span>
                        </Link>
                        <Link
                            to="/trending"
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50"
                        >
                            <span>Trending Notes</span>
                        </Link>
                        <Link
                            to="/featured"
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50"
                        >
                            <span>Featured Notes</span>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-4">
                    <div className="flex gap-4 text-sm">
                        <Link 
                            to="/help" 
                            className="flex items-center gap-2 text-gray-600 hover:text-brand-500"
                            onClick={onClose}
                        >
                            <HelpCircle size={16} />
                            Help & Support
                        </Link>
                        <Link 
                            to="/privacy" 
                            className="flex items-center gap-2 text-gray-600 hover:text-brand-500"
                            onClick={onClose}
                        >
                            <Shield size={16} />
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
