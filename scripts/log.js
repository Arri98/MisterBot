const { By, until } = require('selenium-webdriver');

async function logIn(driver) {
    try {
        await driver.get('https://mister.mundodeportivo.com/new-onboarding/email-signin');
        await driver.wait(until.elementLocated(By.id('didomi-notice-agree-button')), 5000);
        let loginButton = await driver.findElement(By.id('didomi-notice-agree-button'));
        loginButton.click();
        await driver.wait(until.elementLocated(By.id('email')), 5000);
        let email = await driver.findElement(By.id('email'));
        email.sendKeys('');
        let continueButton = await driver.findElement(By.className('btn btn-dark'));
        continueButton.click();
        await driver.wait(until.elementLocated(By.xpath("//input[@type='password']")), 5000);
        let password = await driver.findElement(By.xpath("//input[@type='password']"));
        password.sendKeys('');
        let continueButton2 = await driver.findElement(By.className('btn btn-dark'));
        continueButton2.click();
        await new Promise((r) => setTimeout(r, 1000));
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = { logIn };
