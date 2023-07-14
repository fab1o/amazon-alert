const { wait } = require('./utils/wait.js');

module.exports = class AmazonExtra {
    async movePageUp(page) {
        await page.keyboard.press('End');

        await wait(1);

        for (let i = 0; i < 7; i++) {
            await page.keyboard.press('PageUp');
            await wait(1);
        }
    }

    async getDelivery(page) {
        return await page.evaluate(() =>
            document.querySelector('')?.textContent.trim()
        );
    }

    async getBuyingOptions(page) {
        //buying options
        const buyingOptionsButton =
            (await page.$('#olpLinkWidget_feature_div .a-touch-link')) ||
            (await page.$('#buybox-see-all-buying-choices .a-button-text'));

        if (buyingOptionsButton) {
            await buyingOptionsButton.click();

            await page.waitForSelector('#aod-offer-list');

            await wait(1);

            return await page.evaluate(() =>
                Array.from(
                    document.querySelectorAll('#aod-offer-list > div')
                ).map((el) => {
                    const element = el.querySelector(
                        '#mir-layout-DELIVERY_BLOCK > div:first-child > span'
                    );

                    let priceText;

                    if (element) {
                        priceText = '';
                        for (let child of element.childNodes) {
                            if (child.nodeType === Node.TEXT_NODE) {
                                priceText += child.textContent.trim();
                            }
                        }
                    }

                    return {
                        condition: el
                            .querySelector('#aod-offer-heading h5')
                            ?.textContent.trim()
                            .replace(/\s{2}|\\n/gm, ''),
                        price: el
                            .querySelector('.a-price .a-offscreen')
                            ?.textContent.trim(),
                        delivery: el.querySelector(
                            '#mir-layout-DELIVERY_BLOCK > div:first-child > span.a-color-error'
                        )
                            ? el
                                  .querySelector(
                                      '#mir-layout-DELIVERY_BLOCK > div:first-child > span.a-color-error'
                                  )
                                  .textContent.trim()
                            : {
                                  date: el
                                      .querySelector(
                                          '#mir-layout-DELIVERY_BLOCK > div:first-child > span > span'
                                      )
                                      ?.textContent.trim(),
                                  price: priceText,
                              },
                        shipsFrom: el
                            .querySelector(
                                '#aod-offer-shipsFrom .aod-ships-from-country'
                            )
                            ?.textContent.trim(),
                        soldBy: {
                            seller: el
                                .querySelector('#aod-offer-soldBy a')
                                ?.textContent.trim(),
                            sellerLink: `https://www.amazon.com${el
                                .querySelector('#aod-offer-soldBy a')
                                ?.getAttribute('href')}`,
                            sellerRating: el
                                .querySelector('#aod-offer-seller-rating')
                                ?.textContent.trim(),
                        },
                    };
                })
            );
        }
    }
};
