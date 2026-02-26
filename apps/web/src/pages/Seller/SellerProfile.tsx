import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    Star, 
    MapPin, 
    BookOpen, 
    Users, 
    Award,
    MessageSquare,
    ChevronRight,
    Calendar
} from 'lucide-react';
import { userService } from '../../services/user.service';
import { notesService } from '../../services/notes.service';
import { reviewService } from '../../services/review.service';
import { Note } from '../../types/note.types';
import { StarRating } from '../../components/common/StarRating/StarRating';

interface SellerProfile {
    id: string;
    name: string;
    avatar?: string;
    university?: string;
    bio?: string;
    isSellerVerified: boolean;
    joinedAt: string;
    totalNotes: number;
    totalSales: number;
    averageRating: number;
    reviewCount: number;
}

interface Review {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    reviewerName: string;
    noteTitle: string;
}

export function SellerProfile() {
    const { id } = useParams<{ id: string }>();
    const [seller, setSeller] = useState<SellerProfile | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'notes' | 'reviews'>('notes');

    useEffect(() => {
        if (id) {
            fetchSellerData();
        }
    }, [id]);

    const fetchSellerData = async () => {
        try {
            setLoading(true);
            const [profileData, notesData, reviewsData] = await Promise.all([
                userService.getPublicProfile(id!),
                notesService.getNotesBySeller(id!),
                reviewService.getSellerReviews(id!)
            ]);

            // Transform UserProfile to SellerProfile
            setSeller({
                ...profileData,
                joinedAt: profileData.createdAt || new Date().toISOString(),
                totalNotes: 0, // Will be updated from notesData
                totalSales: 0,
                averageRating: reviewsData.stats?.averageRating || 0,
                reviewCount: reviewsData.stats?.totalReviews || 0
            });
            setNotes(notesData.data?.notes || []);
            setReviews(reviewsData.reviews || []);
        } catch (error) {
            console.error('Failed to fetch seller data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
            </div>
        );
    }

    if (!seller) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900">Seller not found</h2>
                    <Link to="/browse" className="text-brand-500 hover:text-brand-600 mt-2 inline-block">
                        Browse notes
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Banner */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center text-3xl font-bold text-brand-600">
                            {seller.avatar ? (
                                <img src={seller.avatar} alt={seller.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                seller.name.charAt(0).toUpperCase()
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl font-bold text-gray-900">{seller.name}</h1>
                                {seller.isSellerVerified && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center">
                                        <Award className="w-3 h-3 mr-1" />
                                        Verified
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                                {seller.university && (
                                    <span className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {seller.university}
                                    </span>
                                )}
                                <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    Joined {new Date(seller.joinedAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center">
                                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                    {seller.averageRating.toFixed(1)} ({seller.reviewCount} reviews)
                                </span>
                            </div>

                            {seller.bio && (
                                <p className="text-gray-600 max-w-2xl">{seller.bio}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Link
                                to={`/messages?userId=${seller.id}`}
                                className="inline-flex items-center px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Message
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{seller.totalNotes}</p>
                            <p className="text-sm text-gray-600">Notes</p>
                        </div>
                        <div className="text-center border-x border-gray-200">
                            <p className="text-2xl font-bold text-gray-900">{seller.totalSales}</p>
                            <p className="text-sm text-gray-600">Sales</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{seller.averageRating.toFixed(1)}</p>
                            <p className="text-sm text-gray-600">Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('notes')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'notes'
                                    ? 'border-brand-500 text-brand-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <BookOpen className="w-4 h-4 inline mr-2" />
                            Notes ({notes.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'reviews'
                                    ? 'border-brand-500 text-brand-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <Star className="w-4 h-4 inline mr-2" />
                            Reviews ({reviews.length})
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'notes' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">No notes yet</p>
                            </div>
                        ) : (
                            notes.map((note) => (
                                <Link
                                    key={note.id}
                                    to={`/notes/${note.id}`}
                                    className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    <div className="p-6">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                                            {note.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                            {note.description}
                                        </p>
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-lg font-bold text-brand-600">
                                                ${note.price.toFixed(2)}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {note.purchaseCount || 0} sales
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {reviews.length === 0 ? (
                            <div className="text-center py-12">
                                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">No reviews yet</p>
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <StarRating rating={review.rating} size="sm" />
                                                <span className="text-sm text-gray-500">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                on <span className="font-medium">{review.noteTitle}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
