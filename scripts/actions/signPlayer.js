const { By, until } = require('selenium-webdriver');

async function signPlayer(driver, nameToSign, value) {
    try {
        await driver.get('https://mister.mundodeportivo.com/market');
        await driver.get('https://mister.mundodeportivo.com/market');
        await driver.wait(until.elementLocated(By.id('list-on-sale')), 5000);
        let playerHTMLCollection = await driver.findElement(By.id('list-on-sale'));
        let playerList = await playerHTMLCollection.findElements(By.tagName('li'));
        for (let i = 0; i < playerList.length; i++) {
            let player = playerList[i];
            let name = await player.findElement(By.className('name')).getAttribute('innerHTML');
            if(name === nameToSign){
                let signPlayerButton =  await player.findElement(By.className('btn btn-popup btn-bid btn-grey'));
                signPlayerButton.click();
                await driver.wait(until.elementLocated(By.id('input-tel')), 5000);
                let inputPrice =  await player.findElement(By.id('input-tel'));
                inputPrice.clear();
                inputPrice.sendKeys(value);
                let sendButton =  await player.findElement(By.id('btn-send'));
                sendButton.click();
            }
        }
    }catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = {signPlayer}
