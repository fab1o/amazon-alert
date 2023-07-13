/**
 * @desc Frequency in seconds to check prices
 */
const frequencyOptions = {
    Daily: 24 * 60 * 60,
    Hourly: 60 * 60,
    'Half-Hourly': 30 * 60,
    //'Every-Minute': 60, // for testing
};

module.exports = frequencyOptions;
