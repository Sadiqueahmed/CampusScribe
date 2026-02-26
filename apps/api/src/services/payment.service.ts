import { prisma } from '@campus-scribe/database';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-06-20',
});

export class PaymentService {
    static async createPaymentIntent(userId: string, noteIds: string[]) {
        // Get notes
        const notes = await prisma.note.findMany({
            where: {
                id: { in: noteIds },
                isApproved: true
            },
            include: {
                seller: true
            }
        });

        if (notes.length !== noteIds.length) {
            throw new Error('Some notes not found or not available');
        }

        // Calculate total
        const totalAmount = notes.reduce((sum: number, note: typeof notes[0]) => sum + note.price, 0);

        // Create purchase records
        const purchases = await Promise.all(
            notes.map((note: typeof notes[0]) => 
                prisma.purchase.create({
                    data: {
                        buyerId: userId,
                        noteId: note.id,
                        amount: note.price,
                        status: 'PENDING'
                    }
                })
            )
        );

        // Create Stripe PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // Convert to cents
            currency: 'usd',
            metadata: {
                userId,
                purchaseIds: purchases.map(p => p.id).join(',')
            }
        });

        return {
            clientSecret: paymentIntent.client_secret,
            totalAmount,
            purchases
        };
    }

    static async confirmPayment(paymentIntentId: string) {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
            throw new Error('Payment not successful');
        }

        const purchaseIds = paymentIntent.metadata.purchaseIds.split(',');
        const userId = paymentIntent.metadata.userId;

        // Update purchases to completed
        await prisma.purchase.updateMany({
            where: {
                id: { in: purchaseIds }
            },
            data: {
                status: 'COMPLETED',
                stripeChargeId: paymentIntent.charges.data[0]?.id
            }
        });

        // Update seller earnings
        const purchases = await prisma.purchase.findMany({
            where: {
                id: { in: purchaseIds }
            },
            include: {
                note: {
                    include: {
                        seller: true
                    }
                }
            }
        });

        for (const purchase of purchases) {
            const sellerAmount = purchase.amount * 0.85; // 15% platform fee
            await prisma.user.update({
                where: { id: purchase.note.sellerId },
                data: {
                    totalEarnings: {
                        increment: sellerAmount
                    },
                    availableBalance: {
                        increment: sellerAmount
                    }
                }
            });

            // Create transaction record
            await prisma.transaction.create({
                data: {
                    userId: purchase.note.sellerId,
                    amount: sellerAmount,
                    type: 'PAYMENT',
                    status: 'COMPLETED',
                    purchaseId: purchase.id
                }
            });
        }

        // Clear user's cart
        await prisma.cartItem.deleteMany({
            where: {
                cart: {
                    userId
                }
            }
        });

        return { message: 'Payment confirmed successfully' };
    }

    static async getPurchaseHistory(userId: string) {
        const purchases = await prisma.purchase.findMany({
            where: {
                buyerId: userId
            },
            include: {
                note: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        fileUrl: true,
                        previewUrl: true,
                        fileType: true,
                        pageCount: true,
                        seller: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true
                            }
                        },
                        category: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return purchases;
    }

    static async getSalesHistory(sellerId: string) {
        const sales = await prisma.purchase.findMany({
            where: {
                note: {
                    sellerId
                },
                status: 'COMPLETED'
            },
            include: {
                note: {
                    select: {
                        id: true,
                        title: true,
                        price: true
                    }
                },
                buyer: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return sales;
    }

    static async requestPayout(userId: string, amount: number) {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new Error('User not found');
        }

        if (user.availableBalance < amount) {
            throw new Error('Insufficient balance');
        }

        if (amount < 10) {
            throw new Error('Minimum payout amount is $10');
        }

        // Create payout record
        const payout = await prisma.sellerPayout.create({
            data: {
                sellerId: userId,
                amount,
                status: 'PENDING'
            }
        });

        // Deduct from available balance
        await prisma.user.update({
            where: { id: userId },
            data: {
                availableBalance: {
                    decrement: amount
                }
            }
        });

        return payout;
    }

    static async getPayoutHistory(userId: string) {
        const payouts = await prisma.sellerPayout.findMany({
            where: {
                sellerId: userId
            },
            orderBy: { createdAt: 'desc' }
        });

        return payouts;
    }
}
