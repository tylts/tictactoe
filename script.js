// function i77yujt8r7juygvugktmuhk7ujhlk,iyjhokihjokiuuo8lo0o89[8=[[=[0-p=-09]]]]
let game;

function Domifier() {
  const getBoxes = () => document.querySelectorAll('.box');

  const printBoxes = (gameBoard) => {
    for (let i = 0; i < getBoxes().length; i++) {
      getBoxes()[i].textContent = gameBoard[i];
    }
  };

  const playerText = document.querySelector('#current-player');
  const gameText = document.querySelector('#game-text');
  const gameBoardDiv = document.querySelector('.game-board');
  const startDiv = document.querySelector('.start');
  const postGame = document.querySelector('.post-game');
  const playAgainBtn = document.querySelector('#play-again');
  const changeNameBtn = document.querySelector('#change-name');

  startDiv.classList.add('hidden');
  gameBoardDiv.classList.remove('hidden');

  const setPlayerText = (text) => (playerText.textContent = text);
  const setGameText = (text) => (gameText.textContent = text);

  const dimOtherBoxes = (box1, box2, box3) => {
    getBoxes().forEach((box) => {
      if (
        box.getAttribute('id') !== `box${box1}` &&
        box.getAttribute('id') !== `box${box2}` &&
        box.getAttribute('id') !== `box${box3}`
      ) {
        box.classList.add('dimmed');
      }
    });
  };

  const deactivateGame = () => {
    getBoxes().forEach((box) => {
      box.removeEventListener('click', game.findIndex);
    });
  };

  const hidePostGame = () => {
    postGame.classList.add('hidden');
  };

  const showPostGame = () => {
    postGame.classList.remove('hidden');
  };

  const resetDom = () => {
    getBoxes().forEach((box) => {
      box.classList.remove('dimmed');
    });
  };

  playAgainBtn.addEventListener('click', () => {
    game.goAgain();
  });

  changeNameBtn.addEventListener('click', () => {
    location.reload();
  });

  return {
    getBoxes,
    printBoxes,
    setGameText,
    setPlayerText,
    dimOtherBoxes,
    resetDom,
    deactivateGame,
    hidePostGame,
    showPostGame,
  };
}

function GameBoard() {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push(Box());
  }

  const placeMark = (box, player) => {
    board[box].addMark(player);
  };

  const getBoard = () => board.map((box) => box.getValue());

  const resetBoard = () => {
    board.forEach((box) => {
      box.resetValue();
    });
  };

  const printBoard = () => {
    console.log(`${getBoard()[0]} ${getBoard()[1]} ${getBoard()[2]}`);
    console.log(`${getBoard()[3]} ${getBoard()[4]} ${getBoard()[5]}`);
    console.log(`${getBoard()[6]} ${getBoard()[7]} ${getBoard()[8]}`);
  };

  return {
    getBoard,
    printBoard,
    placeMark,
    resetBoard,
  };
}

function Box() {
  let value = ' ';

  const addMark = (mark) => {
    value = mark;
  };

  const getValue = () => value;

  const resetValue = () => {
    value = ' ';
  };

  return {
    addMark,
    getValue,
    resetValue,
  };
}

function GameController(
  playerOneName = 'Player 1',
  playerTwoName = 'Player 2'
) {
  const fullGameBoard = GameBoard();
  const domifier = Domifier();

  const players = [
    { name: playerOneName, mark: '╳', domMark: 'X' },
    { name: playerTwoName, mark: '◯', domMark: 'O' },
  ];

  const printRound = () => {
    fullGameBoard.printBoard();
  };

  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;

  const changePlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    domifier.setPlayerText(
      `Current player: ${getCurrentPlayer().name} (${
        getCurrentPlayer().domMark
      })`
    );
  };

  domifier.setPlayerText(
    `Current player: ${getCurrentPlayer().name} (${getCurrentPlayer().domMark})`
  );

  domifier.setGameText(`Choose your box!`);

  const playRound = (box) => {
    if (fullGameBoard.getBoard()[box] === ' ') {
      fullGameBoard.placeMark(box, getCurrentPlayer().mark);
      domifier.printBoxes(fullGameBoard.getBoard());
      changePlayer();
      checkWinner();
    } else {
      console.log('Choose a different box!');
      printRound();
    }
  };

  const checkDraw = () => {
    let board = [];
    let isBoardFull = false;
    fullGameBoard.getBoard().forEach((box) => {
      if (box !== ' ') {
        board.push(box);
      }
    });
    if (board.length === 9) {
      isBoardFull = true;
    }
    return isBoardFull;
  };

  const checkWinner = () => {
    if (
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[1] &&
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[2] &&
      fullGameBoard.getBoard()[0] !== ' ' &&
      fullGameBoard.getBoard()[1] !== ' ' &&
      fullGameBoard.getBoard()[2] !== ' '
    ) {
      changePlayer();
      domifier.setPlayerText(`GAME OVER!`);
      domifier.setGameText(`${currentPlayer.name} is the WINNER!`);
      domifier.dimOtherBoxes(0, 1, 2);
      domifier.deactivateGame();
      domifier.showPostGame();
      return;
    }
    if (
      fullGameBoard.getBoard()[3] === fullGameBoard.getBoard()[4] &&
      fullGameBoard.getBoard()[3] === fullGameBoard.getBoard()[5] &&
      fullGameBoard.getBoard()[3] !== ' ' &&
      fullGameBoard.getBoard()[4] !== ' ' &&
      fullGameBoard.getBoard()[5] !== ' '
    ) {
      changePlayer();
      domifier.setPlayerText(`GAME OVER!`);
      domifier.setGameText(`${currentPlayer.name} is the WINNER!`);
      domifier.dimOtherBoxes(3, 4, 5);
      domifier.deactivateGame();
      domifier.showPostGame();
      return;
    }
    if (
      fullGameBoard.getBoard()[6] === fullGameBoard.getBoard()[7] &&
      fullGameBoard.getBoard()[6] === fullGameBoard.getBoard()[8] &&
      fullGameBoard.getBoard()[6] !== ' ' &&
      fullGameBoard.getBoard()[7] !== ' ' &&
      fullGameBoard.getBoard()[8] !== ' '
    ) {
      changePlayer();
      domifier.setPlayerText(`GAME OVER!`);
      domifier.setGameText(`${currentPlayer.name} is the WINNER!`);
      domifier.dimOtherBoxes(6, 7, 8);
      domifier.deactivateGame();
      domifier.showPostGame();
      return;
    }
    if (
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[3] &&
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[6] &&
      fullGameBoard.getBoard()[0] !== ' ' &&
      fullGameBoard.getBoard()[3] !== ' ' &&
      fullGameBoard.getBoard()[6] !== ' '
    ) {
      changePlayer();
      domifier.setPlayerText(`GAME OVER!`);
      domifier.setGameText(`${currentPlayer.name} is the WINNER!`);
      domifier.dimOtherBoxes(0, 3, 6);
      domifier.deactivateGame();
      domifier.showPostGame();
      return;
    }
    if (
      fullGameBoard.getBoard()[1] === fullGameBoard.getBoard()[4] &&
      fullGameBoard.getBoard()[1] === fullGameBoard.getBoard()[7] &&
      fullGameBoard.getBoard()[1] !== ' ' &&
      fullGameBoard.getBoard()[4] !== ' ' &&
      fullGameBoard.getBoard()[7] !== ' '
    ) {
      changePlayer();
      domifier.setPlayerText(`GAME OVER!`);
      domifier.setGameText(`${currentPlayer.name} is the WINNER!`);
      domifier.dimOtherBoxes(1, 4, 7);
      domifier.deactivateGame();
      domifier.showPostGame();
      return;
    }
    if (
      fullGameBoard.getBoard()[2] === fullGameBoard.getBoard()[5] &&
      fullGameBoard.getBoard()[2] === fullGameBoard.getBoard()[8] &&
      fullGameBoard.getBoard()[2] !== ' ' &&
      fullGameBoard.getBoard()[5] !== ' ' &&
      fullGameBoard.getBoard()[8] !== ' '
    ) {
      changePlayer();
      domifier.setPlayerText(`GAME OVER!`);
      domifier.setGameText(`${currentPlayer.name} is the WINNER!`);
      domifier.dimOtherBoxes(2, 5, 8);
      domifier.deactivateGame();
      domifier.showPostGame();
      return;
    }
    if (
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[4] &&
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[8] &&
      fullGameBoard.getBoard()[0] !== ' ' &&
      fullGameBoard.getBoard()[4] !== ' ' &&
      fullGameBoard.getBoard()[8] !== ' '
    ) {
      changePlayer();
      domifier.setPlayerText(`GAME OVER!`);
      domifier.setGameText(`${currentPlayer.name} is the WINNER!`);
      domifier.dimOtherBoxes(0, 4, 8);
      domifier.deactivateGame();
      domifier.showPostGame();
      return;
    }
    if (
      fullGameBoard.getBoard()[2] === fullGameBoard.getBoard()[4] &&
      fullGameBoard.getBoard()[2] === fullGameBoard.getBoard()[6] &&
      fullGameBoard.getBoard()[2] !== ' ' &&
      fullGameBoard.getBoard()[4] !== ' ' &&
      fullGameBoard.getBoard()[6] !== ' '
    ) {
      changePlayer();
      domifier.setPlayerText(`GAME OVER!`);
      domifier.setGameText(`${currentPlayer.name} is the WINNER!`);
      domifier.dimOtherBoxes(2, 4, 6);
      domifier.deactivateGame();
      domifier.showPostGame();
      return;
    }
    if (
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[4] &&
      fullGameBoard.getBoard()[0] === fullGameBoard.getBoard()[8] &&
      fullGameBoard.getBoard()[0] !== ' ' &&
      fullGameBoard.getBoard()[4] !== ' ' &&
      fullGameBoard.getBoard()[8] !== ' '
    ) {
      changePlayer();
      domifier.setPlayerText(`GAME OVER!`);
      domifier.setGameText(`${currentPlayer.name} is the WINNER!`);
      domifier.dimOtherBoxes(0, 4, 8);
      domifier.deactivateGame();
      domifier.showPostGame();
      return;
    }
    if (checkDraw()) {
      domifier.setPlayerText(`GAME OVER!`);
      domifier.setGameText(`DRAW!!!`);
      domifier.deactivateGame();
      domifier.showPostGame();
    }
  };

  const findIndex = (e) => {
    const target = e.target;
    const parent = target.parentNode;
    const index = [].indexOf.call(parent.children, target);

    playRound(index);
  };

  domifier.getBoxes().forEach((box) => {
    box.addEventListener('click', findIndex);
  });

  const resetBoard = () => {
    domifier.getBoxes().forEach((box) => {
      box.addEventListener('click', findIndex);
    });
    fullGameBoard.resetBoard();
    domifier.setPlayerText(
      `Current player: ${getCurrentPlayer().name} (${
        getCurrentPlayer().domMark
      })`
    );
    domifier.hidePostGame();
    domifier.setGameText(`Choose your box!`);
    console.log('resetting board...');
  };

  const goAgain = () => {
    changePlayer();
    resetBoard();
    fullGameBoard.getBoard();
    domifier.printBoxes(fullGameBoard.getBoard());
    domifier.resetDom();
  };

  return {
    getCurrentPlayer,
    printRound,
    playRound,
    goAgain,
    findIndex,
  };
}

document.querySelector('#start-btn').addEventListener('click', () => {
  const p1name = document.querySelector('#p1-name').value || undefined;
  const p2name = document.querySelector('#p2-name').value || undefined;
  game = GameController(p1name, p2name);
});
