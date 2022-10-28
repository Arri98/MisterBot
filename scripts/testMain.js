const {Standard} = require('./strategies/Standard')

let globalStatus = {
    daysUntilNextRound: 0,
    currentRound: 0,
    money: 10000,
    mainLineup: [
        {points: 17, name: 'Miguel' , price: 5000, position: 'Midfield'},
        {points: 32, name: 'Luis' , price: 5000, position: 'Striker'}, {points: 43, name: 'Alguien' , price: 5000, position: 'Striker'},
        {points: 4, name: 'Pepito' , price: 5000, position: 'Striker'}, {points: 54, name: 'Defenso' , price: 5000, position: 'Defender'},
        {points: 46, name: 'Juan' , price: 5000, position: 'Defender'}, {points: 45, name: 'Kakul' , price: 5000, position: 'Defender'},
    ],
    substituteLineup: [{points: 65, name: 'Jesu' , price: 5000, position: 'Midfield'},{points: 15, name: 'Atk' , price: 5000, position: 'Midfield'},
        {points: 14, name: 'Evan' , price: 5000, position: 'Midfield'},{points: 17, name: 'Nose' , price: 5000, position: 'Goalkeeper'},
        {points: 4, name: 'Tuno' , price: 5000, position: 'Goalkeeper'}, {points: 0, name: 'AnotherOne' , price: 5000, position: 'Midfield'},
        {points: 34, name: 'A' , price: 5000, position: 'Midfield'}],
    teamValue: 0,
    marketPlayers: [ {points: 2, name: 'Pepito' , price: 5000, position: 'Striker'}, {points: 2, name: 'Defenso' , price: 5000, position: 'Defender'}],
    offers: [{name: 'Miguel'}, {name:'Tuno'}, {name:'AnotherOne'}],
};


let standard = new Standard(globalStatus);

standard.generateActions();
standard.executeActions();
