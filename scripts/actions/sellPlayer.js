const { By, until } = require('selenium-webdriver');


async function sellPlayer(driver, playerToSell) {
    try{
        await driver.get('https://mister.mundodeportivo.com/team');
        await driver.wait(until.elementLocated(By.className('player-list list-team')), 5000);
        let playerHTMLCollection = await driver.findElement(By.className('player-list list-team'));
        let playerList = await playerHTMLCollection.findElements(By.tagName('li'));
        for (let i = 0; i < playerList.length; i++) {
            const player = playerList[i];
            let name = await player.findElement(By.className('name')).getAttribute('innerHTML');
            name = name.replace(/(\r\n|\n|\r)/gm, "").trim().split('svg>');
            name = name[1] ? name[1].trim() : name[0];
            if(name === playerToSell){
                console.log(player);
                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", player);
                await driver.wait(until.elementLocated(By.className('btn-sale')), 5000);
                let button = await player.findElement(By.className('btn-sale'));
                console.log(button);
                console.log('Click Button');
                button.click();
                await driver.wait(until.elementLocated(By.id('btn-send')), 5000);
                let popupButton = await driver.findElement(By.id('btn-send'));
                console.log(popupButton);
                console.log('Click popup');
                popupButton.click();
                await new Promise((r) => setTimeout(r, 2000));
            }
        }
    } catch (e) {
        console.log(e);
        await driver.quit()
    }

}

module.exports = {sellPlayer};
