const { By, until } = require('selenium-webdriver');

async function setLineup(driver,players) {
    try {
        await driver.get('https://mister.mundodeportivo.com/team');
        await driver.wait(until.elementLocated(By.className('player-list list-team')), 5000);
        let slots = [];
        let currenPlayerNames = [];
        for (let i = 1; i < 12; i++){
            let slot =  await driver.findElement(By.id(`slot-${i}`), 5000)
            slots.push(slot);
            let name = slot.findElement(By.className('name')).getAttribute('innerHTML').trim();
            currenPlayerNames.push(name);
        }
        let notInTeam = [];
        currenPlayerNames.forEach(name => {
            let found = false;
            players.forEach( (player) => {
                if(player.name === name){
                    found = true;
                }
            });
            if(!found){
                notInTeam.push(name);
            }
        });

        for (const name of currenPlayerNames) {
            let index = currenPlayerNames.indexOf(name);
            let found = false;
            for( let i = 0; i < players.length; i++){
                if(name === players[i].name){
                    found = true;
                    break;
                }
            };
            if(!found){ //El jugador no tiene que estar en el equipo
                let position = await slots[index].findElement(By.className('data-position'));
                position = position === 1 ? 'Goalkeeper' : (position === 2 ? 'Defender' : (position === 3  ? 'Midfield' : (position === 4 ? 'Striker' : null)));
                for (const player of notInTeam) {
                    if(player.position === position){ //Si encontramos un jugador que no esta en la lista de subs va para dentro
                        slots[index].click();
                        await driver.wait(until.elementLocated(By.id('popup')), 5000);
                        const playerHTMLCollection = await driver.findElement(By.className('player-list list-subs lists-subs-open'));
                        const playerList = await playerHTMLCollection.findElements(By.tagName('li'));
                        for (let j = 0; j < playerList.length; j++) {
                            let subPlayer = playerList[j];
                            let subName = await subPlayer.findElement(By.className('name')).getAttribute('innerHTML');
                            if(notInTeam.includes(subName)){
                                const index = notInTeam.indexOf(subName);
                                let subButton = await player.findElement(By.className('btn player'));
                                subButton.click();
                                notInTeam.splice(index,1);
                            }
                        }
                    }
                }
            }


        }

    }catch (e) {
        console.log(e);
        await driver.quit();
    }
}
