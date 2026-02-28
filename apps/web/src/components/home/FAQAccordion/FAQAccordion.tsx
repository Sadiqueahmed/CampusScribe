import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
}

const faqs: FAQ[] = [
    {
        question: "How do I sell my notes on CampusScribe?",
        answer: "Simply create an account, click on 'Upload Note', fill in the details about your study material, upload the PDF file, set your price, and publish. Once approved, your notes will be available for thousands of students to purchase."
    },
    {
        question: "How much commission do I earn from each sale?",
        answer: "You can earn up to 90% commission on every sale! The platform fee is kept minimal to maximize your earnings. Commission rates may vary based on your seller tier and note quality."
    },
    {
        question: "How do I receive payments?",
        answer: "We support multiple payment methods including UPI, bank transfer, and Paytm. Payments are processed instantly after a successful transaction and can be withdrawn to your registered bank account."
    },
    {
        question: "Are the notes verified for quality?",
        answer: "Yes! All notes undergo a quality check by our team before being published. We also have a rating and review system to help students identify high-quality study materials."
    },
    {
        question: "Can I get a refund if I'm not satisfied?",
        answer: "We offer a 7-day refund policy for all purchases. If you're not satisfied with the quality of notes, you can request a refund within 7 days of purchase."
    },
    {
        question: "What file formats are supported for uploads?",
        answer: "We support PDF format for all study materials. You can also upload images (JPG, PNG) for preview pages. Make sure your files are clear and legible for the best user experience."
    }
];

export const FAQAccordion = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 bg-white">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-semibold mb-4">
                        Need Help?
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Find answers to common questions about CampusScribe
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border border-gray-200 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                                <ChevronDown 
                                    size={20} 
                                    className={`text-brand-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">Still have questions?</p>
                    <a 
                        href="/contact" 
                        className="inline-block px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
};
