import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Heart, MessageSquare, LayoutDashboard, LogOut, Menu, BookOpen, Calculator, FlaskConical, Palette, Briefcase, Stethoscope, Scale, TrendingUp, Star, Search } from 'lucide-react';
import { UserProfile } from '../../../types/user.types';

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserProfile | null;
    logout: () => void;
}

const categories = [
    { name: 'Engineering & CS', icon: <Calculator size={20} />, link: '/browse?category=engineering' },
    { name: 'Science', icon: <FlaskConical size={20} />, link: '/browse?category=science' },
    { name: 'Arts & Humanities', icon: <Palette size={20} />, link: '/browse?category=arts' },
    { name: 'Business', icon: <Briefcase size={20} />, link: '/browse?category=business' },
    { name: 'Medical', icon: <Stethoscope size={20} />, link: '/browse?category=medical' },
    { name: 'Law', icon: <Scale size={20} />, link: '/browse?category=law' },
];

export const MobileDrawer = ({ isOpen, onClose, user, logout }: MobileDrawerProps) => {
    const [showCategories, setShowCategories] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <Link 
                        to="/" 
                        className="flex items-center space-x-2"
                        onClick={onClose}
                    >
                        <div className="h-8 w-8 bg-brand-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">C</span>
                        </div>
                        <span className="text-lg font-bold">CampusScribe</span>
                    </Link>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4">
                    <Link 
                        to="/browse"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl text-gray-500"
                    >
                        <Search size={20} />
                        <span>Search notes...</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="px-4 pb-4">
                    <Link 
                        to="/browse"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                    >
                        <BookOpen size={20} />
                        Browse Notes
                    </Link>
                    
                    <Link 
                        to="/trending"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                    >
                        <TrendingUp size={20} />
                        Trending
                    </Link>
                    
                    <Link 
                        to="/featured"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                    >
                        <Star size={20} />
                        Featured
                    </Link>

                    {/* Categories */}
                    <button 
                        onClick={() => setShowCategories(!showCategories)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                    >
                        <span className="flex items-center gap-3">
                            <Briefcase size={20} />
                            Categories
                        </span>
                        <span className={`transform transition-transform ${showCategories ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </button>

                    {showCategories && (
                        <div className="ml-4 mt-2 space-y-1">
                            {categories.map((cat, idx) => (
                                <Link
                                    key={idx}
                                    to={cat.link}
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-brand-50 hover:text-brand-600"
                                >
                                    {cat.icon}
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </nav>

                {/* Divider */}
                <div className="border-t border-gray-100 mx-4" />

                {/* User Menu */}
                {user ? (
                    <div className="px-4 py-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Link 
                                to="/dashboard" 
                                onClick={onClose}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                <LayoutDashboard size={20} />
                                Dashboard
                            </Link>
                            <Link 
                                to="/cart" 
                                onClick={onClose}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                <ShoppingCart size={20} />
                                Cart
                            </Link>
                            <Link 
                                to="/wishlist" 
                                onClick={onClose}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                <Heart size={20} />
                                Wishlist
                            </Link>
                            <Link 
                                to="/messages" 
                                onClick={onClose}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                <MessageSquare size={20} />
                                Messages
                            </Link>
                            <button 
                                onClick={() => {
                                    logout();
                                    onClose();
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="px-4 py-4 space-y-3">
                        <Link 
                            to="/login"
                            onClick={onClose}
                            className="block w-full px-4 py-3 text-center border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Log In
                        </Link>
                        <Link 
                            to="/register"
                            onClick={onClose}
                            className="block w-full px-4 py-3 text-center bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export const MobileMenuButton = ({ onClick }: { onClick: () => void }) => (
    <button 
        onClick={onClick}
        className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100"
    >
        <Menu size={24} />
    </button>
);

