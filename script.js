function GameBoard() {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push(Box());
  }

  const getBoard = () => board;

  const placeMark = (box, player) => {
    console.log(box);
  };

  const printBoard = () => {
    const boardWithBoxes = board.map((box) => box.getValue());
    console.log(boardWithBoxes);
  };

  return {
    getBoard,
    printBoard,
    placeMark,
  };
}

function Box() {
  let value = ' ';

  const addMark = (mark) => {
    value = mark;
  };

  const getValue = () => value;

  return {
    addMark,
    getValue,
  };
}

function GameController(
  playerOneName = 'Player 1',
  playerTwoName = 'Player 2'
) {
  const board = GameBoard();

  const players = [
    { name: playerOneName, mark: 'X' },
    { name: playerTwoName, mark: 'O' },
  ];

  const printRound = () => {
    board.printBoard();
    board.placeMark('Tyler');
  };

  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;

  const changePlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  console.log(currentPlayer.mark);
  return {
    getCurrentPlayer,
    printRound,
  };
}

const game = GameController();
