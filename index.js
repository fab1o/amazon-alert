#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { console } from '@fab1o/node-utility';

import { Engine } from './engine.js';
import { print, printLogo } from './utils/print.js';
import { askForPrice } from './prompt/askForPrice.js';
import {
    askForFrequency,
    askForProduct,
    frequencyOptions,
} from './prompt/all.js';

const VERSION = '0.0.8';

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
        .version(VERSION)
        .strict()
        .parse();

    try {
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

        const engine = new Engine(argv.mute);

        engine.priceAlert = priceAlert;

        await engine.processProduct(url, frequency, priceAlert);
    } catch (ex) {
        console.error(ex);
    }
}

main();
