const { console } = require('@fab1o/node-utility');

/**
 * @desc Console logo
 */
module.exports = function printCongrats() {
    console.log.green(`     ______                             __       __ `);
    console.log.green(`    / ____/___  ____  ____ __________ _/ /______/ /`);
    console.log.green(`   / /   / __ \\/ __ \\/ __ \`/ ___/ __ \`/ __/ ___/ / `);
    console.log.green(`  / /___/ /_/ / / / / /_/ / /  / /_/ / /_(__  )_/  `);
    console.log.green(`  \\____/\\____/_/ /_/\\__, /_/   \\__,_/\\__/____(_)   `);
    console.log.green(`                   /____/                          `);
};   