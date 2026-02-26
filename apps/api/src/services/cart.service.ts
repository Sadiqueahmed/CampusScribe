import { prisma } from '@campus-scribe/database';

export class CartService {
    static async getCart(userId: string) {
        let cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        note: {
                            select: {
                                id: true,
                                title: true,
                                price: true,
                                description: true,
                                previewUrl: true,
                                seller: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        // Create cart if it doesn't exist
        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId
                },
                include: {
                    items: {
                        include: {
                            note: {
                                select: {
                                    id: true,
                                    title: true,
                                    price: true,
                                    description: true,
                                    previewUrl: true,
                                    seller: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }

        // Calculate totals
        const subtotal = cart.items.reduce((sum: number, item: any) => sum + (item.note.price * item.quantity), 0);
        const itemCount = cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);

        return {
            ...cart,
            subtotal,
            itemCount
        };
    }

    static async addToCart(userId: string, noteId: string) {
        // Check if note exists and is approved
        const note = await prisma.note.findFirst({
            where: {
                id: noteId,
                isApproved: true
            }
        });

        if (!note) {
            throw new Error('Note not found or not available');
        }

        // Check if user already owns this note
        const existingPurchase = await prisma.purchase.findFirst({
            where: {
                buyerId: userId,
                noteId,
                status: 'COMPLETED'
            }
        });

        if (existingPurchase) {
            throw new Error('You already own this note');
        }

        // Get or create cart
        let cart = await prisma.cart.findUnique({
            where: { userId }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId }
            });
        }

        // Check if item already in cart
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                noteId
            }
        });

        if (existingItem) {
            throw new Error('Item already in cart');
        }

        // Add item to cart
        const cartItem = await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                noteId,
                quantity: 1
            },
            include: {
                note: {
                    select: {
                        id: true,
                        title: true,
                        price: true
                    }
                }
            }
        });

        return cartItem;
    }

    static async removeFromCart(userId: string, itemId: string) {
        const cart = await prisma.cart.findUnique({
            where: { userId }
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        const item = await prisma.cartItem.findFirst({
            where: {
                id: itemId,
                cartId: cart.id
            }
        });

        if (!item) {
            throw new Error('Item not found in cart');
        }

        await prisma.cartItem.delete({
            where: { id: itemId }
        });

        return { message: 'Item removed from cart' };
    }

    static async clearCart(userId: string) {
        const cart = await prisma.cart.findUnique({
            where: { userId }
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id }
        });

        return { message: 'Cart cleared' };
    }

    static async getCartCount(userId: string) {
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: true
            }
        });

        if (!cart) {
            return 0;
        }

        return cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    }
}
