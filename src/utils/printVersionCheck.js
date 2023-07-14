const { console, shell } = require('@fab1o/node-utility');
const Version = require('../version.js');

/**
 * @desc Get latest version
 */
module.exports = function printVersionCheck() {
    const latestVersion = shell.execSync(
        'npm view @fab1o/amazon-alert version'
    );

    if (Version != latestVersion) {
        console.line.red(70);
        console.log.red('Your copy of amazon-alert is outdated.');
        console.log.red(
            'Please run "sudo npm i --global @fab1o/amazon-alert" to update.'
        );
        console.line.red(70);
    }
};
