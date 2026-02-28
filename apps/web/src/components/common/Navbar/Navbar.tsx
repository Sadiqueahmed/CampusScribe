import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, MessageSquare, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { useState, useRef, useEffect } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import logo from '../../../assets/logo.png';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const { itemCount } = useCart();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
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
        <>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    
                    {/* Left Section: Menu & Logo */}
                    <div className="flex items-center gap-3">
                        {/* Categories Button (Mobile) */}
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 text-navy-800 hover:bg-gray-100 rounded-lg lg:hidden"
                        >
                            <Menu size={24} />
                        </button>

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

                        {/* User Menu */}
                        {user ? (
                            <div className="relative" ref={userMenuRef}>
                                <button 
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center text-white font-medium text-sm">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden md:block text-sm font-medium text-navy-800">
                                        {user.name?.split(' ')[0]}
                                    </span>
                                </button>
                                
                                {showUserMenu && (
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-navy-800">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                        <div className="py-1">
                                            <Link 
                                                to="/dashboard" 
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <LayoutDashboard size={18} />
                                                Dashboard
                                            </Link>
                                            <Link 
                                                to="/wishlist" 
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <Heart size={18} />
                                                Wishlist
                                            </Link>
                                            <Link 
                                                to="/messages" 
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <MessageSquare size={18} />
                                                Messages
                                            </Link>
                                            <Link 
                                                to="/profile" 
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <User size={18} />
                                                Profile
                                            </Link>
                                        </div>
                                        <div className="border-t border-gray-100 pt-1">
                                            <button 
                                                onClick={() => {
                                                    setShowUserMenu(false);
                                                    logout();
                                                }}
                                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut size={18} />
                                                Log out
                                            </button>
                                        </div>
                                    </div>
                                )}
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

                        {/* Mobile Menu Button */}
                        <button 
                            className="p-2 text-navy-800 hover:bg-gray-100 rounded-lg sm:hidden"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
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
        </>
    );
};
