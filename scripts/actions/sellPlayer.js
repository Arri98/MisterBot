const { By, until } = require('selenium-webdriver');


async function sellPlayer(driver, playerToSell) {
    try{
        await driver.get('https://mister.mundodeportivo.com/team');
        await driver.wait(until.elementLocated(By.className('player-list list-team')), 5000);
        let playerHTMLCollection = await driver.findElement(By.className('player-list list-team'));
        let playerList = await playerHTMLCollection.findElements(By.tagName('li'));
        for (let i = 0; i < playerList.length; i++) {
            const player = playerList[i];
            const noTrimName = await player.findElement(By.className('name')).getAttribute('innerHTML');
            const name = noTrimName.trim();
            if(name === playerToSell){
                let button = await player.findElement(By.className('btn-sale'));
                console.log('Click Button');
                button.click();
                await driver.wait(until.elementLocated(By.id('btn-send')), 5000);
                let popupButton = await driver.findElement(By.id('btn-send'));
                console.log('Click popup');
                popupButton.click();
            }
        }
    } catch (e) {
        console.log(e);
        await driver.quit()
    }

}

module.exports = {sellPlayer};
