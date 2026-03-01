import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { notesService } from '../../services/notes.service';
import { Note } from '../../types/note.types';
import { BookOpen, MapPin, Tag, ShoppingCart, ShieldCheck, Star, Users, CheckCircle, ArrowLeft } from 'lucide-react';

export const NoteDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNote = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const fetchedNote = await notesService.getNoteById(id);
                setNote(fetchedNote);
            } catch (err) {
                setError('Failed to load note details.');
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50">
                <svg className="animate-spin h-8 w-8 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    if (error || !note) {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gray-50 p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Note Not Found</h2>
                <p className="text-gray-600 mb-6">{error || "The study material you're looking for doesn't exist."}</p>
                <Link to="/browse" className="text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Browse
                </Link>
            </div>
        );
    }

    const maxPrice = (note.price * 1.25).toFixed(2);

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Breadcrumbs */}
                <nav className="mb-6 flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li><Link to="/" className="hover:text-gray-900">Home</Link></li>
                        <li><span className="mx-2">/</span></li>
                        <li><Link to="/browse" className="hover:text-gray-900">Browse</Link></li>
                        <li><span className="mx-2">/</span></li>
                        {note.category && (
                            <>
                                <li><Link to={`/browse?category=₹{note.category.course}`} className="hover:text-gray-900">{note.category.course}</Link></li>
                                <li><span className="mx-2">/</span></li>
                            </>
                        )}
                        <li className="text-gray-900 font-medium truncate w-32 sm:w-auto">{note.title}</li>
                    </ol>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Product Info */}
                    <div className="flex-1 space-y-8">
                        {/* Cover Image Placeholder */}
                        <div className="w-full bg-brand-50 rounded-2xl aspect-[16/9] sm:aspect-[21/9] flex items-center justify-center border border-brand-100 relative group overflow-hidden">
                            <BookOpen className="w-24 h-24 text-brand-200 group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-gray-900">
                                <BookOpen size={16} className="text-brand-500" />
                                Digital Document PDF
                            </div>
                        </div>

                        {/* Title & Description */}
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                {note.category && (
                                    <span className="inline-flex items-center gap-1.5 rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 uppercase tracking-wide">
                                        <Tag size={12} />
                                        {note.category.subject}
                                    </span>
                                )}
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" className="text-gray-300" />
                                    <span className="text-xs text-gray-500 font-medium ml-1">(12 reviews)</span>
                                </div>
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                                {note.title}
                            </h1>

                            <div className="prose prose-brand max-w-none text-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">About this Material</h3>
                                <p className="whitespace-pre-wrap leading-relaxed">{note.description}</p>

                                <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Highlights</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" /> High-quality, organized pages</li>
                                    <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" /> Covers midterm and final study topics</li>
                                    <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" /> Instant digital download</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Checkout Panel */}
                    <div className="w-full lg:w-96 shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-brand-500/5 p-6 sm:p-8 sticky top-24">

                            {/* Seller Mini Profile */}
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-lg">
                                    {note.seller?.name?.charAt(0) || 'A'}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">Sold by
                                        <ShieldCheck size={14} className="text-green-500" />
                                    </p>
                                    <h3 className="font-bold text-gray-900">{note.seller?.name || 'Anonymous Student'}</h3>
                                    {note.seller?.university && (
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                            <MapPin size={12} /> {note.seller.university}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="mb-6">
                                <div className="flex items-end gap-3 mb-1">
                                    <span className="text-4xl font-black text-gray-900">₹{note.price.toFixed(2)}</span>
                                    <span className="text-lg text-gray-400 line-through mb-1">₹{maxPrice}</span>
                                    <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded mb-1.5 ml-auto">
                                        20% OFF
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-2">
                                    <Users size={16} className="text-brand-500" />
                                    <span className="font-medium text-gray-900">160+ students</span> bought this recently
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button className="w-full bg-brand-500 text-white rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/25 active:scale-95">
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                                <button className="w-full bg-green-500 text-white rounded-xl py-3.5 font-bold hover:bg-green-600 transition-all active:scale-95">
                                    Buy Now
                                </button>
                            </div>

                            <div className="mt-6 flex flex-col gap-2 text-xs text-gray-500 font-medium text-center">
                                <span className="flex items-center justify-center gap-1.5 text-gray-600 bg-gray-50 py-2 rounded-lg">
                                    <ShieldCheck size={14} className="text-brand-500" />
                                    100% Secure Checkout via UPI/Cards
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
