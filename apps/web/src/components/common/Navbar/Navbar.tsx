import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Search, ShoppingCart, User, Heart, MessageSquare, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { useState } from 'react';
import logo from '../../../assets/logo.png';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const { itemCount } = useCart();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={logo} alt="CampusScribe Logo" className="h-10 w-auto object-contain" />
                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            CampusScribe
                        </span>
                    </Link>
                </div>

                {/* Search */}
                <div className="hidden flex-1 items-center justify-center px-8 md:flex">
                    <form onSubmit={handleSearch} className="relative w-full max-w-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full rounded-full border-0 py-2 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6"
                            placeholder="Search for subjects, courses, or universities..."
                        />
                    </form>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <Link to="/browse" className="text-sm font-medium text-gray-600 hover:text-gray-900 hidden sm:block">
                        Browse Notes
                    </Link>
                    <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

                    <Link to="/cart" className="relative p-2 text-gray-400 hover:text-gray-500">
                        {itemCount > 0 && (
                            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[10px] font-medium text-white ring-2 ring-white">
                                {itemCount > 9 ? '9+' : itemCount}
                            </span>
                        )}
                        <ShoppingCart size={20} />
                    </Link>

                    {user ? (
                        <div className="hidden sm:flex items-center space-x-4 relative">
                            <Link to="/wishlist" className="p-2 text-gray-400 hover:text-gray-500">
                                <Heart size={20} />
                            </Link>
                            <Link to="/messages" className="p-2 text-gray-400 hover:text-gray-500">
                                <MessageSquare size={20} />
                            </Link>
                            <button 
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-medium">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                            </button>
                            
                            {showUserMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    <Link 
                                        to="/dashboard" 
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <LayoutDashboard size={16} />
                                        Dashboard
                                    </Link>
                                    <Link 
                                        to="/wishlist" 
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <Heart size={16} />
                                        Wishlist
                                    </Link>
                                    <Link 
                                        to="/messages" 
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <MessageSquare size={16} />
                                        Messages
                                    </Link>
                                    <hr className="my-2" />
                                    <button 
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            logout();
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                    >
                                        <LogOut size={16} />
                                        Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="hidden sm:inline-flex">
                                <Button variant="ghost" size="sm">Log in</Button>
                            </Link>
                            <Link to="/register" className="hidden sm:inline-flex">
                                <Button size="sm">Sign up</Button>
                            </Link>
                        </>
                    )}

                    <button className="sm:hidden p-2 text-gray-400 hover:text-gray-500 rounded-md">
                        <User size={20} />
                    </button>
                </div>

            </div>
        </nav>
    );
};
