/**
 * Safely formats a number into a localized string.
 * Supports fallback to "Free" for prices or "0" for other metrics.
 */
export function formatNumber(value, fallback = "0") {
    if (value === null || value === undefined || isNaN(value)) {
        return fallback;
    }
    return Number(value).toLocaleString();
}

/**
 * Specifically formats a price, returning "Free" for 0 or missing values.
 */
export function formatPrice(value) {
    if (value === null || value === undefined || isNaN(value) || Number(value) === 0) {
        return "Free";
    }
    return `₹${Number(value).toLocaleString()}`;
}
