const fs = require('fs');

function notifyInjury (players){
    let found = false;
    players.forEach((player) => {
        console.log(player);
        if(player.injured){
            found = true;
            fs.writeFileSync('../Escritorio/lesion.txt', 'HAY LESIONADOS', err => {
                if (err) {
                    console.error(err);
                }
                // file written successfully
            });
        }
    })

    if(!found){
        try{
            fs.unlink("../Escritorio/lesion.txt", () => {} );
        } catch (e) {
            console.log(e);
            console.log('No file');
        }

    }
}

module.exports = { notifyInjury };
