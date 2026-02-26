import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    TrendingUp, 
    Flame, 
    Eye, 
    ShoppingBag,
    ChevronRight,
    Filter
} from 'lucide-react';
import { notesService } from '../../services/notes.service';
import { Note } from '../../types/note.types';
import { useCart } from '../../context/CartContext';

export function Trending() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | 'all'>('7d');
    const { addToCart } = useCart();

    useEffect(() => {
        fetchTrendingNotes();
    }, [timeRange]);

    const fetchTrendingNotes = async () => {
        try {
            setLoading(true);
            const trendingNotes = await notesService.getTrendingNotes();
            setNotes(trendingNotes || []);
        } catch (error) {
            console.error('Failed to fetch trending notes:', error);
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Flame className="w-6 h-6 text-orange-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Trending Notes</h1>
                    </div>
                    <p className="text-gray-600">
                        Discover the most popular notes students are buying right now
                    </p>
                </div>

                {/* Time Range Filter */}
                <div className="bg-white rounded-xl shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { key: '24h', label: 'Last 24 Hours' },
                                { key: '7d', label: 'Last 7 Days' },
                                { key: '30d', label: 'Last 30 Days' },
                                { key: 'all', label: 'All Time' }
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setTimeRange(tab.key as any)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        timeRange === tab.key
                                            ? 'border-brand-500 text-brand-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Stats Banner */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
                        <div className="flex items-center">
                            <TrendingUp className="w-8 h-8 mr-4" />
                            <div>
                                <p className="text-orange-100 text-sm">Top Seller</p>
                                <p className="text-2xl font-bold">
                                    {notes[0]?.seller?.name || 'No data'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <ShoppingBag className="w-8 h-8 text-brand-500 mr-4" />
                            <div>
                                <p className="text-gray-600 text-sm">Total Sales</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {notes.reduce((sum, n) => sum + (n.purchaseCount || 0), 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <Eye className="w-8 h-8 text-brand-500 mr-4" />
                            <div>
                                <p className="text-gray-600 text-sm">Total Views</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {notes.reduce((sum, n) => sum + (n.viewCount || 0), 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes Grid */}
                {notes.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <Flame className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No trending notes yet</h3>
                        <p className="text-gray-500 mb-6">Check back later for trending content</p>
                        <Link
                            to="/browse"
                            className="inline-flex items-center px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                        >
                            Browse All Notes
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notes.map((note, index) => (
                            <div 
                                key={note.id} 
                                className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-6 hover:shadow-md transition-shadow"
                            >
                                {/* Rank */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                    index === 1 ? 'bg-gray-100 text-gray-700' :
                                    index === 2 ? 'bg-orange-100 text-orange-700' :
                                    'bg-gray-50 text-gray-500'
                                }`}>
                                    {index + 1}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <Link 
                                        to={`/notes/${note.id}`}
                                        className="text-lg font-semibold text-gray-900 hover:text-brand-600 transition-colors"
                                    >
                                        {note.title}
                                    </Link>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                        {note.description}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                        <span className="flex items-center">
                                            <ShoppingBag className="w-4 h-4 mr-1" />
                                            {note.purchaseCount || 0} sales
                                        </span>
                                        <span className="flex items-center">
                                            <Eye className="w-4 h-4 mr-1" />
                                            {note.viewCount || 0} views
                                        </span>
                                        <span>by {note.seller?.name}</span>
                                    </div>
                                </div>

                                {/* Price & Action */}
                                <div className="flex items-center gap-4">
                                    <span className="text-xl font-bold text-brand-600">
                                        ${note.price.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => handleAddToCart(note.id)}
                                        className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
