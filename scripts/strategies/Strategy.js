class Strategy {

    constructor(globalStatus, mainLineup, substituteLineup, marketPlayers){
        this.mainLineup = mainLineup;
        this.substitueLineup = substituteLineup;
        this.marketPlayers = marketPlayers;
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
        this.fillLists()
    };

    executeActions(){
        this.actions.forEach(action => {
            action.execute();
        })
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


}





module.exports = {Strategy};
