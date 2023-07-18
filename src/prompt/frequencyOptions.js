/**
 * @desc Frequency in seconds to check prices
 */
const frequencyOptions = {
    Daily: 24 * 60 * 60,
    Hourly: 60 * 60,
    'Half-Hourly': 30 * 60,
    //'3 Seconds': 3, // for testing only
};

module.exports = frequencyOptions;
