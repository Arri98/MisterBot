const { By, until } = require('selenium-webdriver');

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
            let points = await player.findElement(By.className('points')).getAttribute('innerHTML');
            let avg = await player.findElement(By.className('avg')).getAttribute('innerHTML');
            let position = await player.findElement(By.tagName('i')).getAttribute('class');
            position = position === 'pos-1'? 'Goalkeeper' : (position === 'pos-2'? 'Defender' : (position === 'pos-3'? 'Midfield' : (position === 'pos-4'? 'Striker' : null)));
            let isInLineup = player.getAttribute('class').contains('in-lineup');
            const processedPlayer = {name: name.trim(), points, avg, position}
            if(isInLineup){
                lineup.push(processedPlayer);
            }else {
                substitutes.push(processedPlayer)
            }

            console.log(`Found ${name} with ${points} points, ${avg} avg points and pos ${position}`);
        }
        return {lineup, substitutes};
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = { getTeam };
