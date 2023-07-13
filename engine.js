import { console, shell } from '@fab1o/node-utility';

import { Amazon } from './amazon.js';
import {
    priceFormat,
    countdownTimer,
    wait,
    printCongrats,
} from './utils/index.js';
import { askForPrice } from './prompt/askForPrice.js';

export class Engine {
    constructor(isMuted) {
        this.currentPrice = 0;
        this.priceAlert = 0;

        this.tries = 0; // in case of error
        this.maxTries = 3;

        this.isMuted = isMuted;
    }

    /**
     * @desc Asks user for price alert.
     * @returns {Boolean} - Whether or not changed price alert.
     */
    async askForPriceAlert() {
        if (
            !this.priceAlert ||
            this.priceAlert > this.currentPrice ||
            this.priceAlert <= 2
        ) {
            this.priceAlert = Number(await askForPrice());

            if (this.priceAlert <= 2) {
                console.warn('Your price is too low!');
                this.priceAlert = 0;
                await this.askForPriceAlert();
            } else if (this.priceAlert > this.currentPrice) {
                console.warn(
                    'Your price must be lower than the current price!'
                );
                this.priceAlert = 0;
                await this.askForPriceAlert();
            }

            return true;
        }

        return false;
    }

    hasPriceChanged(product) {
        return this.currentPrice && this.currentPrice != product.priceValue;
    }

    hasPriceMatched(product) {
        return product.priceValue && product.priceValue <= this.priceAlert;
    }

    /**
     * @desc Process a product url.
     * @param {String} url - Product url.
     * @param {Number} frequency - User's frequency in milliseconds.
     */
    async processProduct(url, frequency) {
        const amazon = new Amazon();

        console.line();
        console.log('Checking Amazon...');
        console.log('Please wait... press ⌘+. to abort or ⌘+w to close');

        try {
            const product = await amazon.getProduct(url);

            console.line.green();
            console.log.green(product.title);

            if (product.isSoldOut) {
                console.log.red('Sold out at the moment');
            } else {
                console.log.cyan('Currently sold by', product.soldBy);
                console.log.cyan('Current price at $', product.priceValue);

                if (this.hasPriceChanged(product)) {
                    console.log.red('Price has changed!');
                } else if (this.currentPrice) {
                    console.log.cyan('Price has not changed');
                }

                this.currentPrice = product.priceValue;
            }

            if (await this.askForPriceAlert()) {
                console.line();
                console.log.yellow(
                    'Price drop set to',
                    priceFormat(this.priceAlert)
                );
            }

            if (this.hasPriceMatched(product)) {
                // price has matched
                printCongrats();

                console.log.green(
                    'Congrats! Your price has been reached. Go buy it now!'
                );
                console.line.green(60);

                shell.execSync(`open -a "Google Chrome" ${url}`);

                if (!this.isMuted) {
                    try {
                        const path = shell.execSync(
                            'npm ls -g --depth 0 @fab1o/amazon-alert | head -n 1'
                        );

                        shell.execSync(
                            `afplay ${path}/node_modules/@fab1o/amazon-alert/alert.mp3`
                        );
                    } catch (ex) {
                        console.error(ex);
                    }
                }
            } else {
                await wait(1);
                countdownTimer(frequency);

                setTimeout(async () => {
                    await wait(1);
                    await this.processProduct(url, frequency);
                }, frequency);
            }
            //end of process
        } catch (ex) {
            console.line.red();
            console.error(`Could not retrieve product.\n${ex.message}`);

            if (this.tries < this.maxTries) {
                console.error('Trying again...');
                this.tries++;
                await wait(this.tries);
                await this.processProduct(url, frequency);
            } else {
                console.error(
                    'Number of attempts maxed out. You are out of luck :('
                );
            }
        }
    }
}
