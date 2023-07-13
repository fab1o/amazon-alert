const { console } = require('@fab1o/node-utility');

const frequencyOptions = require('../prompt/frequencyOptions.js');

const priceFormat = require('./priceFormat.js');

/**
 * @desc Console information
 */
module.exports = function print(url, frequency, priceAlert) {
    const freq = Object.entries(frequencyOptions).find(
        ([_, value]) => value === frequency
    )[0];

    console.info('Product Url:', url);
    console.info('Frequency:', freq);
    console.info('Price drop alert:', priceFormat(priceAlert));
};
