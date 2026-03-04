import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    X, 
    ChevronDown, 
    ChevronRight,
    LayoutDashboard,
    Upload,
    DollarSign,
    HelpCircle,
    Shield,
    LogIn,
    UserPlus,
    FileText,
    BookOpen,
    ClipboardList,
    GraduationCap,
    Users,
    Layers,
    Award,
    Home,
    TrendingUp,
    Star
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isPeek?: boolean;
}

// Main product categories
const mainCategories = [
    { name: 'Notes (PDF)', icon: FileText, path: '/browse?category=notes' },
    { name: 'Book', icon: BookOpen, path: '/browse?category=book' },
    { name: 'Question Bank', icon: ClipboardList, path: '/browse?category=questionbank' },
    { name: 'Test Series', icon: GraduationCap, path: '/browse?category=testseries' },
    { name: 'Mentorship', icon: Users, path: '/browse?category=mentorship' },
    { name: 'Lectures', icon: Layers, path: '/browse?category=lectures' },
    { name: 'All Products', icon: Layers, path: '/browse' },
    { name: 'Certificate Course', icon: Award, path: '/certificate-courses' },
    { name: 'Study Material', icon: GraduationCap, path: '/study-material' },
];

// Stream categories with sub-items
const streamCategories = [
    { name: 'Arts Stream', subItems: ['Arts', 'History', 'Political Science', 'Sociology', 'Philosophy'], path: '/browse?stream=arts' },
    { name: 'Commerce Stream', subItems: ['Commerce', 'Accountancy', 'Economics', 'Business Studies', 'Mathematics'], path: '/browse?stream=commerce' },
    { name: 'Science Stream', subItems: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science'], path: '/browse?stream=science' },
    { name: 'Other Streams', subItems: ['Engineering', 'Medical', 'Law', 'Management', 'Agriculture'], path: '/browse?stream=other' },
];

export const Sidebar = ({ isOpen, onClose, isPeek = false }: SidebarProps) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [expandedSection, setExpandedSection] = useState<string | null>('categories');
    const [expandedStream, setExpandedStream] = useState<string | null>(null);

    const handleCategoryClick = (path: string) => {
        navigate(path);
        onClose();
    };

    const handleStreamClick = (streamName: string) => {
        setExpandedStream(expandedStream === streamName ? null : streamName);
    };

    const handleSellerToolClick = (path: string) => {
        navigate(path);
        onClose();
    };

    const isActive = (path: string) => location.pathname === path;

    // Peek sidebar content (collapsed - icon only)
    const renderPeekContent = () => (
        <div className="h-full flex flex-col items-center py-4 bg-white border-r border-gray-200">
            <Link
                to="/"
                onClick={onClose}
                className={`p-3 rounded-lg mb-2 ${isActive('/') ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Home"
            >
                <Home size={20} />
            </Link>
            
            <Link
                to="/browse"
                onClick={onClose}
                className={`p-3 rounded-lg mb-2 ${isActive('/browse') ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Browse"
            >
                <Layers size={20} />
            </Link>
            
            <Link
                to="/trending"
                onClick={onClose}
                className={`p-3 rounded-lg mb-2 ${isActive('/trending') ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Trending"
            >
                <TrendingUp size={20} />
            </Link>
            
            <Link
                to="/featured"
                onClick={onClose}
                className={`p-3 rounded-lg mb-2 ${isActive('/featured') ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Featured"
            >
                <Star size={20} />
            </Link>
        </div>
    );

    // Expanded sidebar content
    const renderExpandedContent = () => (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="px-4 py-4 border-b border-gray-200">
                <Link to="/" className="text-xl font-bold text-navy-800">
                    Campus Scribe
                </Link>
            </div>

            {/* User Section */}
            <div className="border-b border-gray-200 px-4 py-4">
                {user ? (
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white font-semibold">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-medium text-navy-800 text-sm">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="font-medium text-navy-800 mb-2 text-sm">Welcome!</p>
                        <div className="flex gap-2">
                            <Link 
                                to="/login"
                                onClick={onClose}
                                className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 border border-navy-800 text-navy-800 rounded-lg hover:bg-navy-50 transition-colors text-xs"
                            >
                                <LogIn size={14} />
                                Log in
                            </Link>
                            <Link 
                                to="/register"
                                onClick={onClose}
                                className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors text-xs"
                            >
                                <UserPlus size={14} />
                                Sign up
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Home Link */}
                <div className="py-2 px-2">
                    <Link
                        to="/"
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            isActive('/') ? 'bg-brand-50 text-brand-600' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <Home size={18} />
                        <span className="text-sm font-medium">Home</span>
                    </Link>
                </div>

                {/* All Categories Section - Collapsible */}
                <div className="py-2 border-t border-gray-100">
                    <button
                        onClick={() => setExpandedSection(expandedSection === 'categories' ? null : 'categories')}
                        className="flex w-full items-center justify-between px-4 py-2.5 text-left font-semibold text-navy-800 hover:bg-gray-50"
                    >
                        <span className="text-sm">All Categories</span>
                        <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-200 ${
                                expandedSection === 'categories' ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                    
                    {expandedSection === 'categories' && (
                        <div className="px-2 py-1">
                            {mainCategories.map((category, index) => (
                                <button
                                    key={`${category.name}-${index}`}
                                    onClick={() => handleCategoryClick(category.path)}
                                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    {category.icon && <category.icon size={16} />}
                                    <span>{category.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Streams Dropdown Section - Collapsible */}
                <div className="border-t border-gray-100 py-2">
                    <button
                        onClick={() => setExpandedSection(expandedSection === 'streams' ? null : 'streams')}
                        className="flex w-full items-center justify-between px-4 py-2.5 text-left font-semibold text-navy-800 hover:bg-gray-50"
                    >
                        <span className="text-sm">Streams</span>
                        <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-200 ${
                                expandedSection === 'streams' ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {expandedSection === 'streams' && (
                        <div className="px-2 py-1">
                            {streamCategories.map((stream) => (
                                <div key={stream.name}>
                                    <button
                                        onClick={() => handleStreamClick(stream.name)}
                                        className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                                    >
                                        <span>{stream.name}</span>
                                        <ChevronDown 
                                            size={12} 
                                            className={`transition-transform duration-200 ${
                                                expandedStream === stream.name ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    
                                    {expandedStream === stream.name && (
                                        <div className="pl-6 pr-2">
                                            {stream.subItems.map((subItem) => (
                                                <button
                                                    key={subItem}
                                                    onClick={() => handleCategoryClick(`${stream.path}&subject=${encodeURIComponent(subItem)}`)}
                                                    className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                                                >
                                                    <ChevronRight size={12} />
                                                    <span>{subItem}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Links */}
                <div className="border-t border-gray-100 py-2 px-2">
                    <Link
                        to="/browse"
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            isActive('/browse') ? 'bg-brand-50 text-brand-600' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <Layers size={18} />
                        <span className="text-sm">Browse All Notes</span>
                    </Link>
                    <Link
                        to="/trending"
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            isActive('/trending') ? 'bg-brand-50 text-brand-600' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <TrendingUp size={18} />
                        <span className="text-sm">Trending Notes</span>
                    </Link>
                    <Link
                        to="/featured"
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            isActive('/featured') ? 'bg-brand-50 text-brand-600' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <Star size={18} />
                        <span className="text-sm">Featured Notes</span>
                    </Link>
                </div>

                {/* Seller Tools */}
                <div className="border-t border-gray-100 py-2">
                    <button
                        onClick={() => setExpandedSection(expandedSection === 'seller' ? null : 'seller')}
                        className="flex w-full items-center justify-between px-4 py-2.5 text-left font-semibold text-navy-800 hover:bg-gray-50"
                    >
                        <span className="text-sm">Seller Tools</span>
                        <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-200 ${
                                expandedSection === 'seller' ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {expandedSection === 'seller' && (
                        <div className="px-2 py-1 space-y-1">
                            <button
                                onClick={() => handleSellerToolClick('/seller/dashboard')}
                                className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                <LayoutDashboard size={16} />
                                <span>Seller Dashboard</span>
                            </button>
                            <button
                                onClick={() => handleSellerToolClick('/notes/upload')}
                                className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                <Upload size={16} />
                                <span>Upload Notes</span>
                            </button>
                            <button
                                onClick={() => handleSellerToolClick('/seller/sales')}
                                className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray"
                            >
                               -100 rounded-lg <DollarSign size={16} />
                                <span>Earnings</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-4 py-3">
                <div className="flex gap-4 text-xs">
                    <Link 
                        to="/help" 
                        className="flex items-center gap-1 text-gray-600 hover:text-brand-500"
                        onClick={onClose}
                    >
                        <HelpCircle size={14} />
                        Help
                    </Link>
                    <Link 
                        to="/privacy" 
                        className="flex items-center gap-1 text-gray-600 hover:text-brand-500"
                        onClick={onClose}
                    >
                        <Shield size={14} />
                        Privacy
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Backdrop */}
            <div 
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />

            {/* Mobile Sidebar Drawer */}
            <div 
                className={`fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Mobile Header */}
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

                {/* Mobile User Section */}
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

                {/* Mobile Scrollable Content */}
                <div className="h-[calc(100vh-220px)] overflow-y-auto">
                    {/* All Categories - Collapsible */}
                    <div className="py-2">
                        <button
                            onClick={() => setExpandedSection(expandedSection === 'categories' ? null : 'categories')}
                            className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-navy-800 hover:bg-gray-50"
                        >
                            <span>All Categories</span>
                            <ChevronDown 
                                size={18} 
                                className={`transition-transform duration-200 ${
                                    expandedSection === 'categories' ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        
                        {expandedSection === 'categories' && (
                            <div className="bg-gray-50">
                                {mainCategories.map((category, index) => (
                                    <Link
                                        key={`${category.name}-${index}`}
                                        to={category.path}
                                        onClick={onClose}
                                        className="flex items-center gap-3 px-6 py-3 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {category.icon && <category.icon size={18} />}
                                        <span>{category.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Streams - Collapsible */}
                    <div className="border-t border-gray-200 py-2">
                        <button
                            onClick={() => setExpandedSection(expandedSection === 'streams' ? null : 'streams')}
                            className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-navy-800 hover:bg-gray-50"
                        >
                            <span>Streams</span>
                            <ChevronDown 
                                size={18} 
                                className={`transition-transform duration-200 ${
                                    expandedSection === 'streams' ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        {expandedSection === 'streams' && (
                            <div className="bg-gray-50">
                                {streamCategories.map((stream) => (
                                    <div key={stream.name}>
                                        <button
                                            onClick={() => handleStreamClick(stream.name)}
                                            className="flex w-full items-center justify-between px-6 py-3 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <span>{stream.name}</span>
                                            <ChevronDown 
                                                size={14} 
                                                className={`transition-transform duration-200 ${
                                                    expandedStream === stream.name ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>
                                        
                                        {expandedStream === stream.name && (
                                            <div className="bg-gray-100 pl-8">
                                                {stream.subItems.map((subItem) => (
                                                    <Link
                                                        key={subItem}
                                                        to={`${stream.path}&subject=${encodeURIComponent(subItem)}`}
                                                        onClick={onClose}
                                                        className="flex items-center gap-2 px-6 py-2.5 text-sm text-gray-600 hover:bg-gray-200"
                                                    >
                                                        <ChevronRight size={14} />
                                                        <span>{subItem}</span>
                                                    </Link>
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

                {/* Mobile Footer */}
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

            {/* Desktop Sidebar - Peek mode (overlay, not pushing content) */}
            <div className="hidden lg:block h-full border-r border-gray-200 bg-white">
                {isPeek ? renderPeekContent() : renderExpandedContent()}
            </div>
        </>
    );
};
