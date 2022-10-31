const { By, until } = require('selenium-webdriver');

let players = [];

async function getMarket(driver) {
    try {
        await driver.get('https://mister.mundodeportivo.com/market');
        await driver.wait(until.elementLocated(By.id('list-on-sale')), 5000);
        let playerHTMLCollection = await driver.findElement(By.id('list-on-sale'));
        let playerList = await playerHTMLCollection.findElements(By.tagName('li'));
        for (let i = 0; i < playerList.length; i++) {
            let player = playerList[i];
            let name = await player.findElement(By.className('name')).getAttribute('innerHTML');
            let points = await player.findElement(By.className('points')).getAttribute('innerHTML');
            let avg = await player.findElement(By.className('avg')).getAttribute('innerHTML');
            let position = await player.findElement(By.tagName('i')).getAttribute('class');
            let owner = await player.findElement(By.className('date')).getAttribute('innerHTML');
            owner = owner.substring(5);
            position = position === 'pos-1'? 'Goalkeeper' : (position === 'pos-2'? 'Defender' : (position === 'pos-3'? 'Midfield' : (position === 'pos-4'? 'Goalkeeper' : null)))
            console.log(`Market found ${name.trim()} with ${points} points, ${avg} avg points and pos ${position}`);
            players.push({name, points, avg, position, owner})
        }
        return players;
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = { getMarket };
