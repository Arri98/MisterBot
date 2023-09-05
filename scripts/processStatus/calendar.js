const { By, until } = require('selenium-webdriver');

let players = [];

async function calendar(driver) {
    try {
        const returned = [];
        let matchdays = await driver.findElement(By.className('nav thin-scrollbar'));
        let matchdaysList = await matchdays.findElements(By.className('gameweek'));
        for (let i = 0; i < matchdaysList.length; i++) {
            let item = matchdaysList[i];
            let name = await item.findElement(By.className('gameweek__name')).getAttribute('innerHTML');
            name = name.trim();
            let status = await item.findElement(By.className('gameweek__status')).getAttribute('innerHTML');
            status = status.trim()
            console.log(`Journey position ${i} number ${name}, status ${status}`);
            returned.push({i, name, status})
        }
        return returned;
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = { calendar };
