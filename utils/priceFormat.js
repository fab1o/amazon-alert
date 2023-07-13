/**
 * @desc Formats a value to currency
 * @param {Number} value
 * @returns {String}
 */
export function priceFormat(value) {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}

