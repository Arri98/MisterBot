const { createDriver } = require('./common/createDriver');
const {logIn} = require('./log');
const {getTeam} = require('./processStatus/getTeam');
const {getMarket} = require('./processStatus/getMarket');
const {Standard} = require('./strategies/Standard');

let globalStatus = {
    daysUntilNextRound: 0,
    currentRound: 0,
    money: 0,
    mainLineup: [],
    substituteLineup: [],
    teamValue: 0,
    marketPlayers: [],
    offers: [],
};

async function createBrowserAndExecute () {
    const driver = await createDriver();
    await logIn(driver);
    const team = await getTeam(driver);
    globalStatus.mainLineup = team.lineup;
    globalStatus.substituteLineup = team.substitutes;
    await getMarket(driver);
    const strategy = new Standard(globalStatus, driver);
    await strategy.generateActions();
    await strategy.executeActions();
    await driver.quit();
}

module.exports = { createBrowserAndExecute };
