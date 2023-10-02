const { By, until } = require('selenium-webdriver');
const {trimName} = require("../common/trimFunctions");
class Player{
    constructor(name, rerrolButton) {
        this.name = name;
        this.rerrollButton = rerrolButton;
        this.offerList = [];
    }
    rerroll(){
        this.rerrollButton.click();
    }
}

class Offer{
    constructor(amount, person, acceptButton, rejectButton) {
        this.amount = amount;
        this.person = person;
        this.acceptButton = acceptButton;
        this.rejectButton = rejectButton;
    }
   async accept(){
       await this.acceptButton.click();
    };
    async reject(){
        await this.rejectButton.click();
    };
}

async function processOffers(driver) {
    try {
        const offers = [];
        await driver.get('https://mister.mundodeportivo.com/market#market/offers-received');
        await driver.wait(until.elementLocated(By.className('wrapper player-list')), 5000);
        const playerHTMLCollection = await driver.findElement(By.className('wrapper player-list'));
        const playerList = await playerHTMLCollection.findElements(By.xpath("*"));
        for (let i = 0; i < playerList.length; i++) {
            const player = playerList[i];
            let name = await player.findElement(By.className('name')).getAttribute('innerHTML');
            name = trimName(name);
            const rerrollButton = await player.findElement(By.className('btn-resale'));
            const playerObject = new Player(name, rerrollButton);
            const offersHTMLCollection = await driver.findElement(By.className('player-offers'));
            const offerList = await offersHTMLCollection.findElements(By.tagName('li'));
            for (let j = 0; j < offerList.length; j++) {
                const offer = offerList[i];
                const person = await offer.findElement(By.tagName('strong')).getAttribute('innerHTML');
                const amount = await offer.findElement(By.className('amount')).getAttribute('innerHTML');
                const acceptButton = await offer.findElement(By.className('btn-decline'));
                const rejectButton = await offer.findElement(By.className('btn-accept'));
                playerObject.offerList.push(new Offer(amount, person, acceptButton, rejectButton));
            }

            offers.push(playerObject);
        }
        return offers;
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
}




module.exports = { processOffers };
