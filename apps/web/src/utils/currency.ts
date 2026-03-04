// src/utils/currency.ts

/**
 * Formats a number as an INR currency string.
 * @param amount The number to format.
 * @returns A string formatted as ₹X,XXX.XX
 */
export const formatINR = (amount: number): string => {
    if (typeof amount !== 'number') {
        return "₹0.00";
    }
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
};
