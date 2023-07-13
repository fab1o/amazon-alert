import inquirer from 'inquirer';

export const frequencyOptions = {
    Daily: 24 * 60 * 60 * 1000,
    Hourly: 60 * 60 * 1000,
    'Half-Hourly': 30 * 60 * 1000,
    // 'Every 3 seconds': 3 * 1000, // for testing
};

/**
 * @desc Asks user to select a frequency in which we check price
 */
export async function askForFrequency() {
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
