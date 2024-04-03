//Notes
//fn f12 helps fix browser
const map = new Array();

var playerLocation = {
    floor: 0,
    row: 0,
    col: 4,
    health: 100,
    attack: getRandomInt(10) + 10,
    defense:  getRandomInt(10) + 10,
    agility:  getRandomInt(10) + 10,
    xp: 0,
    key: 'You'
};

function generateGame() {

    for( let floor = 0; floor < 10; floor++) {
        const floorArray = new Array();
        map.push(floorArray);
        //Setup Base Room
        for (let row = 0; row < 10; row++ ) {
            const rowArray = new Array();
            floorArray.push(rowArray);
            for (let col = 0; col < 10; col++ ) {
                const room = new Object();
                room.explored = true; 
                room.key = '.';
                rowArray.push(room);
            }   
        }
    }

    for(let f=0; f<9; f++) {
        var addedStairs = false;
        while (!addedStairs) {
            let r=  getRandomInt(10);
            let c=  getRandomInt(10);
            if (map[f][r][c].key === '.' &&
                map[f+1][r][c].key === '.') {
                map[f][r][c].key = 'SU';
                map[f+1][r][c].key = 'SD';
                addedStairs = true;
                }
        }
    }

    generateMonsters();
    generateBoss();
    drawMap();  
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function generateMonsters(){
    
    for( let floor = 0; floor < 10; floor++){

        let monsterCount = 0;
       while( monsterCount < 5) {
        //place vaibles
            let r = getRandomInt(10);
            let c = getRandomInt(10);
            var monsterStats = {
                health: 10 + getRandomInt(50),
                agility: 1 + floor + getRandomInt((1+floor) * 10),
                attack: 1 + floor + getRandomInt((1+floor) * 10),
                defense: 1 + floor + getRandomInt((1+floor) * 10)
            };
        //name
            let whatName = getRandomInt(10);
            let name = 'orc';
            if(whatName == 1 ){
                name = 'dragon'
            } else if (whatName < 2){
                name = 'goblin'
            } else if (whatName < 3){
                name = 'troll'
            } else if (whatName < 4){
                name = 'dark night'
            } else if (whatName < 5){
                name = 'blob'
            } else if (whatName < 6){
                name = 'Mr.Oogway'
            } else if (whatName < 7){
                name = 'dark elf'
            } else if (whatName < 8){
                name = 'hydra'
            } else if (whatName < 9){
                name = 'werewolf'
            }
        //place used
            if (map[floor][r][c].key == '.') {
                map[floor][r][c].key = name;
                map[floor][r][c].monsterStats = monsterStats;
                monsterCount++;
            }
        }
    }
}
function generateBoss(){

    var bossCount = 0;
        while( bossCount < 1) {
            let a = getRandomInt(10);
            let b = getRandomInt(10);
            let name = 'boss';
            if (map[9][a][b].key == '.') {
                bossCount++;
                map[9][a][b].key = name;
            }
        }
}

function drawMap() {

    let floor = playerLocation.floor;

    let mapString = '<table>';
    for (let row = 0; row < 10; row++ ) {
        mapString += '<tr>'
        for (let col = 0; col < 10; col++ ) {
            let contents;
            
            let player = '';
            if (playerLocation.row == row && playerLocation.col == col) {
                map[floor][row][col].explored = true;
                player = '<br>insert<br>icon';
            }
            if (map.at(floor).at(row).at(col).explored) {
                contents = map.at(floor).at(row).at(col).key;

                if (map.at(floor).at(row).at(col).monsterStats){
                    ms = map.at(floor).at(row).at(col).monsterStats;
                    contents += '<br>H: ' + ms.health + ' A: ' + ms.attack + ' D: '+ ms.defense + ' S: ' + ms.agility;
                }

            } else {
                contents = '?';
            }
            mapString += '<td>' + contents +  player + '</td>';
        }   
        mapString += '</tr>';
    }
    mapString += '</table>';
    document.getElementById('map').innerHTML = mapString;
    document.getElementById('player').innerHTML = 'H: ' + playerLocation.health + ' A: ' + playerLocation.attack
        + ' D: '+ playerLocation.defense + ' S: ' + playerLocation.agility + ' XP: ' + playerLocation.xp;
}

function submitCommand() {
    var input = document.getElementById('cmd');
    var cmd = input.value;
    input.value = '';
    console.log(cmd);
    input.focus();

    executeCommand(cmd);

}

function executeCommand(cmd) {
    if ((cmd == 'S' || cmd == 's') && playerLocation.row < 9) { 
        playerLocation.row = playerLocation.row + 1;
    }
    if ((cmd == 'N' || cmd == 'n' )&& playerLocation.row > 0) { 
        playerLocation.row = playerLocation.row - 1;
    }
    if ((cmd == 'W' || cmd == 'w') && playerLocation.col > 0) { 
        playerLocation.col = playerLocation.col - 1;
    }
    if ((cmd == 'E' || cmd == 'e') && playerLocation.col < 9) { 
        playerLocation.col = playerLocation.col + 1;
    }
    if ((cmd == 'U' || cmd == 'u') && playerLocation.floor < 9) { 
        playerLocation.floor = playerLocation.floor + 1;
    }
    if ((cmd == 'D' || cmd == 'd') && playerLocation.floor > 0) { 
        playerLocation.floor = playerLocation.floor - 1;
    }
    if (cmd == 'A' || cmd == 'a') {
        var room = map[playerLocation.floor][playerLocation.row][playerLocation.col];
        if (room.monsterStats) {
            if (playerLocation.agility > room.monsterStats.agility) {
                fight(playerLocation, room.monsterStats);
                fight(room.monsterStats, playerLocation);
            } else {
                fight(room.monsterStats, playerLocation);
                fight(playerLocation, room.monsterStats);
            }

            if (room.monsterStats.health <= 0) {
                display("You have vanquished the " + room.key);
                awardXP();
                delete room.monsterStats;
            }
            if (playerLocation.health <= 0) {
                display('You are dead!');
            }
        } else {
            display("What are you swinging at?")
        }
    }
    drawMap();
}

function fight(a, d) {
    if (a.health <= 0) {
        return;
    }
    display(a.key + ' attacks!')
    var dodgeRate = Math.max((d.agility - a.agility) / (a.agility + d.agility), .1 );
    var attack = Math.max(a.attack - d.defense, 1);
    if (Math.random() < dodgeRate) {
        display(d.key + ' dodged the attack');
    } else {
        d.health -= attack;
    }
}

function awardXP() {
    playerLocation.xp += 1;
    if (playerLocation.xp % 5 == 0) {
        playerLocation.health = 100;
        playerLocation.attack += getRandomInt(20);
        playerLocation.defense += getRandomInt(20);
        playerLocation.agility += getRandomInt(20);
    }
}

function display(message) {
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = outputDiv.innerHTML + '<br>' + message;
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

function keyListener(event) {
    console.log(event.keyCode);
    if (event.keyCode == 83) {
        executeCommand('s');
    } else if (event.keyCode == 87) {
    } else if (event.keyCode == 87) {
        executeCommand('n');
    } else if (event.keyCode == 68) {
    } else if (event.keyCode == 68) {
        executeCommand('e');
    } else if (event.keyCode == 65) {
    } else if (event.keyCode == 65) {
        executeCommand('w');
    }else if ((event.keyCode == 38) && keyAtPlayerLocation(playerLocation, 'SU')) {
        executeCommand('u');
    }else if ((event.keyCode == 40) && keyAtPlayerLocation(playerLocation, 'SD')) {
        executeCommand('d');
    } else if (event.keyCode == 32) {
        executeCommand('a');
    }
}

function keyAtPlayerLocation(playerLocation, key) {
  //return boolean if the player is at a location with the given key
    var currentRoom = map[playerLocation.floor][playerLocation.row][playerLocation.col];
    console.log(currentRoom);
    return currentRoom.key == key;
}


document.onkeydown = keyListener;

