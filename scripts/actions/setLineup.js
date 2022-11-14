const { By, until } = require('selenium-webdriver');

async function setLineup(driver, players) {
    try {
        await driver.get('https://mister.mundodeportivo.com/team');
        await driver.wait(until.elementLocated(By.className('player-list list-team')), 5000);
        let slots = [];
        let currenPlayerNames = [];
        for (let i = 1; i < 12; i++){
            let slot =  await driver.findElement(By.id(`slot-${i}`), 5000);
            slots.push(slot);
            let name = await slot.findElement(By.className('name')).getAttribute('innerHTML');
            console.log(name);
            currenPlayerNames.push(name.trim());
        }
        let notInTeam = [];
        console.log('Lineup');
        players.forEach(player => {console.log(player)})

        players.forEach(player => {
            let found = false;
            currenPlayerNames.forEach( (name) => {
                if(player.name === name){
                    found = true;
                }
            });
            if(!found){
                console.log('Not in team');
                console.log(player.name);
                notInTeam.push(player.name);
            }
        });

        for (let a = 0; a< currenPlayerNames.length; a++) {
            let name = currenPlayerNames[a];
            console.log('Checking ' + name);
            let found = false;
            for( let i = 0; i < players.length; i++){
                if(name === players[i].name){
                    found = true;
                    break;
                }
            }
            if(!found) { //El jugador no tiene que estar en el equipo
                console.log('Replacing ' + name);
                await driver.wait(until.elementLocated(By.className('lineup-starting subs-open')), 5000);
                await slots[a].click();
                await driver.wait(until.elementLocated(By.className('player-list list-subs list-subs-open')), 5000);
                const playerHTMLCollection = await driver.findElement(By.className('player-list list-subs list-subs-open'));
                const playerList = await playerHTMLCollection.findElements(By.tagName('li'));
                for (let j = 0; j < playerList.length; j++) {
                    let subPlayer = playerList[j];
                    let subName = await subPlayer.findElement(By.className('name')).getAttribute('innerHTML');
                    if (notInTeam.includes(subName.trim())) {
                        console.log('With ' + subName.trim());
                        const index = notInTeam.indexOf(subName.trim());
                        let subButton = await subPlayer.findElement(By.className('btn player'));
                        subButton.click();
                        notInTeam.splice(index, 1);
                        break;
                    }
                }

            }
        }
        await driver.wait(until.elementLocated(By.className('lineup-starting subs-open')), 5000);

    }catch (e) {
        console.log(e);
        await driver.quit();
    }
}

module.exports = {setLineup};
