const path = require('path');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const {
    PUPPETEER_REVISIONS,
} = require('puppeteer-core/lib/cjs/puppeteer/revisions.js');

puppeteer.use(StealthPlugin());

module.exports = class Browser {
    constructor() {
        this.browser = null;
    }

    async init() {
        const installedBrowser = await this.download();

        this.executablePath = installedBrowser.executablePath;
    }

    async download() {
        const cacheDir = path.join(path.resolve(__dirname, '../'), '.cache');

        const browserFetcher = puppeteer.createBrowserFetcher({
            path: cacheDir,
        });

        return await browserFetcher.download(
            PUPPETEER_REVISIONS.chromium
        );
    }

    async getPage() {
        this.browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--window-size=1600,900',
                '--single-process',
            ],
            executablePath: this.executablePath,
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

    async close() {
        await this.browser.close();
    }
};
