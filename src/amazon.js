const Browser = require('./browser.js');
const Product = require('./product.js');

const wait = require('./utils/wait.js');

class Amazon {
    constructor() {
        this.browser = new Browser();
    }

    async init() {
        await this.browser.init();
    }

    async getProduct(url) {
        const page = await this.browser.getPage();

        await page.goto(url);

        await page.waitForSelector('span#productTitle');

        await wait(2);

        const product = new Product(url);

        product.title = await this.getTitle(page);
        product.price = await this.getPrice(page);
        product.soldBy = await this.getSoldBy(page);

        await this.browser.close();

        return product;
    }

    async getTitle(page) {
        return await page.evaluate(() =>
            document.querySelector('span#productTitle')?.textContent.trim()
        );
    }

    async getPrice(page) {
        return await page.evaluate(() =>
            document
                .querySelector('.a-section .a-price .a-offscreen')
                ?.textContent.trim()
        );
    }

    async getSoldBy(page) {
        return await page.evaluate(() =>
            document
                .querySelector(
                    '#tabular-buybox .tabular-buybox-container .tabular-buybox-text[tabular-attribute-name="Sold by"]'
                )
                ?.textContent.trim()
        );
    }
};

module.exports = Amazon;