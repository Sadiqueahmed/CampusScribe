import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartService, Cart, CartItem } from '../services/cart.service';

interface CartContextType {
    cart: Cart | null;
    itemCount: number;
    isLoading: boolean;
    addToCart: (noteId: string) => Promise<void>;
    removeFromCart: (itemId: string) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [itemCount, setItemCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCart = async () => {
        try {
            const cartData = await cartService.getCart();
            setCart(cartData);
            setItemCount(cartData.itemCount);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchCart();
        }
    }, []);

    const addToCart = async (noteId: string) => {
        setIsLoading(true);
        try {
            const updatedCart = await cartService.addItem(noteId);
            setCart(updatedCart);
            setItemCount(updatedCart.itemCount);
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromCart = async (itemId: string) => {
        setIsLoading(true);
        try {
            const updatedCart = await cartService.removeItem(itemId);
            setCart(updatedCart);
            setItemCount(updatedCart.itemCount);
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        if (quantity < 1) return;
        setIsLoading(true);
        try {
            const updatedCart = await cartService.updateItem(itemId, quantity);
            setCart(updatedCart);
            setItemCount(updatedCart.itemCount);
        } finally {
            setIsLoading(false);
        }
    };

    const clearCart = async () => {
        setIsLoading(true);
        try {
            await cartService.clearCart();
            setCart(null);
            setItemCount(0);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshCart = async () => {
        await fetchCart();
    };

    return (
        <CartContext.Provider value={{
            cart,
            itemCount,
            isLoading,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            refreshCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
