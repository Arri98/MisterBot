const {Standard} = require('./strategies/Standard')
const {MinMax} = require("./strategies/MinMax");

let globalStatus = {
    daysUntilNextRound: 0,
    currentRound: 0,
    money: 10000,
    mainLineup: [
        {
            name: 'F. Jörgensen',
            points: '11',
            avg: '2,8',
            position: 'Goalkeeper',
            injured: false,
            upwards: true,
            price: '2.750.000'
        },
        {
            name: 'D. Foulquier',
            points: '10',
            avg: '2,5',
            position: 'Defender',
            injured: false,
            upwards: true,
            price: '1.319.000'
        },
        {
            name: 'J. Koundé',
            points: '29',
            avg: '7,3',
            position: 'Defender',
            injured: false,
            upwards: true,
            price: '13.369.000'
        },
        {
            name: 'S. Savić',
            points: '13',
            avg: '4,3',
            position: 'Defender',
            injured: false,
            upwards: true,
            price: '5.326.000'
        },
        {
            name: 'P. Ciss',
            points: '17',
            avg: '4,3',
            position: 'Midfield',
            injured: false,
            upwards: true,
            price: '1.881.000'
        },
        {
            name: 'R. De Paul',
            points: '17',
            avg: '5,7',
            position: 'Midfield',
            injured: false,
            upwards: true,
            price: '10.302.000'
        },
        {
            name: 'S. Costa',
            points: '21',
            avg: '5,3',
            position: 'Midfield',
            injured: false,
            upwards: true,
            price: '2.641.000'
        },
        {
            name: 'S. Arribas',
            points: '22',
            avg: '5,5',
            position: 'Midfield',
            injured: false,
            upwards: true,
            price: '3.282.000'
        },
        {
            name: 'A. Sørloth',
            points: '21',
            avg: '5,3',
            position: 'Striker',
            injured: false,
            upwards: true,
            price: '11.600.000'
        },
        {
            name: 'Á. Morata',
            points: '25',
            avg: '8,3',
            position: 'Striker',
            injured: false,
            upwards: true,
            price: '10.576.000'
        },
        {
            name: 'R. Lewandowski',
            points: '18',
            avg: '4,5',
            position: 'Striker',
            injured: false,
            upwards: false,
            price: '22.611.000'
        },
    ],
    substituteLineup: [{points: 65, name: 'Jesu' , price: 5000, position: 'Midfield'},{points: 15, name: 'Atk' , price: 5000, position: 'Midfield'},
        {points: 14, name: 'Evan' , price: 5000, position: 'Midfield'},{points: 17, name: 'Nose' , price: 5000, position: 'Goalkeeper'},
        {points: 4, name: 'Tuno' , price: 5000, position: 'Goalkeeper'}, {points: 0, name: 'AnotherOne' , price: 5000, position: 'Midfield'},
        {points: 34, name: 'A' , price: 5000, position: 'Midfield'}],
    marketPlayers: [
        {
            name: 'J. Ledesma',
            points: '23',
            avg: '5,8',
            position: 'Goalkeeper',
            owner: 'Libre',
            injured: false,
            upwards: false,
            price: '9965000'
        },
        {
            name: 'L. Maximiano',
            points: '10',
            avg: '3,3',
            position: 'Goalkeeper',
            owner: 'Arri',
            injured: false,
            upwards: true,
            price: '4891000'
        },
        {
            name: 'J. Doménech',
            points: '0',
            avg: '0,0',
            position: 'Goalkeeper',
            owner: 'Libre',
            injured: false,
            upwards: true,
            price: '212000'
        },
        {
            name: 'M. Valjent',
            points: '17',
            avg: '4,3',
            position: 'Defender',
            owner: 'Libre',
            injured: false,
            upwards: true,
            price: '4229000'
        },
            {
                name: 'L. Felipe',
                points: '12',
                avg: '3,0',
                position: 'Defender',
                owner: 'Libre',
                injured: false,
                upwards: true,
                price: '5181000'
            },
            {
                name: 'A. Vinícius',
                points: '11',
                avg: '2,8',
                position: 'Defender',
                owner: 'Libre',
                injured: false,
                upwards: true,
                price: '1722000'
            },
            {
                name: 'M. Pascual',
                points: '0',
                avg: '0,0',
                position: 'Defender',
                owner: 'Arri',
                injured: false,
                upwards: true,
                price: '191000'
            },
            {
                name: 'M. Bartra',
                points: '0',
                avg: '0,0',
                position: 'Defender',
                owner: 'Libre',
                injured: false,
                upwards: true,
                price: '3100000'
            },
        {
            name: 'T. Kubo',
            points: '42',
            avg: '10,5',
            position: 'Midfield',
            owner: 'Sergio Cabrera Risquez',
            injured: false,
            upwards: true,
            price: '15766000'
        },
            {
                name: 'M. Vesga',
                points: '23',
                avg: '5,8',
                position: 'Midfield',
                owner: 'Libre',
                injured: false,
                upwards: true,
                price: '6090000'
            },
            {
                name: 'I. Baba',
                points: '16',
                avg: '4,0',
                position: 'Midfield',
                owner: 'Marcelo Sánchez',
                injured: false,
                upwards: true,
                price: '4028000'
            },
            {
                name: 'C. Aleñá',
                points: '11',
                avg: '2,8',
                position: 'Midfield',
                owner: 'Javi Donaire',
                injured: false,
                upwards: true,
                price: '3230000'
            },
            {
                name: 'Pejiño',
                points: '7',
                avg: '2,3',
                position: 'Midfield',
                owner: 'Libre',
                injured: false,
                upwards: false,
                price: '1234000'
            },
            {
                name: 'A. Mahmoud',
                points: '0',
                avg: '0,0',
                position: 'Midfield',
                owner: 'Libre',
                injured: false,
                upwards: false,
                price: '160000'
            },
        {
            name: 'I. Williams',
            points: '22',
            avg: '5,5',
            position: 'Striker',
            owner: 'Libre',
            injured: false,
            upwards: true,
            price: '10820000'
        },
            {
                name: 'J. Bamba',
                points: '17',
                avg: '4,3',
                position: 'Striker',
                owner: 'Javi Donaire',
                injured: false,
                upwards: false,
                price: '9355000'
            },
            {
                name: 'Sandro',
                points: '14',
                avg: '4,7',
                position: 'Striker',
                owner: 'Sergio Cabrera Risquez',
                injured: false,
                upwards: true,
                price: '5444000'
            },
            {
                name: 'R. Martí',
                points: '13',
                avg: '3,3',
                position: 'Striker',
                owner: 'Sergio Cabrera Risquez',
                injured: false,
                upwards: true,
                price: '3414000'
            },
            {
                name: 'R. Yaremchuk',
                points: '0',
                avg: '0,0',
                position: 'Striker',
                owner: 'Sergio Cabrera Risquez',
                injured: false,
                upwards: true,
                price: '1075000'
            },
            {
                name: 'C. Herrera',
                points: '0',
                avg: '0,0',
                position: 'Striker',
                owner: 'Libre',
                injured: false,
                upwards: false,
                price: '160000'
            }
        ],
    offers: [{name: 'Miguel'}, {name:'Tuno'}, {name:'AnotherOne'}],
};


let standard = new Standard(globalStatus);
let sergina = new MinMax(globalStatus);

standard.generateActions();
standard.logActions();

sergina.generateActions();
sergina.logActions();
