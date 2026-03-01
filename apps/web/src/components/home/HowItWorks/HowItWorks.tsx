import { motion } from 'framer-motion';
import { Search, Upload, DollarSign, BookOpen, Users, Shield } from 'lucide-react';

const steps = [
    {
        icon: <Search size={32} />,
        title: "Search for Notes",
        description: "Browse thousands of study materials from top students at your university and beyond.",
        color: "bg-blue-50 text-blue-600",
        bgColor: "from-blue-50 to-blue-100"
    },
    {
        icon: <BookOpen size={32} />,
        title: "Preview & Buy",
        description: "View sample pages, read reviews, and purchase instantly with secure payment.",
        color: "bg-purple-50 text-purple-600",
        bgColor: "from-purple-50 to-purple-100"
    },
    {
        icon: <Upload size={32} />,
        title: "Upload Your Notes",
        description: "Share your study materials with thousands of students and earn extra income.",
        color: "bg-green-50 text-green-600",
        bgColor: "from-green-50 to-green-100"
    },
    {
        icon: <DollarSign size={32} />,
        title: "Earn Money",
        description: "Get paid instantly via UPI or bank transfer. Earn up to 90% commission on every sale.",
        color: "bg-yellow-50 text-yellow-600",
        bgColor: "from-yellow-50 to-yellow-100"
    }
];

const features = [
    {
        icon: <Shield size={24} />,
        title: "Verified Sellers",
        description: "All sellers are verified students from recognized universities"
    },
    {
        icon: <Users size={24} />,
        title: "Trusted by 50,000+ Students",
        description: "Join thousands of satisfied students who trust CampusScribe"
    }
];

export const HowItWorks = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-semibold mb-4">
                            Simple Process
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                            How CampusScribe Works
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Get started in minutes. Buy or sell study materials with ease.
                        </p>
                    </motion.div>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Card */}
                            <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 h-full">
                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl ₹{step.color} flex items-center justify-center mb-6`}>
                                    {step.icon}
                                </div>

                                {/* Step Number */}
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Connector Line (except for last item) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                    <div className="w-8 h-0.5 bg-gradient-to-r from-brand-300 to-brand-500"></div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Trust Badges */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-500">
                                {feature.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{feature.title}</h4>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

