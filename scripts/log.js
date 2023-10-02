const { By, until } = require('selenium-webdriver');

let config = require('../config/config');

async function logIn(driver) {
    try {
        await driver.get('https://mister.mundodeportivo.com/new-onboarding/auth');
        await driver.wait(until.elementLocated(By.id('didomi-notice-agree-button')), 5000);
        let loginButton = await driver.findElement(By.id('didomi-notice-agree-button'));
        loginButton.click();

        await driver.wait(until.elementLocated(By.className('btn btn--capsule btn--plain')), 5000);
        let emailButton = await driver.findElement(By.className('btn btn--capsule btn--plain'));
        emailButton.click();

        await driver.wait(until.elementLocated(By.id('email')), 5000);
        let email = await driver.findElement(By.id('email'));
        email.sendKeys(config.email);

        await driver.wait(until.elementLocated(By.xpath("//input[@type='password']")), 5000);
        let password = await driver.findElement(By.xpath("//input[@type='password']"));
        password.sendKeys(config.password);

        let continueButton = await driver.findElement(By.className('btn btn--capsule btn--primary'));
        continueButton.click();

        await new Promise((r) => setTimeout(r, 1000));
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = { logIn };
