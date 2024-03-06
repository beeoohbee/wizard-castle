
const map = new Array();

var playerLocation = {
    row: 0,
    col: 4
}; // row, column

function generateGame() {

    //Setup Base Room
    for (let row = 0; row < 10; row++ ) {
        const rowArray = new Array();
        map.push(rowArray);
        for (let col = 0; col < 10; col++ ) {
            const room = new Object();
            room.explored = false; 
            room.key = '.';
            rowArray.push(room);
           
        }   
    }

    //Add Monsters
    //TODO randomly place monsters in rooms
    map[0][0].contents = 'Orc';
    map[0][0].key = 'M';


    //Add Pools

    drawMap();
    
}


function drawMap() {
    let mapString = '<table>';
    for (let row = 0; row < 10; row++ ) {
        mapString += '<tr>'
        for (let col = 0; col < 10; col++ ) {
            let contents;
            
            let player = '';
            if (playerLocation.row == row && playerLocation.col == col) {
                map[row][col].explored = true;
                player = '<br>insert<br>icon';
            }
            if (map.at(row).at(col).explored) {
                contents = map.at(row).at(col).key;
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

    if (cmd == 'S' || cmd == 's') { // || means or
        //TODO move the player down one cell (if you get to row 10 (9) you hit a wall)
        playerLocation.row = playerLocation.row + 1;


    }
    drawMap();

}

