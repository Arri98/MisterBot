const { By, until } = require('selenium-webdriver');

let players = [];

async function calendar(driver) {
    try {
        const returned = [];
        let matchdays = await driver.findElement(By.className('nav thin-scrollbar'));
        let matchdaysList = await matchdays.findElements(By.className('gameweek'));
        for (let i = 0; i < matchdaysList.length; i++) {
            let item = matchdaysList[i];
            let journeyNumber = await item.findElement(By.className('gameweek__name')).getAttribute('innerHTML');
            journeyNumber = journeyNumber.trim().substring(1);
            let status = await item.findElement(By.className('gameweek__status')).getAttribute('innerHTML');
            status = status.replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, '');
            console.log(`Journey position ${i} number ${journeyNumber}, status ${status}`);
            if(status === 'Enjuego'){
                status = -1;
            } else {
                status = Number(status[9]);
            }
            returned.push({i, journeyNumber, status})
        }
        return returned;
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = { calendar };
