import { console } from '@fab1o/node-utility';

import { frequencyOptions } from '../prompt/all.js';

import { priceFormat } from './priceFormat.js';


/**
 * @desc Console logo
 */
export function printCongrats() {
    console.log.green(`     ______                             __       __ `);
    console.log.green(`    / ____/___  ____  ____ __________ _/ /______/ /`);
    console.log.green(`   / /   / __ \\/ __ \\/ __ \`/ ___/ __ \`/ __/ ___/ / `);
    console.log.green(`  / /___/ /_/ / / / / /_/ / /  / /_/ / /_(__  )_/  `);
    console.log.green(`  \\____/\\____/_/ /_/\\__, /_/   \\__,_/\\__/____(_)   `);
    console.log.green(`                   /____/                          `);
}                 

/**
 * @desc Console logo
 */
export function printLogo() {
    console.line.green(67);
    console.log.green(`  __   _  _   __   ____  __   __ _     __   __    ____  ____  ____           `);
    console.log.green(` / _\\ ( \\/ ) / _\\ (__  )/  \\ (  ( \\   / _\\ (  )  (  __)(  _ \\(_  _)   `);
    console.log.green(`/    \\/ \\/ \\/    \\ / _/(  O )/    /  /    \\/ (_/\\ ) _)  )   /  )(      `);
    console.log.green(`\\_/\\_/\\_)(_/\\_/\\_/(____)\\__/ \\_)__)  \\_/\\_/\\____/(____)(__\\_) (__)`);
    console.line.green(67);
}


/**
 * @desc Console information
 */
export function print(url, frequency, priceAlert) {
    const freq = Object.entries(frequencyOptions).find(
        ([_, value]) => value === frequency
    )[0];

    console.info('Product Url:', url);
    console.info('Frequency:', freq);
    console.info('Price drop alert:', priceFormat(priceAlert));
}
