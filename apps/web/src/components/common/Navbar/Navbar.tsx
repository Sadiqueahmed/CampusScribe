import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Heart, MessageSquare, LayoutDashboard, LogOut, ChevronDown, ChevronRight, Store, Briefcase, Info } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { useState, useRef, useEffect } from 'react';
import { UserButton } from '@clerk/clerk-react';
import logo from '../../../assets/logo.png';

// Categories with streams for the Menu dropdown
const categoriesWithStreams = [
    { 
        name: 'Arts Stream', 
        subItems: ['Arts', 'History', 'Political Science', 'Sociology', 'Philosophy'], 
        path: '/browse?stream=arts' 
    },
    { 
        name: 'Commerce Stream', 
        subItems: ['Commerce', 'Accountancy', 'Economics', 'Business Studies', 'Mathematics'], 
        path: '/browse?stream=commerce' 
    },
    { 
        name: 'Science Stream', 
        subItems: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science'], 
        path: '/browse?stream=science' 
    },
    { 
        name: 'Other Streams', 
        subItems: ['Engineering', 'Medical', 'Law', 'Management', 'Agriculture'], 
        path: '/browse?stream=other' 
    },
];

// Main menu items
const mainMenuItems = [
    { name: 'Seller Dashboard', icon: LayoutDashboard, path: '/seller/dashboard' },
    { name: 'All Stores', icon: Store, path: '/stores' },
    { name: 'Shop', icon: Store, path: '/browse' },
    { name: 'Job Portal', icon: Briefcase, path: '/jobs' },
    { name: 'About Us', icon: Info, path: '/about' },
];

interface NavbarProps {
    onMenuClick?: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
    const { user, logout, isSignedIn } = useAuth();
    const { itemCount } = useCart();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
                setExpandedCategory(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsMobileSearchOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                
                {/* Left Section: Menu & Logo */}
                <div className="flex items-center gap-3">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="CampusScribe Logo" className="h-9 w-auto object-contain" />
                        <span className="text-xl font-bold tracking-tight text-navy-800 hidden sm:block">
                            Campus Scribe
                        </span>
                    </Link>
                </div>

                {/* Center Section: Search Bar (Desktop) */}
                <div className="hidden flex-1 items-center justify-center px-4 md:flex lg:px-8">
                    <form onSubmit={handleSearch} className="relative w-full max-w-lg">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-12 pr-4 text-navy-800 placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
                            placeholder="Search for subjects, courses, or universities..."
                        />
                    </form>
                </div>

                {/* Right Section: Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Mobile Search Toggle */}
                    <button 
                        onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                        className="p-2 text-navy-800 hover:bg-gray-100 rounded-lg md:hidden"
                    >
                        {isMobileSearchOpen ? <X size={24} /> : <Search size={24} />}
                    </button>

                    {/* Menu Dropdown with Categories */}
                    <div className="relative" ref={menuRef}>
                        <button 
                            onClick={() => setShowMenu(!showMenu)}
                            className="hidden lg:flex items-center gap-1 px-3 py-2 text-sm font-medium text-navy-800 hover:text-brand-500 transition-colors"
                        >
                            Menu
                            <ChevronDown size={16} className={`transition-transform ${showMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {showMenu && (
                            <div 
                                className="absolute left-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                                onMouseLeave={() => {
                                    setShowMenu(false);
                                    setExpandedCategory(null);
                                }}
                            >
                                {/* Categories Section Header */}
                                <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                                    Categories
                                </div>
                                
                                {/* Category Items with Submenus */}
                                {categoriesWithStreams.map((category) => (
                                    <div 
                                        key={category.name}
                                        className="relative"
                                        onMouseEnter={() => setExpandedCategory(category.name)}
                                        onMouseLeave={() => setExpandedCategory(null)}
                                    >
                                        <Link 
                                            to={category.path}
                                            className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-500"
                                        >
                                            <span>{category.name}</span>
                                            <ChevronRight size={14} className="text-gray-400" />
                                        </Link>
                                        
                                        {/* Sub-items dropdown */}
                                        {expandedCategory === category.name && (
                                            <div className="absolute left-full top-0 ml-0 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                                                {category.subItems.map((subItem) => (
                                                    <Link
                                                        key={subItem}
                                                        to={`${category.path}&subject=${encodeURIComponent(subItem)}`}
                                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-500"
                                                    >
                                                        <ChevronRight size={12} className="text-gray-400" />
                                                        {subItem}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Divider */}
                                <div className="border-t border-gray-100 my-1"></div>

                                {/* Main Menu Items */}
                                {mainMenuItems.map((item) => (
                                    <Link 
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setShowMenu(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-500"
                                    >
                                        <item.icon size={18} />
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Browse Link (Desktop) */}
                    <Link 
                        to="/browse" 
                        className="hidden lg:inline-flex items-center px-3 py-2 text-sm font-medium text-navy-800 hover:text-brand-500 transition-colors"
                    >
                        Browse Notes
                    </Link>

                    {/* Divider */}
                    <div className="hidden h-6 w-px bg-gray-200 lg:block"></div>

                    {/* Cart */}
                    <Link 
                        to="/cart" 
                        className="relative p-2 text-navy-800 hover:text-brand-500 transition-colors"
                    >
                        {itemCount > 0 && (
                            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white ring-2 ring-white">
                                {itemCount > 9 ? '9+' : itemCount}
                            </span>
                        )}
                        <ShoppingCart size={22} />
                    </Link>

                    {/* User Menu - Using Clerk UserButton */}
                    {isSignedIn ? (
                        <div className="flex items-center gap-2">
                            <UserButton 
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "h-9 w-9"
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link 
                                to="/login" 
                                className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-medium text-navy-800 hover:text-brand-500 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link 
                                to="/register" 
                                className="inline-flex items-center px-4 py-2 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-600 transition-colors shadow-sm"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Search Bar */}
            {isMobileSearchOpen && (
                <div className="border-t border-gray-200 bg-white px-4 py-3 md:hidden animate-in slide-in-from-top-2 duration-200">
                    <form onSubmit={handleSearch} className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                            className="block w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-12 pr-4 text-navy-800 placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                            placeholder="Search for subjects, courses..."
                        />
                    </form>
                </div>
            )}
        </nav>
    );
};
