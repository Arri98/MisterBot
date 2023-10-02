const {Action} = require("../actions/Action");
const {Strategy} = require("./Strategy");

class Mago extends Strategy{
    constructor(globalStatus, driver) {
        super(globalStatus);
        this.numberGoalKeepers = 1;
        this.numberDefenders = 3;
        this.numberMidfield = 4;
        this.numberStricker = 3;
        this.driver = driver;
    }
    chechDaysToNextGame(){
        for(let i = 0; i < this.globalStatus.matchdays.length; i++){
            if(this.globalStatus.matchdays[i] !== -1){
                this.globalStatus.currentRound = this.globalStatus.matchdays[i].journeyNumber;
                switch (this.globalStatus.matchdays[i].status){
                    case 3:
                        this.dayFlag = 'sell';
                        break;
                    case 2:
                        this.dayFlag = 'accept'
                        break;
                    case 1:
                        this.dayFlag = 'magic';
                        break;
                }
                this.dayFlag = this.globalStatus.matchdays[i].status;
            }
        }
    }

}

module.exports = {Mago};
