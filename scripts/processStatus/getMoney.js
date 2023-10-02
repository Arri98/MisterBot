const { By, until } = require('selenium-webdriver');


async function getMoney(driver) {
    try {
        await driver.wait(until.elementLocated(By.className('btn btn-sw btn-balance btn-header-top')), 5000);
        await driver.findElement(By.className('balance-status-current')).click();
        await driver.wait(until.elementLocated(By.className('balance-header')), 5000);
        const header = await driver.findElement(By.className('balance-header'));
        let money = await header.findElement(By.className('amount')).getAttribute('innerHTML');
        await driver.findElement(By.className('btn btn-round go-back')).click();
        money = money.replace(/\./g,'');
        return Number(money);
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = { getMoney };
