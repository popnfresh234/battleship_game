const BOARD_LENGTH = 10;
const BOARD_HEIGHT = 10;
const SIZE = 25;
const OFFSET = 300;

const HIT = 3;
const MISS = 2;
const SHIP_SPACE = 1;
const EMPTY = 0;
const ALREADY_HIT = 99;

const playerShipCount = 5;

let playerFirst = false;
let allShipsPlaced = false;
let allCpuShipsPlaced = false;
let gameFinished = false;

let playerScore = 0;
let cpuScore = 0;

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
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  ],
  name: 'cpu'
};


function setUpBoard(board){
  for (let i = 0; i < BOARD_HEIGHT; i ++){
    for (let j = 0; j < BOARD_LENGTH; j ++){
      let fill = 0;
      //if (board.name === 'player') {
        fill = board.board[i][j];
      //}
      let newSquare = $('<div id="' + 's' + j + i +'"class="square">' + fill +'</div>');
      if (fill === 1) {
        $(newSquare).css('background-color', 'green');
      }

      if (fill === 2) {
        $(newSquare).css('background-color', 'black');
      }

      if (fill === 3){
        $(newSquare).css('background-color', 'red');
      }
      var leftPosition = j * SIZE;
      if (board.name === 'cpu') {
        leftPosition = leftPosition + OFFSET ;
      }
      newSquare.css({
        top: i * SIZE + 'px',
        left: leftPosition + 'px',
      });

      $('#' + board.name + 'Board').append(newSquare);
    }
  }
}


function isValidPlacement(ship, x, y, isVertical, board){



  //make sure ship fits on board horizontally
  if (!isVertical && x + ship.units > BOARD_LENGTH) {
    console.log("TOO LONG! ", ship.units);
    return false;
  }
  //make sure ship fits vertically
  if (isVertical && y + ship.units > BOARD_HEIGHT) {
    console.log("TOO LONG! ", ship.units);
    return false;
  }
  //check X & Y for other ships:
  for(var i = 0; i < ship.units; i ++){
    if(!isVertical && board.board[y][x + i] === 1){
      console.log("collision hor");
      return false;
    }
    if(isVertical && board.board[y + i][x] === 1){
      console.log("collisoin vert");
      return false;
    }
  }
  return true;
}

function updateBoard(ship, x, y, isVertical, board){
  for( var j = 0; j < ship.units; j ++){
    if(!isVertical){
      board.board[y][x+j] = 1;
    } else {
      board.board[y + j][x] = 1;
    }
  }

  ship.placed = true;

  if (ship.name === "Destroyer"){
    if (board.name === playerBoard.name){
      allShipsPlaced = true;
    } else {
      allCpuShipsPlaced = true;
    }
    $('#orientationContainer').empty().remove();
    if (board.name === playerBoard.name) {
      placeRandomCpuShips();
    }
  }
  setUpBoard(board);
}

function placePlayerShip(event, board){
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
    if(isValidPlacement(shipToBePlaced, x, y, isVertical, board)){
      $(board).empty();
      updateBoard(shipToBePlaced, x, y, isVertical, board);
    }
  }
}

function placeCpuShip(board){
  let shipToBePlaced;
  for (let i = 0; i < ships.length; i ++){
    if(!ships[i].placed){
      shipToBePlaced = ships[i];
      break;
    }
  }
  if (shipToBePlaced) {
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);
    let isVertical = Math.random() >= 0.5;
    if(isValidPlacement(shipToBePlaced, x, y, isVertical, board)){
      $(board).empty();
      updateBoard(shipToBePlaced, x, y, isVertical, board);
    }
  }
}

function isHit(board, x, y){
  boardValue = board.board[y][x];
  if (boardValue === SHIP_SPACE) {
    console.log('PLAYER SCORE: ', playerScore);
    console.log('CPU SCORE: ', cpuScore);
    return HIT;
  } else if (boardValue === EMPTY) {
    return MISS;
  } else {
    return ALREADY_HIT;
  }
}

function cpuFire(){
  let x = Math.floor(Math.random() * 9);
  let y = Math.floor(Math.random() * 9);
  let square = $('#playerBoard ' + '#s' + x + y);
  let updatedSquare = isHit(playerBoard, x, y);
  if (updatedSquare === ALREADY_HIT){
    cpuFire();
    return;
  }

  if (updatedSquare === HIT) {
    cpuScore ++;
    playerBoard.board[y][x] = HIT;
    if (cpuScore === 17) {
      gameFinished = true;
      alert('YOU LOSE');
    }
  } else if (updatedSquare === ALREADY_HIT){
    console.log("VOOO");
  } else {
    playerBoard.board[y][x] = updatedSquare;
  }

  setUpBoard(playerBoard);
}

function fire(event){
  let square = $(event.target.closest('div'));
  let id = $(square).attr('id');
  let x = Number(id.split("")[1]);
  let y = Number(id.split("")[2]);
  let updatedSquare = isHit(cpuBoard, x, y);
  if (updatedSquare === HIT) {
    playerScore ++;
    cpuBoard.board[y][x] = HIT;
    if (playerScore === 17) {
      gameFinished = true;
      alert('YOU WIN');
    }
  } else if (updatedSquare === ALREADY_HIT){
    console.log("BOO");
  } else {
    cpuBoard.board[y][x] = updatedSquare;
  }

  if (!gameFinished){
    cpuFire();
  }

  setUpBoard(cpuBoard);
}

function placeRandomCpuShips(){
  //Reset ship array after player has selected
  ships.forEach(function(ship){
    ship.placed = false;
  });

  while(!allCpuShipsPlaced){
    placeCpuShip(cpuBoard);
  }
}

function handlePlayerBoardClick(event){
  if (!allShipsPlaced) {
    placePlayerShip(event, playerBoard);
  }
}

function handleCpuBoardClick(event){
  if (!allShipsPlaced) {
    alert("NOT DONE PLACING");
  } else {
    fire(event);
  }
}

setUpBoard(playerBoard);
setUpBoard(cpuBoard);

$('#playerBoard').on("click", handlePlayerBoardClick);
$('#cpuBoard').on("click", handleCpuBoardClick);