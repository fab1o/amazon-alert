const open = require('open');
const { console } = require('@fab1o/node-utility');

const {
    priceFormat,
    wait,
    printCongrats,
    playAlertAudio,
} = require('./utils/index.js');

const { askForPrice, frequencyOptions } = require('./prompt/index.js');

const Amazon = require('./amazon.js');

class Engine {
    /**
     *
     * @param {object} options
     * @param {String} options.url - Product url.
     * @param {Boolean} options.isMuted - Whether or not to play audio.
     * @param {Number} options.frequency - User's frequency option.
     * @param {Number} options.priceAlert - Price to be alerted.
     */
    constructor(options) {
        const { url, frequency, isMuted, priceAlert } = options;

        this.amazon = new Amazon();
        this.url = url;
        this.frequency = frequency;

        this.tries = 0; // in case of error
        this.maxTries = 3;

        this.currentPrice = 0;
        this.priceAlert = priceAlert;
        this.isMuted = isMuted;
    }

    async init() {
        this.amazon.init();
    }

    /**
     * @desc Asks user for price alert.
     * @returns {Boolean} - Whether or not changed price alert.
     */
    async askForPriceAlert() {
        if (!this.priceAlert || this.priceAlert <= 2) {
            this.priceAlert = Number(await askForPrice());

            if (this.priceAlert <= 2) {
                console.warn('Your price is too low!');
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

    async processProduct() {
        console.line();
        console.log('Checking Amazon...');
        console.log('Please wait... press ⌘+. to abort or ⌘+w to close');

        try {
            const product = await this.amazon.getProduct(this.url);

            console.line.green();
            console.log.green(product.title);

            if (product.isSoldOut) {
                console.log.red('SOLD OUT');
            } else {
                console.log.cyan('Currently sold by', product.soldBy);
                console.log.cyan('Current price at $', product.priceValue);

                if (this.hasPriceChanged(product)) {
                    console.log.red('Price has changed!');
                } else if (this.currentPrice) {
                    console.log.cyan('Price has not changed');
                }

                this.currentPrice = product.priceValue;

                if (await this.askForPriceAlert()) {
                    console.line();
                    console.log.yellow(
                        'Price drop set to',
                        priceFormat(this.priceAlert)
                    );
                }

                if (this.hasPriceMatched(product)) {
                    this.openProduct(this.url);
                    return;
                }
            }

            await wait(1);
            await this.countdownTimer();
            await wait(1);
            await this.processProduct();

            //end of process
        } catch (ex) {
            console.line.red();
            console.error(`Could not retrieve product.\n${ex.message}`);
            await this.retry();
        } finally {
            await this.amazon.closeBrowser();
        }
    }

    async retry() {
        if (this.tries < this.maxTries) {
            console.error('Trying again...');
            this.tries++;
            await wait(this.tries + 10);
            await this.processProduct();
        } else {
            console.error(
                'Number of attempts maxed out. You are out of luck :('
            );
        }
    }

    /**
     * @desc Opens browser and plays audio when price has reached
     */
    openProduct() {
        printCongrats();

        console.log.green(
            'Congrats! Your price has been reached. Go buy it now!'
        );
        console.line.green(60);
        this.url +=
            this.url.indexOf('?') === -1 ? '?tag=fab1o-20' : '&tag=fab1o-20';
        
        open(this.url);

        if (!this.isMuted) {
            playAlertAudio();
        }
    }

    /**
     * @desc Counts down the time on console
     * @returns {Promise}
     */
    async countdownTimer() {
        return new Promise((resolve) => {
            let timer = this.frequency - 1;

            const countdown = setInterval(() => {
                const hours =
                    timer >= frequencyOptions.Hourly - 1
                        ? Math.floor(timer / 60 / 60)
                        : 0;

                const minutes =
                    timer >= frequencyOptions.Hourly - 1
                        ? Math.floor((timer % 3600) / 60)
                        : Math.floor(timer / 60);

                const seconds = Math.floor(timer % 60);

                process.stdout.write(
                    `-Scheduled to check again in ${
                        hours < 10 ? '0' : ''
                    }${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
                        seconds < 10 ? '0' : ''
                    }${seconds}\r`
                );

                --timer;

                if (timer < 0) {
                    process.stdout.write('\r\x1b[K');
                    clearInterval(countdown);
                    resolve();
                }
            }, 1000);
        });
    }
}

module.exports = Engine;
