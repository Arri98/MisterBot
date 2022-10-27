player = {points: 2, name: 'a' , price: 5000, position: 'Middle'}
/* Parametros
    PointsPerPrice = Puntos partido de precio
    deltaAveragePrice = Difference between players price and average price
    deltaAveragePPP =  Difference between players average PPP and average PPP
    pointContribution = Pe
 */


let players = [];
let maximunPoints = 0;
let maximunPrice = 0;
let averagePrice = 0;
let averagePointsPerPrice = 0;

let totalPrice = 0;
let totalPoints = 0;
let playerSize = players.length;


players.forEach(player => {
    totalPoints += player.points;
    totalPrice += player.price;
    player.pointPerPrice = (player.points)/(player.price);
    averagePointsPerPrice +=  player.pointPerPrice;
    maximunPrice = (player.price > maximunPrice) ? player.price : maximunPrice;
    maximunPoints = (player.points > maximunPoints) ? player.points : maximunPoints;
})

averagePrice = totalPrice/playerSize;
averagePointsPerPrice = averagePointsPerPrice / playerSize;

players.forEach(player => {
    player.pointPerPrice = (player.points)/(player.price);
    player.deltaAveragePrice = player.price - averagePrice;
    player.deltaAveragePPP = player.pointPerPrice - averagePointsPerPrice;
})
