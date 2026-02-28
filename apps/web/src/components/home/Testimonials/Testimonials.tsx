import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    university: string;
    role: string;
    avatar: string;
    rating: number;
    content: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Priya Sharma",
        university: "Delhi University",
        role: "B.Com Student",
        avatar: "PS",
        rating: 5,
        content: "CampusScribe helped me find exactly what I needed for my finals. The notes were comprehensive and saved me hours of study time!"
    },
    {
        id: 2,
        name: "Rahul Verma",
        university: "IIT Bombay",
        role: "Engineering Student",
        avatar: "RV",
        rating: 5,
        content: "As a seller, I've earned over ₹10,000 uploading my engineering notes. The platform is easy to use and payouts are quick!"
    },
    {
        id: 3,
        name: "Anjali Gupta",
        university: "Mumbai University",
        role: "Medical Student",
        avatar: "AG",
        rating: 5,
        content: "The quality of notes here is amazing. I found detailed diagrams and explanations that textbooks didn't provide."
    },
    {
        id: 4,
        name: "Mohammad Khan",
        university: "Aligarh Muslim University",
        role: "Law Student",
        avatar: "MK",
        rating: 4,
        content: "Great platform for both buying and selling. The verification system gives confidence in the quality of content."
    }
];

export const Testimonials = () => {
    return (
        <section className="py-20 bg-gray-50">
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
                            Student Stories
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                            What Students Say
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Join thousands of satisfied students who trust CampusScribe for their study needs.
                        </p>
                    </motion.div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow relative"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-4 right-4 text-brand-100">
                                <Quote size={32} />
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={16} 
                                        className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.university}</p>
                                    <p className="text-xs text-brand-600 font-medium">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {[
                        { number: "50,000+", label: "Active Students" },
                        { number: "25,000+", label: "Notes Available" },
                        { number: "500+", label: "Universities" },
                        { number: "4.9/5", label: "Average Rating" }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl sm:text-4xl font-black text-brand-600 mb-2">{stat.number}</div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
