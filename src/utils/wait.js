/**
 * @desc Wait for a given amount of seconds.
 * @param {Number} seconds
 * @returns {Promise}
 */
module.exports = async function wait(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
