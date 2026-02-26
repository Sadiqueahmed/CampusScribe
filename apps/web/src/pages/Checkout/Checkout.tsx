import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { paymentService } from '../../services/payment.service';
import { Button } from '../../components/common/Button/Button';

export const Checkout = () => {
    const { cart, refreshCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const handleCheckout = async () => {
        if (!cart || cart.items.length === 0) {
            setError('Your cart is empty');
            return;
        }

        setIsProcessing(true);
        setError('');

        try {
            const noteIds = cart.items.map(item => item.noteId);
            const { url } = await paymentService.createCheckout(noteIds);
            
            // Redirect to Stripe checkout
            window.location.href = url;
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to initiate checkout. Please try again.');
            setIsProcessing(false);
        }
    };

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Complete!</h2>
                        <p className="text-gray-600 mb-6">Thank you for your purchase. Your notes are now available in your library.</p>
                        <Button onClick={() => navigate('/dashboard')} variant="primary">
                            View My Notes
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                        <div className="space-y-3">
                            {cart.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-900">{item.title}</p>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50">
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
                        <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                            <span>Total</span>
                            <span>${(cart.total * 1.15).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <CreditCard className="h-6 w-6 text-brand-600" />
                        <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        You'll be redirected to Stripe's secure checkout to complete your payment.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Lock className="h-4 w-4" />
                        <span>Your payment information is secure and encrypted</span>
                    </div>
                </div>

                <Button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    variant="primary"
                    className="w-full py-4 text-lg"
                >
                    {isProcessing ? 'Processing...' : `Pay $${(cart.total * 1.15).toFixed(2)}`}
                </Button>

                <button
                    onClick={() => navigate('/cart')}
                    className="w-full mt-4 text-center text-gray-600 hover:text-gray-900 font-medium"
                >
                    Back to Cart
                </button>
            </div>
        </div>
    );
};
