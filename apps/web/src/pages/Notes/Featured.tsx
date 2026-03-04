import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Sparkles, 
    Star, 
    Award,
    Crown,
    TrendingUp
} from 'lucide-react';
import { notesService } from '../../services/notes.service';
import { Note } from '../../types/note.types';
import { useCart } from '../../context/CartContext';
import { StarRating } from '../../components/common/StarRating/StarRating';
import { formatINR } from '../../utils/currency';

export function Featured() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchFeaturedNotes();
    }, []);

    const fetchFeaturedNotes = async () => {
        try {
            setLoading(true);
            const featuredNotes = await notesService.getFeaturedNotes();
            setNotes(featuredNotes || []);
        } catch (error) {
            console.error('Failed to fetch featured notes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (noteId: string) => {
        try {
            await addToCart(noteId);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-brand-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Crown className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Featured Notes</h1>
                            <p className="text-brand-100">Hand-picked premium content by our team</p>
                        </div>
                    </div>
                    <p className="text-lg text-brand-50 max-w-2xl">
                        Discover the highest quality study materials curated by our experts. 
                        These notes represent the best content on CampusScribe.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Why Featured Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="w-6 h-6 text-yellow-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
                        <p className="text-sm text-gray-600">Every featured note is reviewed by our team for accuracy and completeness</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Top Performers</h3>
                        <p className="text-sm text-gray-600">Only the most popular and highly-rated notes make it to featured</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Best Value</h3>
                        <p className="text-sm text-gray-600">Featured notes consistently deliver the best learning outcomes</p>
                    </div>
                </div>

                {/* Featured Notes Grid */}
                {notes.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No featured notes yet</h3>
                        <p className="text-gray-500 mb-6">Our team is curating the best content for you</p>
                        <Link
                            to="/browse"
                            className="inline-flex items-center px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                        >
                            Browse All Notes
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note, index) => (
                            <div 
                                key={note.id} 
                                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow border-2 border-transparent hover:border-brand-200"
                            >
                                {/* Featured Badge */}
                                <div className="bg-gradient-to-r from-brand-500 to-purple-500 text-white px-4 py-2 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        <span className="text-sm font-medium">Featured</span>
                                    </div>
                                    <span className="text-xs bg-white/20 px-2 py-1 rounded">
                                        #{index + 1}
                                    </span>
                                </div>

                                <div className="p-6">
                                    {/* Category */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-1 bg-brand-50 text-brand-600 text-xs font-medium rounded">
                                            {note.category?.course || 'General'}
                                        </span>
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                            {note.category?.subject || 'Notes'}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <Link 
                                        to={`/notes/${note.id}`}
                                        className="block text-lg font-semibold text-gray-900 hover:text-brand-600 transition-colors mb-2"
                                    >
                                        {note.title}
                                    </Link>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                        {note.description}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <StarRating rating={(note as any).averageRating || 0} size="sm" />
                                        <span className="text-sm text-gray-500">
                                            ({(note as any).reviewCount || 0} reviews)
                                        </span>
                                    </div>

                                    {/* Seller */}
                                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                                        <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-brand-600">
                                                {note.seller?.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {note.seller?.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {note.seller?.university}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-brand-600">
                                                {formatINR(note.price)}
                                            </span>
                                            <p className="text-xs text-gray-500">
                                                {note.purchaseCount || 0} students bought this
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(note.id)}
                                            className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-12 bg-brand-50 rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Want your notes featured?
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Create high-quality study materials and our team may feature them. 
                        Featured notes get 3x more visibility and sales!
                    </p>
                    <Link
                        to="/notes/upload"
                        className="inline-flex items-center px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium"
                    >
                        Upload Your Notes
                    </Link>
                </div>
            </div>
        </div>
    );
}
