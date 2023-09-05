const { createDriver } = require('./common/createDriver');
const {logIn} = require('./log');
const {getTeam} = require('./processStatus/getTeam');
const {calendar} = require('./processStatus/calendar');
const {getMarket} = require('./processStatus/getMarket');
const {notifyInjury} = require('./notifications/injury');
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
    const matchdays = await calendar(driver);
    console.log(matchdays);
    globalStatus.mainLineup = team.lineup;
    globalStatus.matchdays = matchdays;
    globalStatus.substituteLineup = team.substitutes;
    notifyInjury(globalStatus.mainLineup);
    /*
    await getMarket(driver);
    const strategy = new Standard(globalStatus, driver);
    await strategy.generateActions();
    await strategy.executeActions();
     */
    await driver.quit();
}

module.exports = { createBrowserAndExecute };
