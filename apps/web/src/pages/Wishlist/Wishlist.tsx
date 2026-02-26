import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { wishlistService, WishlistItem } from '../../services/wishlist.service';
import { cartService } from '../../services/cart.service';
import { Button } from '../../components/common/Button/Button';

export const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = async () => {
        try {
            const data = await wishlistService.getWishlist();
            setWishlist(data);
        } catch (error) {
            console.error('Failed to load wishlist:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemove = async (noteId: string) => {
        try {
            await wishlistService.removeFromWishlist(noteId);
            setWishlist(prev => prev.filter(item => item.noteId !== noteId));
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
        }
    };

    const handleAddToCart = async (noteId: string) => {
        try {
            await cartService.addItem(noteId);
            alert('Added to cart!');
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                        <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-600 mb-6">Save notes you're interested in for later.</p>
                        <Button onClick={() => navigate('/browse')} variant="primary">
                            Browse Notes
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <Heart className="h-8 w-8 text-red-500" />
                    My Wishlist ({wishlist.length} items)
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <h3 
                                    onClick={() => navigate(`/notes/${item.noteId}`)}
                                    className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-brand-600"
                                >
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">by {item.seller.name}</p>
                                <p className="text-brand-600 font-bold text-xl mb-4">${item.price.toFixed(2)}</p>
                                
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleAddToCart(item.noteId)}
                                        variant="primary"
                                        className="flex-1"
                                    >
                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                        Add to Cart
                                    </Button>
                                    <button
                                        onClick={() => handleRemove(item.noteId)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
