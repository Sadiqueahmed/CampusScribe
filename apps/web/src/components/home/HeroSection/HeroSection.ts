import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, BookOpen, Scroll, Video, Users, GraduationCap, TrendingUp, ArrowRight } from 'lucide-react';

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
        icon: <FileText size={32} />,
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
    return (
        <section className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')]"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                {/* Feature Cards */}
                <div className="mb-12">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link 
                                    to={feature.link}
                                    className="group relative flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Badge */}
                                    {feature.badge && (
                                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                                            {feature.badge}
                                        </span>
                                    )}
                                    
                                    {/* Icon */}
                                    <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <span className={feature.textColor}>{feature.icon}</span>
                                    </div>

                                    {/* Text */}
                                    <h3 className="font-bold text-gray-900 text-center">{feature.title}</h3>
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

                {/* Seller CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
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

                {/* Stream Selector */}
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Browse by Stream</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {streams.map((stream, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                            >
                                <Link 
                                    to={stream.link}
                                    className="group flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stream.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                        {stream.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{stream.name}</h4>
                                        <p className="text-brand-600 font-medium">{stream.count}</p>
                                    </div>
                                    <ArrowRight className="ml-auto text-gray-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
