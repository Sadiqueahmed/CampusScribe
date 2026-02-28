import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand & Description */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <div className="h-10 w-10 bg-brand-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">C</span>
                            </div>
                            <span className="text-2xl font-bold">CampusScribe</span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-md">
                            The ultimate marketplace to buy and sell authentic class notes, study guides, and flashcards from top students at your university.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-400">
                                <Mail size={18} className="text-brand-500" />
                                <span>support@campusscribe.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <Phone size={18} className="text-brand-500" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <MapPin size={18} className="text-brand-500" />
                                <span>123 Education Street, New York, NY</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/browse" className="text-gray-400 hover:text-brand-500 transition-colors">Browse Notes</Link></li>
                            <li><Link to="/trending" className="text-gray-400 hover:text-brand-500 transition-colors">Trending</Link></li>
                            <li><Link to="/featured" className="text-gray-400 hover:text-brand-500 transition-colors">Featured</Link></li>
                            <li><Link to="/universities" className="text-gray-400 hover:text-brand-500 transition-colors">Universities</Link></li>
                            <li><Link to="/subjects" className="text-gray-400 hover:text-brand-500 transition-colors">Subjects</Link></li>
                        </ul>
                    </div>

                    {/* For Users */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">For Users</h3>
                        <ul className="space-y-3">
                            <li><Link to="/register" className="text-gray-400 hover:text-brand-500 transition-colors">Sign Up</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-brand-500 transition-colors">Login</Link></li>
                            <li><Link to="/notes/upload" className="text-gray-400 hover:text-brand-500 transition-colors">Sell Notes</Link></li>
                            <li><Link to="/dashboard" className="text-gray-400 hover:text-brand-500 transition-colors">Dashboard</Link></li>
                            <li><Link to="/orders" className="text-gray-400 hover:text-brand-500 transition-colors">My Orders</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-gray-400 hover:text-brand-500 transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-brand-500 transition-colors">Contact</Link></li>
                            <li><Link to="/faq" className="text-gray-400 hover:text-brand-500 transition-colors">FAQ</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-brand-500 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-brand-500 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Subscribe to our Newsletter</h3>
                            <p className="text-gray-400">Get the latest notes and updates directly to your inbox.</p>
                        </div>
                        <div className="flex w-full lg:w-auto">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 lg:w-72 px-4 py-3 rounded-l-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-brand-500"
                            />
                            <button className="px-6 py-3 bg-brand-500 hover:bg-brand-600 rounded-r-lg font-semibold flex items-center gap-2 transition-colors">
                                <Send size={18} />
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 flex items-center gap-4">
                    <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-500 transition-colors">
                        <Facebook size={18} />
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-500 transition-colors">
                        <Twitter size={18} />
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-500 transition-colors">
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-500 transition-colors">
                        <Linkedin size={18} />
                    </a>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-gray-950 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} CampusScribe. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <Link to="/terms" className="hover:text-brand-500 transition-colors">Terms</Link>
                            <Link to="/privacy" className="hover:text-brand-500 transition-colors">Privacy</Link>
                            <Link to="/cookies" className="hover:text-brand-500 transition-colors">Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

