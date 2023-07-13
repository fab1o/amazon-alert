const inquirer = require('inquirer');

const frequencyOptions = require('./frequencyOptions.js');

/**
 * @desc Asks user to select a frequency in which we check price
 */
module.exports = async function askForFrequency() {
    const questions = [
        {
            name: 'frequency',
            message: 'How often to check for price drop:',
            type: 'list',
            choices: Object.keys(frequencyOptions),
        },
    ];

    const answers = await inquirer.prompt(questions);
    const answer = answers.frequency;

    return frequencyOptions[answer];
}
