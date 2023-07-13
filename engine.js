import { console, shell } from '@fab1o/node-utility';

import { Amazon } from './amazon.js';
import { priceFormat, countdownTimer, wait } from './utils/index.js';
import { askForPrice } from './prompt/askForPrice.js';

export class Engine {
    currentPrice = 0;
    priceAlert = 0;

    tries = 0; // in case of error
    maxTries = 3;

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
                if (this.hasPriceChanged(product)) {
                    console.log.red('Price change!');
                }
                console.log.cyan('Sold by', product.soldBy);
                console.log.cyan('Price $', product.priceValue);

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
                // price math
                console.log.green(
                    'Congrats! Your price has been reached. Go buy it now!'
                );

                shell.execSync(`open -a "Google Chrome" ${url}`);
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
