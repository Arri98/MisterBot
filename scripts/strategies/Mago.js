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

}

module.exports = {Mago};
