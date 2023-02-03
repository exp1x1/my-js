const Player = (name, sign) => {
  const playerMoves = [];

  const makeMove = (num) => {
    playerMoves.push(Number(num));
  };

  return {
    name,
    sign,
    playerMoves,
    makeMove,
  };
};

// gameboard module
const gameBoard = (() => {
  const gameBoardDisplay = document.querySelector(".game-board");
  const textDisplay = document.querySelector(".textdisplay");

  let gameBoardArr = ["", "", "", "", "", "", "", "", ""];
  const winMove = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
  ];

  let players = [];
  let currentPlayerIndex = 0;
  let gameFinished = false;

  const hideInputBox = () => {
    const inForm = document.querySelector(".form");
    inForm.classList.add("hide");
  };

  const play = () => {
    const p1 = document.getElementById("p1").value;
    const p2 = document.getElementById("p2").value;

    players.push(Player(p1, "X"));
    players.push(Player(p2, "O"));

    hideInputBox();
    renderGameBoard();
    addEventLisnerToBox();
  };

  const checkGameStatus = () => gameFinished;

  const createGameBox = (index) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("game-box");

    newDiv.setAttribute("data-box", index);
    newDiv.innerText = gameBoardArr[index];
    gameBoardDisplay.appendChild(newDiv);
  };

  const clearDisplay = () => {
    gameBoardDisplay.replaceChildren();
  };

  const changeGameBoardArr = (index, playerSign) => {
    gameBoardArr[index] = playerSign;
  };

  const checkArr = (i) => {
    if (
      gameBoardArr[i] === players[0].sign ||
      gameBoardArr[i] === players[1].sign
    ) {
      return true;
    }
    return false;
  };

  const playMove = (el) => {
    const i_num = el.getAttribute("data-box");

    if (checkArr(i_num) || checkGameStatus()) {
      return;
    }

    changeGameBoardArr(i_num, players[currentPlayerIndex].sign);
    players[currentPlayerIndex].makeMove(i_num);
    checkWinner(players[currentPlayerIndex]);
    currentPlayerIndex = 1 - currentPlayerIndex;
    renderGameBoard();
  };

  const addEventLisnerToBox = () => {
    const gameBoardEvent = document.querySelector(".game-board");

    gameBoardEvent.addEventListener("click", (e) => {
      playMove(e.target);
    });
  };

  const renderGameBoard = () => {
    displayTurn();
    clearDisplay();
    for (let i = 0; i < gameBoardArr.length; i += 1) {
      createGameBox(i);
    }
  };

  // function for comparing two array inside object array
  const test = (arr) => {
    let result = false;
    winMove.forEach((e) => {
      const ansArr = [];
      e.forEach((ie) => {
        if (arr.includes(ie)) {
          ansArr.push(ie);
        }
      });
      if (ansArr.length === 3 && ansArr.toString() === e.toString()) {
        result = true;
      }
    });
    return result;
  };

  const resetBtn = () => {
    const reBtn = document.querySelector(".rebtn");
    reBtn.classList.remove("hide");
  };

  const displayWinner = (player) => {
    textDisplay.innerText = `${player.name} Is Winner`;

    resetBtn();
  };

  const displayDraw = () => {
    textDisplay.innerText = "GAME OVER";
    resetBtn();
  };

  const displayTurn = () => {
    if (checkGameStatus()) {
      return;
    }
    textDisplay.innerText = `${players[currentPlayerIndex].name} Turn`;
  };

  const checkWinner = (player) => {
    if (test(player.playerMoves)) {
      displayWinner(player);
      gameFinished = true;
    } else if (!gameBoardArr.includes("")) {
      displayDraw();
      gameFinished = true;
    }
  };

  const replay = () => {
    gameBoardArr = ["", "", "", "", "", "", "", "", ""];
    players = [];
    currentPlayerIndex = 0;
    gameFinished = false;
    clearDisplay();
    play();
  };

  return { play, replay };
})();

document.getElementById("playbtn").addEventListener("click", () => {
  gameBoard.play();
});

document.querySelector(".rebtn").addEventListener("click", () => {
  gameBoard.replay();
});
