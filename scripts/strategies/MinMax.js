const {Action} = require("../actions/Action");
const {Strategy} = require('./Strategy');

class MinMax extends Strategy{
    constructor(globalStatus, driver) {
        super(globalStatus,driver);
        this.numberGoalKeepers = 1;
        this.numberDefenders = 3;
        this.numberMidfield = 4;
        this.numberStricker = 3;
        this.driver = driver;
    }

    signAllUpwardsPlayers(){
        if( this.globalStatus.marketPlayers.length > 0){
            this.globalStatus.marketPlayers.forEach( (player, index) => {
                if(player.upwards && player.owner === 'Libre'){
                    let action = Action('sign', {driver: this.driver, name: player.name, price: Math.floor((Number(player.price) + Math.random()*10000)).toString()});
                    this.actions.push(action);
                }
            })

        }
    }

    sellAllDownwardsPlayers(){
        if( this.globalStatus.mainLineup.length > 0){
            this.globalStatus.mainLineup.forEach((player,index) => {
                if(!player.upwards){
                    let action = Action('sell', {driver: this.driver, name: player.name});
                    this.actions.push(action);
                    this.globalStatus.mainLineup.splice(index,1);
                }
            })

        }

        if(this.globalStatus.substituteLineup.length > 0){
            this.globalStatus.substituteLineup.forEach((player,index) => {
                if(!player.upwards){
                    let action = Action('sell', {driver: this.driver, name: player.name});
                    this.actions.push(action);
                    this.globalStatus.substituteLineup.splice(index,1);
                }
            })

        }
    }


    interchangeSubAndMain(listMain, listSub){
        if(listSub.length === 0){
            return;
        }
        let j = 0;
        for(let i = listMain.length-1; i >= 0; i--) {
            if(Number(listMain[i].price) < Number(listSub[j].price)){
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




    generateActions(){
        this.globalStatus.temporalMoney = this.globalStatus.money;
        this.signAllUpwardsPlayers();
        this.sellAllDownwardsPlayers();
        this.sortAllListBy(this.sorters.byPrice);
        this.fillAll();
        this.sortAllListBy(this.sorters.byPrice);
        console.log(this.defenderList);
        console.log(this.substituteDefenderList);
        this.interchangeSubAndMain(this.goalkeeperList, this.substituteGoalkeeperList);
        this.interchangeSubAndMain(this.defenderList, this.substituteDefenderList);
        this.interchangeSubAndMain(this.midFieldList, this.substituteMidFieldList);
        this.interchangeSubAndMain(this.midFieldList, this.substituteSrikerList);
        let lineup = this.goalkeeperList.concat(this.defenderList.concat(this.midFieldList.concat(this.strikerList)))
        this.actions.push(Action('setLineup', {driver: this.driver, lineup: lineup}));
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

module.exports = {MinMax};
