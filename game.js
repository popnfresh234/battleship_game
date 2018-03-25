const BOARD_LENGTH = 10;
const BOARD_HEIGHT = 10;
const SIZE = 25;

const playerShipCount = 5;
let allShipsPlaced = false;

const ships = [
{name: 'Carrier', units: 5, placed: false},
{name: 'Battleship', units: 4, placed: false},
{name: 'Cruiser', units: 3, placed: false},
{name: 'Submarine', units: 3, placed: false},
{name: 'Destroyer', units: 2, placed: false},
];

const playerBoard = {
  board: [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  ],
  name: "player"
};

const cpuBoard = {
  board: [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  ],
  name: 'cpu'
};


function setUpBoard(board){
  for (let i = 0; i < BOARD_HEIGHT; i ++){
    for (let j = 0; j < BOARD_LENGTH; j ++){
      let fill = 0;
      if (board.name === 'player') {
        fill = board.board[i][j];
      }
      let newSquare = $('<div id="' + 's' + j + i +'"class="square">' + fill +'</div>');
      if(fill === 1){
        $(newSquare).css('background-color', 'green');
      }
      newSquare.css({
        top: i * SIZE + 'px',
        left: j * SIZE + 'px',
      });
      $('#' + board.name + 'Board').append(newSquare);
    }
  }
}


function isValidPlacement(ship, x, y, isVertical){

  //If the ship will end up being longer than the board, false
  if (!isVertical && x + ship.units > BOARD_LENGTH) {
    console.log("TOO LONG! ", ship.units);
    return false;
  }

  if (isVertical && y + ship.units > BOARD_HEIGHT) {
    console.log("TOO LONG! ", ship.units);
    return false;
  }

  //if already ship here
  if(playerBoard.board[y][x] === 1){
    return false;
  }
  return true;
}

function updatePlayerBoard(ship, x, y, isVertical){
  for( var j = 0; j < ship.units; j ++){
    if(!isVertical){
      playerBoard.board[y][x+j] = 1;
    } else {
      playerBoard.board[y + j][x] = 1;
    }
  }
  ship.placed = true;
  if(ship.name === "Destroyer"){
    allShipsPlaced = true;
    $('#orientationContainer').empty().remove();
  }
  setUpBoard(playerBoard);
}

function placeShip(event){
  let isVertical = $('#orientationCheckbox').is(":checked");
  let shipToBePlaced;
  for (let i = 0; i < ships.length; i ++){
    if(!ships[i].placed){
      shipToBePlaced = ships[i];
      break;
    }
  }
  if (shipToBePlaced) {
    let id = $(event.target.closest('div')).attr('id');
    let x = Number(id.split("")[1]);
    let y = Number(id.split("")[2]);
    if(isValidPlacement(shipToBePlaced, x, y, isVertical)){
      $('#playerBoard').empty();
      updatePlayerBoard(shipToBePlaced, x, y, isVertical);
    }
  }
}

function fire(){
  console.log("FIRE!");
}


function handlePlayerBoardClick(event){
  if (!allShipsPlaced) {
    placeShip(event);
  }
}

function handleCpuBoardClick(event){
  if (!allShipsPlaced) {
    alert("NOT DONE PLACING");
  } else {
    fire();
  }
}

setUpBoard(playerBoard);
setUpBoard(cpuBoard);

$('#playerBoard').on("click", handlePlayerBoardClick);
$('#cpuBoard').on("click", handleCpuBoardClick);