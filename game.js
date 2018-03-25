const BOARD_LENGTH = 10;
const BOARD_HEIGHT = 10;
const SIZE = 25;
const HORIZONTAL = 0;
const VERTICAL = 1;

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


function isValidPlacement(ship, x, y, orientation){

  //If the ship will end up being longer than the board, false
  if (orientation === HORIZONTAL && x + ship.units > BOARD_LENGTH) {
    console.log("TOO LONG! ", ship.units);
    return false;
  }

    if (orientation === VERTICAL && y + ship.units > BOARD_HEIGHT) {
    console.log("TOO LONG! ", ship.units);
    return false;
  }

  //if already ship here
  if(playerBoard.board[y][x] === 1){
    return false;
  }
  return true;
}

function placeShip(event){
  let orientaiton = HORIZONTAL;
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
    if(isValidPlacement(shipToBePlaced, x, y, orientation)){
       $('#playerBoard').empty();
      for( var j = 0; j < shipToBePlaced.units; j ++){
        playerBoard.board[y][x+j] = 1;
        shipToBePlaced.placed = true;
      }
      if(shipToBePlaced.name === "Destroyer"){
        allShipsPlaced = true;
      }
      setUpBoard(playerBoard);
    }
  }
}

function fire(){
  console.log("FIRE!");
}


function handleClick(event){
  console.log(event.target.closest('div'));
  if (allShipsPlaced) {
    fire(event);
  } else {
    placeShip(event);
  }
}

setUpBoard(playerBoard);
setUpBoard(cpuBoard);
$('#playerBoard').on("click", handleClick);