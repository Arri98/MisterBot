const { By, until } = require('selenium-webdriver');

let players = [];

async function getTeam(driver) {
    try {
        await driver.get('https://mister.mundodeportivo.com/team');
        await driver.wait(until.elementLocated(By.className('player-list list-team')), 5000);
        let playerHTMLCollection = await driver.findElement(By.className('player-list list-team'));
        let playerList = playerHTMLCollection[0].getElementsByTagName("li");
        for (let i = 0; i < playerList.length; i++) {
            let player = playerList[i];
            console.log(player);
        }
        await new Promise((r) => setTimeout(r, 1000));
        await driver.quit();
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = { getTeam };
