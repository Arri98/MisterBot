const { By, until } = require('selenium-webdriver');
const {trimName} = require("../common/trimFunctions");

let players = [];
let futureBalance;

async function getMarket(driver) {
    try {
        await driver.get('https://mister.mundodeportivo.com/market');
        await driver.wait(until.elementLocated(By.id('list-on-sale')), 5000);
        let playerHTMLCollection = await driver.findElement(By.id('list-on-sale'));
        let playerList = await playerHTMLCollection.findElements(By.tagName('li'));
        for (let i = 0; i < playerList.length; i++) {
            let player = playerList[i];

            let name = await player.findElement(By.className('name')).getAttribute('innerHTML');
            name = trimName(name)

            let points = await player.findElement(By.className('points')).getAttribute('innerHTML');
            points = points.replace(/(\r\n|\n|\r)/gm, "").trim();

            let avg = await player.findElement(By.className('avg')).getAttribute('innerHTML');

            let position = await player.findElement(By.tagName('i')).getAttribute('class');
            position = position === 'pos-1'? 'Goalkeeper' : (position === 'pos-2'? 'Defender' : (position === 'pos-3'? 'Midfield' : (position === 'pos-4'? 'Striker' : null)))

            let owner = await player.findElement(By.className('date')).getAttribute('innerHTML');
            owner = owner.replace(/(\r\n|\n|\r)/gm, "").trim().split(',')[0];

            let price = await player.getAttribute('data-price');
            let upwards = await player.findElements(By.className('value-arrow green'));

            let upwardsValue = upwards.length > 0
            const textUpward = upwardsValue ? 'up' : 'down';

            let injured = await player.findElements(By.className('status'));

            injured = (injured.length > 0);

            const injuredText = injured ? 'injured' : 'not injured';
            console.log(`Market found ${name.trim()} with ${points} points, ${avg} avg points, ${injuredText} , pos ${position} and price ${price} going ${textUpward}`);
            players.push({name, points, avg, position, owner, injured, upwards: upwardsValue, price});

            await driver.wait(until.elementLocated(By.className('balance-real-future')), 5000);
            futureBalance = (await driver.findElement(By.className('balance-real-future')).getAttribute('innerHTML')).trim();

        }
        return {players, futureBalance};
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = { getMarket };
