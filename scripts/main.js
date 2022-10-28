const { By, until } = require('selenium-webdriver');
const { createDriver } = require('./common/createDriver');
const {logIn} = require('./log');
const {getTeam} = require('./processStatus/getTeam');

let globalStatus = {
    daysUntilNextRound: 0,
    currentRound: 0,
    money: 0,
    mainLineup: [],
    substituteLineup: [],
    teamValue: 0,
    marketPlayers: [],
    offers: [],
}

async function createBrowserAndExecute () {
    const driver = await createDriver();
    logIn(driver);
    getTeam(driver);
}

module.exports = { createBrowserAndExecute };
