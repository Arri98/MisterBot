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
            let price = await player.getAttribute('data-price');
            let upwards = await player.findElements(By.className('value-arrow green'));
            let upwardsValue = upwards.length > 0
            const textUpward = upwardsValue ? 'up' : 'down';
            let injured = !(await player.findElements(By.className('status')));
            const injuredText = injured ? 'injured' : 'not injured';
            console.log(`Market found ${name.trim()} with ${points} points, ${avg} avg points, ${injuredText} , pos ${position} and price ${price} going ${textUpward}`);
            players.push({name, points, avg, position, owner, injured, upwards: upwardsValue, price})
        }
        return players;
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = { getMarket };
