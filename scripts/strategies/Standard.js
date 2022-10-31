const {Action} = require("../actions/Action");
const {Strategy} = require('./Strategy');

/* Jugamos 3-4-3 y tenemos un reserva de cada
   Si tenemos un reserva con mas puntos que un titular, entra -> done
   Si mas de un reserva se vende el peor -> done
   Si hay alguien en el mercado con mas puntos que el reserva, se ficha si hay dinero, solo uno -> done
   Se aceptan las ofertas si hay oferta para todos los suplentes que no sean el primero.
 */

class Standard extends Strategy{
    constructor(globalStatus, driver) {
        super(globalStatus);
        this.numberGoalKeepers = 1;
        this.numberDefenders = 3;
        this.numberMidfield = 4;
        this.numberStricker = 3;
        this.driver = driver;
    }
    sellSubstitutes(list) {
        if(list.length > 1){
            for(let i = 1; i<list.length; i++){
                let action = Action('sell',{name: list[i].name, driver: this.driver});
                this.actions.push(action);
            }
        }
    }

    interchangeSubAndMain(listMain, listSub){
        if(listSub.length === 0){
            return;
        }
        let j = 0;
        for(let i = listMain.length-1; i >= 0; i--) {
            if(listMain[i].points < listSub[j].points){
                let temp = listMain[i];
                listMain[i] = listSub[j];
                listSub[j] = temp;
                if((listSub.length-1) > j){
                    j++;
                }else{
                    return;
                }
            }
        }
    }

    signPlayers(listSub, listMarket) {
        if(listMarket.length > 0){
           if(listSub.length > 0){
               if(listSub[0].points < listMarket[0].points && (listMarket[0].price * 1.3) < this.temporalMoney){
                   this.temporalMoney -=  1.2*listMarket[0].price;
                   let action = Action('sign', {driver: this.driver, name: listMarket[0].name, price: 1.2*listMarket[0].price});
                   this.actions.push(action);
                   return;
               }
           }
            else {
                if((listMarket[0].price * 1.3) < this.temporalMoney) {
                   this.temporalMoney -=  1.2*listMarket[0].price;
                   let action = Action('sign', {driver: this.driver, name: listMarket[0].name, price: 1.2*listMarket[0].price});
                   this.actions.push(action);
                   return;
               }
           }
        }
    }

    fillTeam(listSub, listMain, numberOfPlayers) {
        let playersToPush = [];
        let positionsToSplice = 0;
        if(listMain.length < numberOfPlayers && listSub.length > 0){
            for(let i = 0; i < (numberOfPlayers - listMain.length); i++){
                playersToPush.push(listSub[i]);
                positionsToSplice++;
            }
        }
        playersToPush.forEach(player => {
            listMain.push(player);
        });
        for(let i = 0; i<positionsToSplice; i++){
            listSub.splice(0,1);
        }
    }

    processOffers() {
        this.globalStatus.offers.forEach(offer => {
            if(this.substituteGoalkeeperList.length > 1){
                for(let i = 1; i < this.substituteGoalkeeperList.length; i++){
                    if(offer.name === this.substituteGoalkeeperList[i].name){
                        this.actions.push(Action('acceptOffer', {...offer, driver: this.driver}))
                        return;
                    }
                }
            }
            if(this.substituteDefenderList.length > 1){
                for(let i = 1; i < this.substituteDefenderList.length; i++){
                    if(offer.name === this.substituteDefenderList[i].name){
                        this.actions.push(Action('acceptOffer', {...offer, driver: this.driver}))
                        return;
                    }
                }
            }
            if(this.substituteMidFieldList.length > 1){
                for(let i = 1; i < this.substituteMidFieldList.length; i++){
                    if(offer.name === this.substituteMidFieldList[i].name){
                        this.actions.push(Action('acceptOffer', {...offer, driver: this.driver}))
                        return;
                    }
                }
            }
            if(this.substituteSrikerList.length > 1){
                for(let i = 1; i < this.substituteSrikerList.length; i++){
                    if(offer.name === this.substituteSrikerList[i].name){
                        this.actions.push(Action('acceptOffer', {...offer,driver: this.driver }))
                        return;
                    }
                }
            }
            this.actions.push(Action('rejectOffer', {...offer, driver: this.driver }))
        })
    }

    generateActions(){
        this.globalStatus.temporalMoney = this.globalStatus.money;
        this.sortAllListBy(this.sorters.byPoints);
        this.fillTeam(this.substituteGoalkeeperList, this.goalkeeperList, this.numberGoalKeepers);
        this.fillTeam(this.substituteDefenderList, this.defenderList, this.numberDefenders);
        this.fillTeam(this.substituteMidFieldList, this.midFieldList, this.numberMidfield);
        this.fillTeam(this.substituteSrikerList, this.strikerList, this.numberStricker);
        this.sortAllListBy(this.sorters.byPoints);
        this.interchangeSubAndMain(this.goalkeeperList, this.substituteGoalkeeperList);
        this.interchangeSubAndMain(this.defenderList, this.substituteDefenderList);
        this.interchangeSubAndMain(this.midFieldList, this.substituteMidFieldList);
        this.interchangeSubAndMain(this.strikerList, this.substituteSrikerList);
        this.actions.push(Action('setLineup', {lineup: this.globalStatus.mainLineup}));
        this.sellSubstitutes(this.substituteGoalkeeperList);
        this.sellSubstitutes(this.substituteDefenderList);
        this.sellSubstitutes(this.substituteMidFieldList);
        this.sellSubstitutes(this.substituteSrikerList);
        this.signPlayers(this.substituteSrikerList,this.marketStrikerList);
        this.signPlayers(this.substituteMidFieldList,this.marketMidFieldList);
        this.signPlayers(this.substituteDefenderList,this.marketDefenderList);
        this.signPlayers(this.substituteGoalkeeperList,this.marketGoalkeeperList);
        this.processOffers();
        console.log("Substitutes");
        console.log(this.substituteGoalkeeperList);
        console.log(this.substituteDefenderList);
        console.log(this.substituteMidFieldList);
        console.log(this.substituteSrikerList);
        console.log("Main");
        console.log(this.goalkeeperList);
        console.log(this.defenderList);
        console.log(this.midFieldList);
        console.log(this.strikerList);
        console.log("Market");
        console.log(this.marketGoalkeeperList);
        console.log(this.marketDefenderList);
        console.log(this.marketMidFieldList);
        console.log(this.marketStrikerList);
        console.log("Offers");
        console.log(this.globalStatus.offers);

    }


}

module.exports = {Standard};
