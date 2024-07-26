function GameBoard() {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push(Box());
  }

  const placeMark = (box, player) => {
    board[box].addMark(player);
  };

  const getBoard = () => board.map((box) => box.getValue());

  const printBoard = () => {
    console.log(`${getBoard()[0]} ${getBoard()[1]} ${getBoard()[2]}`);
    console.log(`${getBoard()[3]} ${getBoard()[4]} ${getBoard()[5]}`);
    console.log(`${getBoard()[6]} ${getBoard()[7]} ${getBoard()[8]}`);
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
  const fullGameBoard = GameBoard();

  // const box0 = document.querySelector('#box0');
  // const box1 = document.querySelector('#box1');
  // const box2 = document.querySelector('#box2');
  // const box3 = document.querySelector('#box3');
  // const box4 = document.querySelector('#box4');
  // const box5 = document.querySelector('#box5');
  // const box6 = document.querySelector('#box6');
  // const box7 = document.querySelector('#box7');
  // const box8 = document.querySelector('#box8');

  const domBoxes = document.querySelectorAll('.box');

  const players = [
    { name: playerOneName, mark: 'X' },
    { name: playerTwoName, mark: 'O' },
  ];

  const printRound = () => {
    fullGameBoard.printBoard();
  };

  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;

  const changePlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (box) => {
    if (fullGameBoard.getBoard()[box] === '-') {
      fullGameBoard.placeMark(box, getCurrentPlayer().mark);
      printRound();
      checkWinner();
      changePlayer();
    } else {
      console.log('Choose a different box!');
      printRound();
    }
  };

  const checkWinner = () => {
    if (
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[1] &&
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[2] &&
      fullGameBoard.getBoard()[0] !== '-' &&
      fullGameBoard.getBoard()[1] !== '-' &&
      fullGameBoard.getBoard()[2] !== '-'
    ) {
      console.log(`${currentPlayer.name} is the WINNER!`);
    }
    if (
      fullGameBoard.getBoard()[3] === fullGameBoard.getBoard()[4] &&
      fullGameBoard.getBoard()[3] === fullGameBoard.getBoard()[5] &&
      fullGameBoard.getBoard()[3] !== '-' &&
      fullGameBoard.getBoard()[4] !== '-' &&
      fullGameBoard.getBoard()[5] !== '-'
    ) {
      console.log(`${currentPlayer.name} is the WINNER!`);
    }
    if (
      fullGameBoard.getBoard()[6] === fullGameBoard.getBoard()[7] &&
      fullGameBoard.getBoard()[6] === fullGameBoard.getBoard()[8] &&
      fullGameBoard.getBoard()[6] !== '-' &&
      fullGameBoard.getBoard()[7] !== '-' &&
      fullGameBoard.getBoard()[8] !== '-'
    ) {
      console.log(`${currentPlayer.name} is the WINNER!`);
    }
    if (
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[3] &&
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[6] &&
      fullGameBoard.getBoard()[0] !== '-' &&
      fullGameBoard.getBoard()[3] !== '-' &&
      fullGameBoard.getBoard()[6] !== '-'
    ) {
      console.log(`${currentPlayer.name} is the WINNER!`);
    }
    if (
      fullGameBoard.getBoard()[1] === fullGameBoard.getBoard()[4] &&
      fullGameBoard.getBoard()[1] === fullGameBoard.getBoard()[7] &&
      fullGameBoard.getBoard()[1] !== '-' &&
      fullGameBoard.getBoard()[4] !== '-' &&
      fullGameBoard.getBoard()[7] !== '-'
    ) {
      console.log(`${currentPlayer.name} is the WINNER!`);
    }
    if (
      fullGameBoard.getBoard()[2] === fullGameBoard.getBoard()[5] &&
      fullGameBoard.getBoard()[2] === fullGameBoard.getBoard()[8] &&
      fullGameBoard.getBoard()[2] !== '-' &&
      fullGameBoard.getBoard()[5] !== '-' &&
      fullGameBoard.getBoard()[8] !== '-'
    ) {
      console.log(`${currentPlayer.name} is the WINNER!`);
    }
    if (
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[4] &&
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[8] &&
      fullGameBoard.getBoard()[0] !== '-' &&
      fullGameBoard.getBoard()[4] !== '-' &&
      fullGameBoard.getBoard()[8] !== '-'
    ) {
      console.log(`${currentPlayer.name} is the WINNER!`);
    }
    if (
      fullGameBoard.getBoard()[2] === fullGameBoard.getBoard()[4] &&
      fullGameBoard.getBoard()[2] === fullGameBoard.getBoard()[6] &&
      fullGameBoard.getBoard()[2] !== '-' &&
      fullGameBoard.getBoard()[4] !== '-' &&
      fullGameBoard.getBoard()[6] !== '-'
    ) {
      console.log(`${currentPlayer.name} is the WINNER!`);
    }
  };

  return {
    getCurrentPlayer,
    printRound,
    playRound,
  };
}

const game = GameController();
