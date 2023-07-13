/**
 * @desc Formats a value to currency
 * @param {Number} value
 * @returns {String}
 */
module.exports = function priceFormat(value) {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
};
