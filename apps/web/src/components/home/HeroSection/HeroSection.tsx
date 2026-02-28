import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, BookOpen, Scroll, Video, Users, GraduationCap, TrendingUp, ArrowRight, ShieldCheck, TrendingUp as TrendingUpIcon, Users as UsersIcon, Clock, Star, Heart, ShoppingCart, CheckCircle, PlayCircle, DollarSign, Wallet, BarChart3, Plus, Upload, CreditCard, FileQuestion } from 'lucide-react';
import heroImage from '../../../assets/study.png';

const features = [
    {
        title: 'NOTES',
        subtitle: 'PDF Notes',
        icon: <FileText size={32} />,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
        link: '/browse?type=notes',
        badge: 'Popular'
    },
    {
        title: 'BOOKS',
        subtitle: 'E-Books',
        icon: <BookOpen size={32} />,
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-600',
        link: '/browse?type=books',
        badge: 'New'
    },
    {
        title: 'TEST SERIES',
        subtitle: 'Practice Tests',
        icon: <Scroll size={32} />,
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-50',
        textColor: 'text-green-600',
        link: '/browse?type=test-series',
        badge: null
    },
    {
        title: 'QUESTION BANKS',
        subtitle: 'Solved Papers',
        icon: <FileQuestion size={32} />,
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-600',
        link: '/browse?type=question-banks',
        badge: null
    },
    {
        title: 'VIDEO LECTURES',
        subtitle: 'Online Classes',
        icon: <Video size={32} />,
        color: 'from-red-500 to-red-600',
        bgColor: 'bg-red-50',
        textColor: 'text-red-600',
        link: '/browse?type=videos',
        badge: null
    },
    {
        title: 'MENTORSHIP',
        subtitle: 'Expert Guidance',
        icon: <Users size={32} />,
        color: 'from-indigo-500 to-indigo-600',
        bgColor: 'bg-indigo-50',
        textColor: 'text-indigo-600',
        link: '/mentorship',
        badge: null
    }
];

// Sample new arrivals notes
const newArrivals = [
    {
        id: 1,
        title: 'Advanced Calculus Notes',
        author: 'Sarah Johnson',
        price: 25.99,
        rating: 4.8,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
        category: 'Mathematics'
    },
    {
        id: 2,
        title: 'Organic Chemistry Handbook',
        author: 'Mike Chen',
        price: 29.99,
        rating: 4.9,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=200&fit=crop',
        category: 'Chemistry'
    },
    {
        id: 3,
        title: 'Physics Problem Solutions',
        author: 'Emily Davis',
        price: 22.99,
        rating: 4.7,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300&h=200&fit=crop',
        category: 'Physics'
    },
    {
        id: 4,
        title: 'Microeconomics Study Guide',
        author: 'James Wilson',
        price: 19.99,
        rating: 4.6,
        reviews: 78,
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
        category: 'Economics'
    }
];

// Sample test series
const testSeries = [
    {
        id: 1,
        title: 'JEE Main Complete Test Series',
        description: '50 Mock Tests with Solutions',
        price: 99.99,
        originalPrice: 199.99,
        rating: 4.9,
        students: '12,500+',
        image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=250&fit=crop',
        features: ['50 Full Length Tests', 'Detailed Solutions', 'Video Explanations', 'Performance Analytics'],
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 2,
        title: 'NEET UG Test Series 2024',
        description: '45 Chapter Tests + 10 Full Tests',
        price: 89.99,
        originalPrice: 179.99,
        rating: 4.8,
        students: '8,200+',
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop',
        features: ['55+ Mock Tests', ' Biology Focus', 'NCERT Based', 'Expert Faculty'],
        color: 'from-green-500 to-emerald-500'
    },
    {
        id: 3,
        title: 'GATE Engineering Test Series',
        description: 'Complete Coverage of Syllabus',
        price: 79.99,
        originalPrice: 159.99,
        rating: 4.7,
        students: '5,800+',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
        features: ['30 Sectional Tests', '10 Full Mock Tests', 'Previous Year Papers', 'Shortcut Techniques'],
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 4,
        title: 'UPSC Prelims Test Series',
        description: 'CSAT + GS Paper I',
        price: 149.99,
        originalPrice: 299.99,
        rating: 4.9,
        students: '15,000+',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
        features: ['100+ Topic Tests', '6 Full Mock Tests', 'Current Affairs', 'Answer Writing'],
        color: 'from-orange-500 to-red-500'
    }
];

// List Your Products options
const listProducts = [
    {
        title: 'PDF Notes',
        description: 'Sell your handwritten or typed study notes',
        icon: <FileText size={32} />,
        color: 'from-blue-500 to-blue-600',
        link: '/notes/upload?type=notes'
    },
    {
        title: 'Test Series',
        description: 'Create and sell practice test papers',
        icon: <Scroll size={32} />,
        color: 'from-green-500 to-green-600',
        link: '/notes/upload?type=test-series'
    },
    {
        title: 'Question Bank',
        description: 'Share solved question papers & answers',
        icon: <FileQuestion size={32} />,
        color: 'from-orange-500 to-orange-600',
        link: '/notes/upload?type=question-banks'
    },
    {
        title: 'Lectures & Courses',
        description: 'Upload video lectures & courses',
        icon: <Video size={32} />,
        color: 'from-red-500 to-red-600',
        link: '/notes/upload?type=videos'
    }
];

// Seller benefits
const sellerBenefits = [
    {
        title: 'Add Product',
        description: 'Easy upload process',
        icon: <Plus size={24} />,
        color: 'bg-green-500'
    },
    {
        title: 'Payment',
        description: 'Secure transactions',
        icon: <CreditCard size={24} />,
        color: 'bg-blue-500'
    },
    {
        title: 'Dashboard',
        description: 'Track your sales',
        icon: <BarChart3 size={24} />,
        color: 'bg-purple-500'
    }
];

const streams = [
    {
        name: 'Arts Stream',
        icon: <GraduationCap size={40} />,
        link: '/browse?stream=arts',
        color: 'from-rose-400 to-pink-500',
        count: '5,000+ Notes'
    },
    {
        name: 'Science Stream',
        icon: <TrendingUp size={40} />,
        link: '/browse?stream=science',
        color: 'from-emerald-400 to-teal-500',
        count: '8,000+ Notes'
    },
    {
        name: 'Commerce Stream',
        icon: <TrendingUp size={40} />,
        link: '/browse?stream=commerce',
        color: 'from-amber-400 to-orange-500',
        count: '6,500+ Notes'
    }
];

export const HeroSection = () => {
    const navigate = useNavigate();
    
    return (
        <div className="relative bg-white overflow-hidden">
            {/* Main Hero Section with Image */}
            <div className="mx-auto max-w-7xl pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pb-20 lg:pt-24 px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-16">
                    {/* Text Content */}
                    <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left flex flex-col justify-center mb-12 lg:mb-0 z-10">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl mb-6"
                        >
                            Ace your exams with <span className="text-brand-500 whitespace-nowrap">top-tier</span><br />study notes
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mt-4 text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl sm:mx-auto lg:mx-0"
                        >
                            The ultimate marketplace to buy and sell authentic class notes, study guides, and flashcards from top students at your university.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start"
                        >
                            <button 
                                onClick={() => navigate('/browse')}
                                className="w-full sm:w-auto px-8 py-3.5 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5 text-lg"
                            >
                                Start Browsing
                            </button>
                            <button 
                                onClick={() => navigate('/register')}
                                className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-900 border-2 border-gray-200 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all text-lg shadow-sm"
                            >
                                Become a Seller
                            </button>
                        </motion.div>
                    </div>

                    {/* Image Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative lg:col-span-6 flex items-center justify-center lg:justify-end"
                    >
                        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                            {/* Decorative background blob */}
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-brand-100 to-pink-50 opacity-50 blur-2xl"></div>

                            <img
                                src={heroImage}
                                alt="Student studying with notes"
                                className="relative z-10 w-full drop-shadow-2xl object-contain animate-fade-in-up"
                                style={{ maxHeight: '500px' }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Trust Banners */}
            <div className="bg-brand-50 border-y border-brand-100 py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-brand-500">
                                <TrendingUpIcon size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Highest Commission</h3>
                                <p className="text-sm text-gray-600">Sell at 90% Commission</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-brand-500">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Secure Payments</h3>
                                <p className="text-sm text-gray-600">Encrypted & Instant Withdrawals</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-brand-500">
                                <UsersIcon size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Verified Material</h3>
                                <p className="text-sm text-gray-600">Quality checked by Top Students</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Cards Section */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link 
                                    to={feature.link}
                                    className="group relative flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Badge */}
                                    {feature.badge && (
                                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                                            {feature.badge}
                                        </span>
                                    )}
                                    
                                    {/* Icon */}
                                    <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <span className={feature.textColor}>{feature.icon}</span>
                                    </div>

                                    {/* Text */}
                                    <h3 className="font-bold text-gray-900 text-center text-sm">{feature.title}</h3>
                                    <p className="text-xs text-gray-500">{feature.subtitle}</p>

                                    {/* Arrow on hover */}
                                    <div className="absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight size={16} className="text-brand-500" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* New Arrivals Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <span className="flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-brand-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                            </span>
                            <h3 className="text-xl font-bold text-gray-900">New Arrivals</h3>
                        </div>
                        <Link to="/browse?sort=newest" className="text-brand-500 font-semibold hover:text-brand-600 flex items-center gap-1">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {newArrivals.map((note, index) => (
                            <motion.div
                                key={note.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                                {/* Note Image */}
                                <div className="relative h-40 overflow-hidden">
                                    <img 
                                        src={note.image} 
                                        alt={note.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-gray-700">
                                            {note.category}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                                        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 transition-colors">
                                            <Heart size={16} />
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Note Info */}
                                <div className="p-4">
                                    <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">{note.title}</h4>
                                    <p className="text-sm text-gray-500 mb-3">by {note.author}</p>
                                    
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-1">
                                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm font-semibold text-gray-900">{note.rating}</span>
                                            <span className="text-xs text-gray-500">({note.reviews})</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Clock size={12} />
                                            <span>2h ago</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-brand-600">${note.price}</span>
                                        <button 
                                            onClick={() => navigate(`/notes/${note.id}`)}
                                            className="p-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                                        >
                                            <ShoppingCart size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Test Series Collection - Now above Seller CTA */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                                <Scroll size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Test Series Collection</h3>
                        </div>
                        <Link to="/browse?type=test-series" className="text-brand-500 font-semibold hover:text-brand-600 flex items-center gap-1">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {testSeries.map((test, index) => (
                            <motion.div
                                key={test.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                                {/* Test Series Image */}
                                <div className="relative h-40 overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${test.color}`}></div>
                                    <img 
                                        src={test.image} 
                                        alt={test.title}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <div className="flex items-center gap-2 text-white/90 text-xs mb-1">
                                            <PlayCircle size={14} />
                                            <span>{test.students} students enrolled</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-gray-900 flex items-center gap-1">
                                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                            {test.rating}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Test Series Info */}
                                <div className="p-4">
                                    <h4 className="font-bold text-gray-900 mb-1 line-clamp-2">{test.title}</h4>
                                    <p className="text-sm text-gray-500 mb-3">{test.description}</p>
                                    
                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {test.features.slice(0, 2).map((feature, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                                                <CheckCircle size={10} className="text-green-500" />
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-brand-600">${test.price}</span>
                                            <span className="text-sm text-gray-400 line-through">${test.originalPrice}</span>
                                        </div>
                                        <button 
                                            onClick={() => navigate(`/notes/${test.id}`)}
                                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            <ShoppingCart size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Seller CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-500 to-pink-500 shadow-xl mb-12"
                >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZjwvc3ZnPg==')] opacity-30"></div>
                    <div className="relative px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                                CREATE YOUR FREE STORE
                            </h2>
                            <p className="text-white/90 text-lg">
                                Get up to <span className="font-bold text-yellow-300">90% Commission</span> on each product sold
                            </p>
                        </div>
                        <Link 
                            to="/register?seller=true"
                            className="shrink-0 px-8 py-4 bg-white text-brand-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            Start Selling Now
                        </Link>
                    </div>
                </motion.div>

                {/* List Your Products Section - Banner Above, What Can You Sell Below */}
                <div className="mb-12">
                    {/* Banner Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                        {/* Left Side - Banner */}
                        <div className="lg:col-span-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl h-full min-h-[200px] flex flex-col justify-center"
                            >
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZjwvc3ZnPg==')] opacity-30"></div>
                                <div className="relative px-8 py-6 text-center">
                                    <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                                        LIST YOUR PRODUCTS
                                    </h2>
                                    <p className="text-white/90 text-lg mb-4">
                                        Start selling your study materials and earn up to <span className="font-bold text-yellow-300">90% Commission</span>
                                    </p>
                                    <div className="flex justify-center">
                                        <Link 
                                            to="/notes/upload"
                                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-600 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
                                        >
                                            <Plus size={20} />
                                            Add Product
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Side - Benefits */}
                        <div className="lg:col-span-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
                                {sellerBenefits.map((benefit, index) => (
                                    <div key={index} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                        <div className={`w-12 h-12 rounded-xl ${benefit.color} flex items-center justify-center text-white mb-3`}>
                                            {benefit.icon}
                                        </div>
                                        <div className="text-center">
                                            <h5 className="font-bold text-gray-900 text-sm">{benefit.title}</h5>
                                            <p className="text-xs text-gray-500">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* What Can You Sell Section - Below Banner */}
                    <div>
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">What Can You Sell?</h3>
                            <p className="text-gray-600">Choose your product type to get started</p>
                        </div>
                        
                        {/* Product Types Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {listProducts.map((product, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Link 
                                        to={product.link}
                                        className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
                                    >
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                                            {product.icon}
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-1">{product.title}</h4>
                                        <p className="text-sm text-gray-500">{product.description}</p>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stream Selector */}
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Browse by Stream</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {streams.map((streamItem, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link 
                                    to={streamItem.link}
                                    className="group flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${streamItem.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                        {streamItem.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{streamItem.name}</h4>
                                        <p className="text-brand-600 font-medium">{streamItem.count}</p>
                                    </div>
                                    <ArrowRight className="ml-auto text-gray-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
