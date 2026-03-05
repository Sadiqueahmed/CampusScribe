// src/utils/currency.ts

/**
 * Converts a value to a number for arithmetic operations.
 * @param value The value to convert.
 * @returns The number value, or 0 if conversion fails.
 */
export const toNumber = (value: number | string | undefined): number => {
    if (value === undefined || value === null) return 0;
    if (typeof value === 'number') return value;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
};

/**
 * Formats a number or string as an INR currency string.
 * @param amount The number or string to format.
 * @returns A string formatted as ₹X,XXX.XX
 */
export const formatINR = (amount: number | string | undefined): string => {
    const numAmount = toNumber(amount);
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(numAmount);
};

/**
 * Adds two price values together.
 * @param a First price value.
 * @param b Second price value.
 * @returns The sum of the two prices.
 */
export const addPrices = (a: number | string | undefined, b: number | string | undefined): number => {
    return toNumber(a) + toNumber(b);
};

/**
 * Multiplies a price by a quantity.
 * @param price The price value.
 * @param quantity The multiplier.
 * @returns The product.
 */
export const multiplyPrice = (price: number | string | undefined, quantity: number): number => {
    return toNumber(price) * quantity;
};
