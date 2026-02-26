import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/common/Button/Button';

export const Cart = () => {
    const { cart, isLoading, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        navigate('/checkout');
    };

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Looks like you haven't added any notes yet.</p>
                        <Button onClick={() => navigate('/browse')} variant="primary">
                            Start Browsing
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
                    <ShoppingCart className="h-8 w-8" />
                    Shopping Cart ({cart.itemCount} items)
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.items.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                    <p className="text-sm text-gray-600">by {item.seller.name}</p>
                                    <p className="text-brand-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={isLoading || item.quantity <= 1}
                                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        disabled={isLoading}
                                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    disabled={isLoading}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            disabled={isLoading}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${cart.total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Platform Fee (15%)</span>
                                    <span>${(cart.total * 0.15).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${(cart.total * 1.15).toFixed(2)}</span>
                                </div>
                            </div>

                            <Button
                                onClick={handleCheckout}
                                disabled={isLoading || isCheckingOut}
                                variant="primary"
                                className="w-full"
                            >
                                {isCheckingOut ? 'Processing...' : (
                                    <>
                                        Proceed to Checkout
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>

                            <button
                                onClick={() => navigate('/browse')}
                                className="w-full mt-3 text-center text-brand-600 hover:text-brand-700 font-medium"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
