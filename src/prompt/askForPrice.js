const inquirer = require('inquirer');

function validatePrice(value) {
    const num = Number(value);

    if (Number.isNaN(num) || num === 0) {
        return 'Enter a number';
    }

    return true;
}

/**
 * @desc Asks user for price alert
 */
module.exports = async function askForPrice() {
    const questions = [
        {
            name: 'price',
            message: 'Enter your price:',
            validate: validatePrice,
        },
    ];

    const answers = await inquirer.prompt(questions);

    return answers.price;
};
