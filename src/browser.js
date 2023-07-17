const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const { executablePath } = require('puppeteer');

puppeteer.use(StealthPlugin());

class Browser {
    constructor() {
        this.browser = null;
    }

    async init() {}

    async getPage() {
        this.browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--window-size=1600,900',
                '--single-process',
            ],
            executablePath: executablePath(),
        });

        const page = await this.browser.newPage();

        await page.setViewport({
            width: 1280,
            height: 720,
        });

        await page.setCacheEnabled(false);

        page.setDefaultNavigationTimeout(10 * 1000);
        page.setDefaultTimeout(10 * 1000);

        return page;
    }

    async close() {
        await this.browser.close();
    }
}

module.exports = Browser;
