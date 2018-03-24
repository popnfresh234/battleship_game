const BOARD_LENGTH = 10;
const BOARD_HEIGHT = 10;
const SIZE = 25;

let playerShipCount = 5;

const playerBoard = {
  board: [
   [0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0],
   [0,0,1,0,0,0,0,0,0,0],
   [0,0,1,0,0,0,0,0,0,0],
   [0,0,1,0,0,0,0,0,0,0],
   [0,0,1,0,0,0,0,0,0,0],
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
      let newSquare = $('<div id="' + 's' + i + j +'">' + fill +'</div>');
      newSquare.css({
        top: i * SIZE + 'px',
        left: j * SIZE + 'px',
      });
      $('#' + board.name + 'Board').append(newSquare);
    }
  }
}

setUpBoard(playerBoard);
setUpBoard(cpuBoard);