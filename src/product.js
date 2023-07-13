/**
 * @desc Product
 */
module.exports = class Product {
    constructor(url) {
        this.url = url;
    }

    /**
     * @desc Sets the price value and price text
     * @param {String} priceText
     */
    set price(priceText) {
        this.priceText = priceText;
        this.priceValue = priceText
            ? parseFloat(priceText.substring(1, priceText.length))
            : 0;
    }

    get price() {
        return this.priceValue;
    }

    get isSoldOut() {
        return !this.priceValue;
    }
};
