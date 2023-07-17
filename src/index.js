#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { console } = require('@fab1o/node-utility');

const { print, printLogo, printVersionCheck } = require('./utils/index.js');
const {
    askForFrequency,
    askForProduct,
    askForPrice,
    frequencyOptions,
} = require('./prompt/index.js');

const Engine = require('./engine.js');
const Version = require('./version.js');

/**
 * @desc main function
 */
async function main() {
    printLogo();

    const argv = yargs(hideBin(process.argv))
        .option('u', {
            alias: 'url',
            description: 'Product Url',
            type: 'string',
        })
        .option('f', {
            alias: 'frequency',
            description: 'Frequency to check price',
            choices: Object.keys(frequencyOptions),
            type: 'string',
        })
        .option('p', {
            alias: 'price',
            description: 'Price (must be lower than the price found at Amazon)',
            type: 'number',
        })
        .option('m', {
            alias: 'mute',
            description: 'Mute, play no audio alert',
            type: 'boolean',
            default: false,
        })
        .version(Version)
        .strict()
        .parse();

    try {
        printVersionCheck();

        let url;

        if (argv.url) {
            url = argv.url;
        } else {
            url = await askForProduct();
        }

        let frequency;

        if (argv.frequency) {
            frequency = frequencyOptions[argv.frequency];
        } else {
            frequency = await askForFrequency();
        }

        let priceAlert;

        if (argv.price) {
            priceAlert = argv.price;
        } else {
            priceAlert = Number(await askForPrice());
        }

        print(url, frequency, priceAlert);

        const engine = new Engine(argv.mute, priceAlert);

        await engine.init();

        await engine.processProduct(url, frequency, priceAlert);
    } catch (ex) {
        console.error(ex);
    }
}

main();
