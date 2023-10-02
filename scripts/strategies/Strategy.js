const {Action} = require('../actions/Action');

class Strategy {

    constructor(globalStatus,driver){
        this.mainLineup = globalStatus.mainLineup;
        this.substitueLineup = globalStatus.substituteLineup;
        this.marketPlayers = globalStatus.marketPlayers;
        this.globalStatus = globalStatus;
        this.actions = [];
        this.goalkeeperList = [];
        this.substituteGoalkeeperList = [];
        this.marketGoalkeeperList = [];
        this.defenderList = [];
        this.substituteDefenderList= [];
        this.marketDefenderList = [];
        this.midFieldList = [];
        this.substituteMidFieldList = [];
        this.marketMidFieldList = [];
        this.strikerList = [];
        this.substituteStrikerList = [];
        this.marketStrikerList = [];
        this.temporalMoney = globalStatus.money;
        this.driver = driver;
        this.dayFlag = 0;
        this.fillLists();
        this.chechDaysToNextGame();
    };

    async executeActions(){
        for (const action of this.actions) {
            console.log(Action);
            console.log('Executing');
           await action.execute();
           console.log('Finished');
        }
    }

   logActions(){
       console.log('Logging');
        for (const action of this.actions) {
            action.log();
        }
       console.log('Finished');
    }

    fillLists() {
        this.substitueLineup.forEach(player => {
            if(player.position === 'Goalkeeper'){
                this.substituteGoalkeeperList.push(player);
            }
            else if(player.position === 'Defender'){
                this.substituteDefenderList.push(player);
            }
            else if(player.position === 'Midfield'){
                this.substituteMidFieldList.push(player);
            }
            else if(player.position === 'Striker'){
                this.substituteStrikerList.push(player);
            }
        });
        this.mainLineup.forEach(player => {
           if(!player.injured){
                if(player.position === 'Goalkeeper'){
                    this.goalkeeperList.push(player);
                }
                else if(player.position === 'Defender'){
                    this.defenderList.push(player);
                }
                else if(player.position === 'Midfield'){
                    this.midFieldList.push(player);
                }
                else if(player.position === 'Striker'){
                    this.strikerList.push(player);
                }
           } else{
                let action = Action('sell', {name: player.name, driver: this.driver })
                this.actions.push(action);
          }
        });

        this.marketPlayers.forEach(player => {
            if(!player.injured){
                if(player.position === 'Goalkeeper'){
                    this.marketGoalkeeperList.push(player);
                }
                else if(player.position === 'Defender'){
                    this.marketDefenderList.push(player);
                }
                else if(player.position === 'Midfield'){
                    this.marketMidFieldList.push(player);
                }
                else if(player.position === 'Striker'){
                    this.marketStrikerList.push(player);
                }
            }

        });
    }
   sorters = {
        byPrice: (a, b) => {
            return (b.price - a.price)
        },
       byPoints : (a, b) => {
            return (b.points - a.points)
       }
    };

    sortAllListBy(sorter){
        this.goalkeeperList.sort(sorter);
        this.substituteGoalkeeperList.sort(sorter);
        this.marketGoalkeeperList.sort(sorter);
        this.defenderList.sort(sorter);
        this.substituteDefenderList.sort(sorter);
        this.marketDefenderList.sort(sorter);
        this.midFieldList.sort(sorter);
        this.substituteMidFieldList.sort(sorter);
        this.marketMidFieldList.sort(sorter);
        this.strikerList.sort(sorter);
        this.substituteStrikerList.sort(sorter);
        this.marketStrikerList.sort(sorter);
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

    fillAll(){
        this.fillTeam(this.substituteGoalkeeperList, this.goalkeeperList, this.numberGoalKeepers);
        this.fillTeam(this.substituteDefenderList, this.defenderList, this.numberDefenders);
        this.fillTeam(this.substituteMidFieldList, this.midFieldList, this.numberMidfield);
        this.fillTeam(this.substituteStrikerList, this.strikerList, this.numberStricker);
    }

    chechDaysToNextGame(){
        for(let i = 0; i < this.globalStatus.matchdays.length; i++){
            if(this.globalStatus.matchdays[i] !== -1){
                this.globalStatus.currentRound = this.globalStatus.matchdays[i].journeyNumber;
                switch (this.globalStatus.matchdays[i].status){
                    case 2:
                        this.dayFlag = 'sell';
                        break;
                    case 1:
                        this.dayFlag = 'accept'
                        break;
                    default:
                        this.dayFlag = 'normal';
                        break;
                }
                this.globalStatus.daysUntilNextRound = this.globalStatus.matchdays[i].status
            }
        }
    }





}

module.exports = {Strategy};
