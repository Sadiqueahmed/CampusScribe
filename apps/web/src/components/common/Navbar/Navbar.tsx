import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { BookOpen, Search, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useState } from 'react';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

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
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                            <BookOpen size={20} />
                        </div>
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
                        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[10px] font-medium text-white ring-2 ring-white">
                            0
                        </span>
                        <ShoppingCart size={20} />
                    </Link>

                    {user ? (
                        <div className="hidden sm:flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                            <Button variant="ghost" size="sm" onClick={logout}>
                                Log out
                            </Button>
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
