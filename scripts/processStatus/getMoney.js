const { By, until } = require('selenium-webdriver');


async function getMoney(driver) {
    try {
        await driver.wait(until.elementLocated(By.className('balance-status-current')), 5000);
        let money = await driver.findElement(By.className('balance-status-current')).getAttribute('innerHTML');
        money = money.split('M')[0];
        return money;
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = { getMoney };
