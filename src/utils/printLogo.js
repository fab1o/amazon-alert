const { console } = require('@fab1o/node-utility');

/**
 * @desc Console logo
 */
module.exports = function printLogo() {
    console.line.green(67);
    console.log.green(`  __   _  _   __   ____  __   __ _     __   __    ____  ____  ____           `);
    console.log.green(` / _\\ ( \\/ ) / _\\ (__  )/  \\ (  ( \\   / _\\ (  )  (  __)(  _ \\(_  _)   `);
    console.log.green(`/    \\/ \\/ \\/    \\ / _/(  O )/    /  /    \\/ (_/\\ ) _)  )   /  )(      `);
    console.log.green(`\\_/\\_/\\_)(_/\\_/\\_/(____)\\__/ \\_)__)  \\_/\\_/\\____/(____)(__\\_) (__)`);
    console.line.green(67);
};