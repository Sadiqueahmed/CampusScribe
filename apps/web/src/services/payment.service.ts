import { api } from './api';

export interface PaymentHistoryItem {
    id: string;
    amount: number;
    status: string;
    createdAt: string;
    note: {
        id: string;
        title: string;
    };
}

export const paymentService = {
    // Create checkout session
    createCheckout: async (noteIds: string[]): Promise<{ sessionId: string; url: string }> => {
        const response = await api.post('/checkout', { noteIds });
        return response.data.data;
    },

    // Get payment history
    getPaymentHistory: async (): Promise<PaymentHistoryItem[]> => {
        const response = await api.get('/payments/history');
        return response.data.data;
    },

    // Request seller payout
    requestPayout: async (amount: number, method: 'bank_transfer' | 'paypal', accountDetails: any): Promise<void> => {
        await api.post('/sellers/payout-request', { amount, method, accountDetails });
    },

    // Get seller payout history
    getPayoutHistory: async (): Promise<any[]> => {
        const response = await api.get('/sellers/payouts');
        return response.data.data;
    },

    // Get seller earnings
    getEarnings: async (): Promise<{
        totalEarnings: number;
        availableBalance: number;
        pendingBalance: number;
        totalSales: number;
    }> => {
        const response = await api.get('/sellers/earnings');
        return response.data.data;
    }
};
