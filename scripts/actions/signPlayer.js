const { By, until, Key } = require('selenium-webdriver');
const {trimName} = require("../common/trimFunctions");

async function signPlayer(driver, nameToSign, value) {
    try {
        await driver.get('https://mister.mundodeportivo.com/market');
        await driver.wait(until.elementLocated(By.id('list-on-sale')), 5000);
        let playerHTMLCollection = await driver.findElement(By.id('list-on-sale'));
        let playerList = await playerHTMLCollection.findElements(By.tagName('li'));
        for (let i = 0; i < playerList.length; i++) {
            let player = playerList[i];
            let name = await player.findElement(By.className('name')).getAttribute('innerHTML');
            name = trimName(name);
            if(name === nameToSign){
                console.log('Found');
                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", player);
                await driver.wait(until.elementLocated(By.className('btn btn-popup btn-bid btn-grey')), 5000);
                let signPlayerButton =  await player.findElement(By.className('btn btn-popup btn-bid btn-grey'));
                signPlayerButton.click();
                await driver.wait(until.elementLocated(By.id('input-tel')), 5000);
                let inputPrice =  await driver.findElement(By.id('input-tel'));
                inputPrice.clear();
                value = value.toString()
                inputPrice.clear();

                for (let i = 0; i < value.length; i++){
                    inputPrice.sendKeys(value[i]);
                }

                let moreButton =  await driver.findElement(By.className('btn num-add'));
                moreButton.click();

                await new Promise((r) => setTimeout(r, 1000));
                let sendButton =  await driver.findElement(By.id('btn-send'));
                sendButton.click();
            }
        }
    }catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = {signPlayer}
