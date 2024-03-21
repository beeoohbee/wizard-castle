
const map = new Array();

var playerLocation = {
    floor: 0,
    row: 0,
    col: 4
}; // row, column

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

    //Add Monsters
    generateMonsters();
    generatebob();
    //TODO randomly place monsters in rooms



    //Add Pools

    drawMap();
    
}
//gets me 2 random numbers to use as quards  
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
//Actually gen monsters
function generateMonsters(){
    for( let floor = 0; floor < 10; floor++){
        let monsterCount = 0;
       while( monsterCount < 5) {
            let r = getRandomInt(10);
            let c = getRandomInt(10);
            let whatName = getRandomInt(10);
            let name = 'old lady';
            if(whatName > 5){
                name = 'mosnter'
            }
            if (map[floor][r][c].key == '.') {
                monsterCount++;
                map[floor][r][c].key = name;
            }
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
            } else {
                contents = '?';
            }
            mapString += '<td>' + contents +  player + '</td>';
        }   
        mapString += '</tr>';
    }
    mapString += '</table>';
    document.getElementById('map').innerHTML = mapString;
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
    if ((cmd == 'S' || cmd == 's') && playerLocation.row < 9) { // || means or
        //TODO move the player down one cell (if you get to row 10 (9) you hit a wall)
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
    drawMap();
}

function keyListener(event) {
    console.log(event.keyCode);
    if (event.keyCode == 40) {
        executeCommand('s');
    } else if (event.keyCode == 38) {
        executeCommand('n');
    } else if (event.keyCode == 39) {
        executeCommand('e');
    } else if (event.keyCode == 37) {
        executeCommand('w');
    }
}


document.onkeydown = keyListener;

