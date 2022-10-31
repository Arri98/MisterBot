const { By, until } = require('selenium-webdriver');


async function sellPlayer(driver, playerToSell) {
    await driver.get('https://mister.mundodeportivo.com/team');
    await driver.wait(until.elementLocated(By.className('player-list list-team')), 5000);
    let playerHTMLCollection = await driver.findElement(By.className('player-list list-team'));
    let playerList = await playerHTMLCollection.findElements(By.tagName('li'));
    for (let i = 0; i < playerList.length; i++) {
        const name = await player.findElement(By.className('name')).getAttribute('innerHTML').trim();
        if(name === playerToSell){
            let button = await player.findElement(By.className('btn-sale'));
            button.click();
            await driver.wait(until.elementLocated(By.id('popup')), 5000);
            let popupButton = await driver.findElement(By.className('btn-sale'));
            popupButton.click();
        }
    }
}

module.export = {sellPlayer};
