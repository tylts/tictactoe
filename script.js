function GameBoard() {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push(Box());
  }

  const getBoard = () => board;

  const placeMark = (box, player) => {
    board[box].addMark(player);
  };

  const printBoard = () => {
    const boardWithBoxes = board.map((box) => box.getValue());
    console.log(
      `${boardWithBoxes[0]} ${boardWithBoxes[1]} ${boardWithBoxes[2]}`
    );
    console.log(
      `${boardWithBoxes[3]} ${boardWithBoxes[4]} ${boardWithBoxes[5]}`
    );
    console.log(
      `${boardWithBoxes[6]} ${boardWithBoxes[7]} ${boardWithBoxes[8]}`
    );
  };

  return {
    getBoard,
    printBoard,
    placeMark,
  };
}

function Box() {
  let value = '-';

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
  };

  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;

  const changePlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (box) => {
    board.placeMark(box, getCurrentPlayer().mark);
    printRound();
    changePlayer();
  };

  return {
    getCurrentPlayer,
    printRound,
    playRound,
  };
}

const game = GameController();
