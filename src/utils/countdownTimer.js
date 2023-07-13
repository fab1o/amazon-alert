/**
 * @desc Counts down the time on console
 * @param {Number} duration - Milliconds
 */
module.exports = function countdownTimer(duration) {
    let timer = (duration - 1) / 1000;

    const daily = duration === 24 * 60 * 60 * 1000;
    const hourly = duration === 60 * 60 * 1000;
    const halfHourly = duration === 30 * 60 * 1000;

    const countdown = setInterval(() => {
        const hours = daily ? Math.floor(timer / 60 / 60) : 0;
        const minutes = daily
            ? Math.floor((timer % 3600) / 60)
            : Math.floor(timer / 60);
        const seconds = Math.floor(timer % 60);

        process.stdout.write(
            `-Scheduled to check again in ${hours}:${minutes}:${
                seconds < 10 ? '0' : ''
            }${seconds}\r`
        );

        if (--timer < 0) {
            process.stdout.write('\r\x1b[K');
            clearInterval(countdown);
        }
    }, 1000);
};
