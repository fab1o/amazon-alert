const inquirer = require('inquirer');

/**
 * @desc Asks user to select = require(a list of product options
 */
module.exports = async function askForProduct() {
    const promptOptions = {
        'Wilson AVP ARX': 'https://www.amazon.com/dp/B09KS66VN7',
        'Wilson AVP OPTX': 'https://www.amazon.com/dp/B0812JPZFT',
    };

    const EXIT_OPTION = 'quit (exit)';

    const productNames = Object.keys(promptOptions);

    const questions = [
        {
            name: 'product',
            message: 'Select a product:',
            type: 'list',
            choices: productNames,
        },
    ];

    productNames.push(EXIT_OPTION);

    const answers = await inquirer.prompt(questions);
    const answer = answers.product;

    if (answer === EXIT_OPTION) {
        process.exit(1);
    }

    return promptOptions[answer];
};
