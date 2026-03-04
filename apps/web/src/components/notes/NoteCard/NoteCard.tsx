import { useState } from 'react';
import { Note } from '../../../types/note.types';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, MapPin, Tag, ShoppingCart, Heart, Loader2, Check } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { wishlistService } from '../../../services/wishlist.service';
import { useAuth } from '../../../context/AuthContext';
import { formatINR } from '../../../utils/currency';

interface NoteCardProps {
    note: Note;
    onWishlistToggle?: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onWishlistToggle }) => {
    const navigate = useNavigate();
    const { addToCart, isLoading: cartLoading } = useCart();
    const { isSignedIn } = useAuth();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleWishlistClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isSignedIn) {
            navigate('/login');
            return;
        }

        try {
            setWishlistLoading(true);
            const result = await wishlistService.toggleWishlist(note.id);
            setIsInWishlist(result.isInWishlist);
            onWishlistToggle?.();
        } catch (error) {
            console.error('Failed to toggle wishlist:', error);
        } finally {
            setWishlistLoading(false);
        }
    };

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isSignedIn) {
            navigate('/login');
            return;
        }

        try {
            await addToCart(note.id);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl relative">
            {/* Wishlist Button */}
            <button
                onClick={handleWishlistClick}
                disabled={wishlistLoading}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95"
            >
                {wishlistLoading ? (
                    <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                ) : isInWishlist ? (
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                ) : (
                    <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                )}
            </button>

            <div className="absolute top-4 left-4 z-10 rounded-md bg-green-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
                -20%
            </div>

            <Link to={`/notes/${note.id}`} className="relative h-48 w-full bg-brand-50 flex items-center justify-center overflow-hidden">
                {/* Abstract pattern or placeholder for Document cover */}
                <BookOpen className="h-16 w-16 text-brand-200 group-hover:scale-110 transition-transform duration-300" />
            </Link>

            <div className="flex flex-1 flex-col p-6">
                {note.category && (
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-500">
                        <Tag size={12} />
                        {note.category.course} • {note.category.subject}
                    </div>
                )}

                <Link to={`/notes/${note.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-2">
                        {note.title}
                    </h3>
                </Link>

                <p className="flex-1 text-sm text-gray-600 line-clamp-2 mb-4">
                    {note.description}
                </p>

                <div className="mt-auto flex flex-col gap-4 border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-black text-gray-900">
                                    {formatINR(note.price)}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    {formatINR(note.price * 1.25)}
                                </span>
                            </div>
                            <span className="text-xs text-green-600 font-semibold gap-1 flex items-center mt-0.5">
                                <MapPin size={10} /> {note.seller?.university || 'Global'}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={cartLoading || addedToCart}
                            className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold shadow-md transition-all active:scale-95 ${
                                addedToCart 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-brand-500 text-white hover:bg-brand-600 hover:shadow-brand-500/40'
                            }`}
                        >
                            {addedToCart ? (
                                <>
                                    <Check size={16} />
                                    Added!
                                </>
                            ) : cartLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <ShoppingCart size={16} />
                                    Add to Cart
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
