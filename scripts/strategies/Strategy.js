const {Action} = require('../actions/Action');

class Strategy {

    constructor(globalStatus){
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
        this.substituteSrikerList = [];
        this.marketStrikerList = [];
        this.temporalMoney = globalStatus.money;
        this.fillLists();
    };

    async executeActions(){
        for (const action of this.actions) {
            console.log('Executing');
           await action.execute();
           console.log('Finished');
        }
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
                this.substituteSrikerList.push(player);
            }
        });
        this.mainLineup.forEach(player => {
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
        });

        this.marketPlayers.forEach(player => {
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
        this.substituteSrikerList.sort(sorter);
        this.marketStrikerList.sort(sorter);
    }


}

module.exports = {Strategy};
