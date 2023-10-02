const {processOffer} = require("../processStatus/processOffer");

class Offers{
    constructor(driver) {
        if(typeof Offers.instance === 'object'){
            return Offers.instance;
        }
        this.offerList = processOffer(driver);
        Offers.instance = this;
        return this;
    }
}

async function handleOffer(driver, offer, action) {
    const offers = new Offers(driver);
    const offerList = offers.offerList;
    for (const player of offerList) {
        if(player.name === offer.name){
            for(const eachOffer of player.offerList){
                if(eachOffer.person === 'Mister'){
                    if (action === 'accept'){
                       await eachOffer.accept();
                    } else if (action === 'reject'){
                        await eachOffer.reject();
                    }
                }
            }
        }
    }
}

module.exports = {handleOffer};
