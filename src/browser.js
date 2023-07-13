const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const { executablePath } = require('puppeteer');

puppeteer.use(StealthPlugin());

module.exports = class Browser {
    browser = null;

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

        page.setDefaultNavigationTimeout(10 * 1000);
        page.setDefaultTimeout(10 * 1000);

        return page;
    }

    async dispose() {
        await this.browser.close();
        this.browser = null;
    }
};
