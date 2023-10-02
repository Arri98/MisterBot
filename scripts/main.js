const { createDriver } = require('./common/createDriver');
const {logIn} = require('./log');
const {getTeam} = require('./processStatus/getTeam');
const {calendar} = require('./processStatus/calendar');
const {getMarket} = require('./processStatus/getMarket');
const {notifyInjury} = require('./notifications/injury');
const {getMoney} = require('./processStatus/getMoney');
const {Standard} = require('./strategies/Standard');
const {MinMax} = require("./strategies/MinMax");
const {processOffers} = require("./processStatus/processOffer");

let globalStatus = {
    daysUntilNextRound: 0,
    currentRound: 0,
    money: 0,
    mainLineup: [],
    substituteLineup: [],
    marketPlayers: [],
    offers: [],
    futureBalance: 0,
};

async function createBrowserAndExecute () {
    const driver = await createDriver();
    await logIn(driver);
    globalStatus.money = await getMoney(driver);
    const offers = await processOffers(driver);
    globalStatus.offers = offers;
    const team = await getTeam(driver);
    const matchdays = await calendar(driver);
    globalStatus.mainLineup = team.lineup;
    globalStatus.substituteLineup = team.substitutes;
    globalStatus.matchdays = matchdays;
    notifyInjury(globalStatus.mainLineup);
    const marketResult = await getMarket(driver);
    globalStatus.marketPlayers = marketResult.players;
    globalStatus.futureBalance = marketResult.futureBalance;
    const strategy = new MinMax(globalStatus, driver);
    await strategy.generateActions();
    strategy.actions.forEach(action => action.log());
    //await strategy.executeActions();

    await driver.quit();
}

module.exports = { createBrowserAndExecute };
