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
        console.log('switching', this.dayFlag);
      switch (this.dayFlag){
          case 'normal':
              this.defaultStrategy();
              break;
          case 'sell':
              this.sellDayStrategy();
              break;
          case 'accept':
              this.previousDayStrategy();
              break;
      }
    }

    processOffers(){

    }

    defaultStrategy(){
        this.signAllUpwardsPlayers();
        this.sellAllDownwardsPlayers();
        this.sortAllListBy(this.sorters.byPrice);
        this.fillAll();
        this.sortAllListBy(this.sorters.byPrice);
        this.interchangeSubAndMain(this.goalkeeperList, this.substituteGoalkeeperList);
        this.interchangeSubAndMain(this.defenderList, this.substituteDefenderList);
        this.interchangeSubAndMain(this.midFieldList, this.substituteMidFieldList);
        this.interchangeSubAndMain(this.midFieldList, this.substituteStrikerList);
        let lineup = this.goalkeeperList.concat(this.defenderList.concat(this.midFieldList.concat(this.strikerList)));
        this.actions.push(Action('setLineup', {driver: this.driver, lineup: lineup}));
        this.processOffers();
    }

    findMinExchange(listMain, listSub){
        if(listMain.length === 0 || listSub.length === 0){
            return [-1, {main:0, sub: 0}]
        }
        let value = -1;
        let index;


        //Miramos desde donde comparmos
        let lookingSince = -1;
        console.log(listMain, listSub);
        for(let i = (listMain.length -1); i >= 0; i--){
            console.log(listMain[i], listSub[0]);
            if((listMain[i].price - listSub[0].price) > 0){
                lookingSince = i;
                break;
            }
        }

        if(lookingSince === -1){
            return [-1, {main:0, sub: 0}]
        }

        //Longitud minima
        let length = listMain.length <= listSub.length ? listMain.length : listSub.length;

        //Restas
        const differences = [];
        for(let i = 0; (i < length && (i + lookingSince) < listMain.length); i++){
            const mainPlayer = listMain[lookingSince+i];
            const subPlayer = listSub[i];
            differences.push(mainPlayer.price - subPlayer.price);
        }


        //Buscar minimo
        let min = Number.MAX_VALUE;
        let increment = 0;
        differences.forEach((diff, ind) => {
            if(diff < min){
                min = diff;
                value = diff;
                index = ind;
            }
        })
        index = {main: lookingSince+increment, sub: increment}
        return [value, index];
    }

    sellUntilPositive() {
        console.log(this.globalStatus.money);
        let money = this.globalStatus.money;
        let subs = this.substituteGoalkeeperList.concat(this.substituteDefenderList.concat(this.substituteMidFieldList.concat(this.substituteStrikerList)))
        subs.sort(this.sorters.byPrice);

        let subsValue = 0;
        for(let i = 0; i < subs.length; i++){
            subsValue += subs[i].price * 0.95;
        }
        if((subsValue + money) >= 0){
            console.log('we can sell subs to be positive');
            let accumulatedSell = 0;
            for(let i = subs.length - 1; i >= 0 ; i--){
                this.actions.push(Action('sell', {driver: this.driver, name: subs[i].name}));
                accumulatedSell += subs[i].price * 0.95;
                if( (accumulatedSell+money) > 0){
                    break;
                }
            }
        } else{
            console.log('calculating next most expensive team');
            while((subsValue + money) < 0){
                //Buscamos cual es el cambio que menos valor pierde para el equipo para cada lista
                const values = [];
                const exchanges = [];
                console.log('finding exchanges');
                 [values[0], exchanges[0]] = this.findMinExchange(this.goalkeeperList, this.substituteGoalkeeperList);
                 [values[1], exchanges[1]] = this.findMinExchange(this.defenderList, this.substituteDefenderList);
                 [values[2], exchanges[2]] = this.findMinExchange(this.midFieldList, this.substituteMidFieldList);
                 [values[3], exchanges[3]] = this.findMinExchange(this.strikerList, this.substituteStrikerList);
                console.log('finding min');

                 //Miramos de cada lista cual es el menor
                 let minIndex = 0;
                 let minValue = values[0] >= 0 ? values[0] : Number.MAX_VALUE;
                 for(let i = 1;  i<values.length; i++){
                     if(values[i] < minValue && values[i] > 0){
                         minValue = values[i];
                         minIndex = i
                     }
                 }

                 if(minValue ===  Number.MAX_VALUE){
                     console.log('No posible');
                     break;
                 }

                 //Realizamos el cambio
                let temp;
                switch (minIndex){
                    case 0:
                        temp = this.goalkeeperList[exchanges[0].main];
                        this.goalkeeperList[exchanges[0].main] = this.substituteGoalkeeperList[exchanges[0].sub];
                        this.substituteGoalkeeperList[exchanges[0].sub] = temp;
                        break;
                    case 1:
                        temp = this.defenderList[exchanges[1].main];
                        this.defenderList[exchanges[1].main] = this.substituteDefenderList[exchanges[1].sub];
                        this.substituteDefenderList[exchanges[1].sub] = temp;
                        break;
                    case 2:
                        temp = this.midFieldList[exchanges[2].main];
                        this.midFieldList[exchanges[2].main] = this.substituteMidFieldList[exchanges[2].sub];
                        this.substituteMidFieldList[exchanges[0].sub] = temp;
                        break;
                    case 3:
                        temp = this.strikerList[exchanges[3].main];
                        this.strikerList[exchanges[3].main] = this.substituteStrikerList[exchanges[3].sub];
                        this.substituteStrikerList[exchanges[3].sub] = temp;
                        break;
                }

                //Reordenamos
                this.sortAllListBy(this.sorters.byPrice);
                let subs = this.substituteGoalkeeperList.concat(this.substituteDefenderList.concat(this.substituteMidFieldList.concat(this.substituteStrikerList)))

                //Recalcularmos sub value
                subsValue = 0;
                for(let i = 0; i < subs.length; i++){
                    subsValue += subs[i].price * 0.95;
                }

                console.log( this.goalkeeperList.concat(this.defenderList.concat(this.midFieldList.concat(this.strikerList))));
                console.log(subsValue);
            }
            let subs = this.substituteGoalkeeperList.concat(this.substituteDefenderList.concat(this.substituteMidFieldList.concat(this.substituteStrikerList)))
            let accumulatedSell = 0;
            for(let i = subs.length - 1; i >= 0 ; i--){
                this.actions.push(Action('sell', {driver: this.driver, name: subs[i].name}));
                accumulatedSell += subs[i].price * 0.95;
                if( (accumulatedSell+money) > 0){
                    break;
                }
            }
        }


    }

    sellDayStrategy(){
        console.log('sellDay');
        this.sortAllListBy(this.sorters.byPrice);
        this.fillAll();
        this.sortAllListBy(this.sorters.byPrice);
        this.interchangeSubAndMain(this.goalkeeperList, this.substituteGoalkeeperList);
        this.interchangeSubAndMain(this.defenderList, this.substituteDefenderList);
        this.interchangeSubAndMain(this.midFieldList, this.substituteMidFieldList);
        this.interchangeSubAndMain(this.strikerList, this.substituteStrikerList);
        this.sortAllListBy(this.sorters.byPrice);
        if(this.globalStatus.money < 0){
            console.log('no money')
            this.sellUntilPositive();
        }
        let lineup = this.goalkeeperList.concat(this.defenderList.concat(this.midFieldList.concat(this.strikerList)));
        this.actions.push(Action('setLineup', {driver: this.driver, lineup: lineup}));

    }

    previousDayStrategy(){}

}

module.exports = {MinMax};
