const { By, until } = require('selenium-webdriver');
const {trimName} = require("../common/trimFunctions");

let lineup = [];
let substitutes = [];

async function getTeam(driver) {
    try {
        await driver.get('https://mister.mundodeportivo.com/team');
        await driver.wait(until.elementLocated(By.className('player-list list-team')), 5000);
        const playerHTMLCollection = await driver.findElement(By.className('player-list list-team'));
        const playerList = await playerHTMLCollection.findElements(By.tagName('li'));
        for (let i = 0; i < playerList.length; i++) {
            let player = playerList[i];
            let name = await player.findElement(By.className('name')).getAttribute('innerHTML');
            name = trimName(name);
            let points = await player.findElement(By.className('points')).getAttribute('innerHTML');
            let avg = await player.findElement(By.className('avg')).getAttribute('innerHTML');
            let position = await player.findElement(By.tagName('i')).getAttribute('class');
            position = position === 'pos-1'? 'Goalkeeper' : (position === 'pos-2'? 'Defender' : (position === 'pos-3'? 'Midfield' : (position === 'pos-4'? 'Striker' : null)));
            let playerClass = await player.getAttribute('class');
            let isInLineup = playerClass.includes('in-lineup');
            let price = await player.findElement(By.className('underName')).getAttribute('innerHTML');
            price = price.split('>');
            price = price[2] ? price[2].trim() : price[0];
            price = Number(price.split('.').join(""));
            let upwards = await player.findElements(By.className('value-arrow green'));
            let upwardsValue = upwards.length > 0
            const textUpward = upwardsValue ? 'up' : 'down';
            let injured = await player.findElements(By.className('status'));
            injured = injured.length > 0;
            const injuredText = injured ? 'injured' : 'not injured';
            const processedPlayer = {name, points, avg, position, injured, upwards: upwardsValue, price}
            if(isInLineup){
                lineup.push(processedPlayer);
            }else {
                substitutes.push(processedPlayer)
            }

            console.log(`Found ${name} with ${points} points, ${avg} avg points. pos ${position}, ${injuredText}, and price ${price} going ${textUpward}`);
        }
        return {lineup, substitutes};
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = { getTeam };
