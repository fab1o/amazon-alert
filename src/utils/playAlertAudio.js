const { console, shell } = require('@fab1o/node-utility');

module.exports = function playAlertAudio() {
    try {
        const path = shell.execSync(
            'npm ls -g --depth 0 @fab1o/amazon-alert | head -n 1'
        );

        shell.execSync(
            `afplay ${path}/node_modules/@fab1o/amazon-alert/asset/alert.mp3`
        );
    } catch (ex) {
        try {
            shell.execSync('afplay asset/alert.mp3');
        } catch (ex) {
            console.error(ex);
        }
    }
};
