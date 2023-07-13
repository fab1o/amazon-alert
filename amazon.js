import { Browser } from './browser.js';
import { Product } from './product.js';

import { wait } from './utils/wait.js';

export class Amazon {
    async getProduct(url) {
        const browser = new Browser();

        const page = await browser.getPage();

        await page.goto(url);

        await page.waitForSelector('span#productTitle');

        await wait(2);

        const product = new Product(url);

        product.title = await this.getTitle(page);
        product.price = await this.getPrice(page);
        product.soldBy = await this.getSoldBy(page);

        await browser.dispose();

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
}
