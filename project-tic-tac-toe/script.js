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

const Player = (name, sign) => {
  const playerMoves = [];

  const makeMove = (num) => {
    playerMoves.push(Number(num));
    console.log(`${name} : ${playerMoves}`);
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

  let turn = "p1";
  let player1;
  let player2;
  let gameFinished = false;

  const play = () => {
    const inForm = document.querySelector(".form");

    const p1 = document.getElementById("p1").value;
    const p2 = document.getElementById("p2").value;

    player1 = Player(p1, "X");
    player2 = Player(p2, "O");

    inForm.classList.add("hide");

    renderGameBoard();
  };

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
    console.log(gameBoardArr);
  };

  const checkArr = (i) => {
    if (gameBoardArr[i] === player1.sign || gameBoardArr[i] === player2.sign) {
      return true;
    }
    return false;
  };

  const playMove = (el) => {
    const i_num = el.getAttribute("data-box");
    if (checkArr(i_num)) {
      return;
    }

    if (turn === "p1") {
      changeGameBoardArr(i_num, player1.sign);
      player1.makeMove(i_num);
      checkWinner(player1);
      renderGameBoard();
      turn = "p2";
      displayTurn();
    } else if (turn === "p2") {
      changeGameBoardArr(i_num, player2.sign);
      player2.makeMove(i_num);
      checkWinner(player2);
      renderGameBoard();
      turn = "p1";
      displayTurn();
    }
  };

  const addEventLisnerToBox = () => {
    const gameBox = document.querySelectorAll(".game-box");

    if (gameFinished) {
      return;
    }

    gameBox.forEach((e) =>
      e.addEventListener("click", () => {
        playMove(e);
      })
    );
  };

  const renderGameBoard = () => {
    displayTurn();
    clearDisplay();
    for (let i = 0; i < gameBoardArr.length; i += 1) {
      createGameBox(i);
    }
    addEventLisnerToBox();
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

  const displayTurn = (player) => {
    if (gameFinished) {
      return;
    }

    if (turn === "p1") {
      textDisplay.innerText = `${player1.name} TuRn`;
    } else if (turn === "p2") {
      textDisplay.innerText = `${player2.name} TuRn`;
    }
  };

  const checkWinner = (player) => {
    console.log(player.playerMoves);
    if (test(player.playerMoves)) {
      displayWinner(player);
      gameFinished = true;
    } else if (!gameBoardArr.includes("")) {
      displayDraw();
      gameFinished = true;
    }
  };

  const replay = () => {
    turn = "p1";
    gameBoardArr = ["", "", "", "", "", "", "", "", ""];
    gameFinished = false;
    clearDisplay();
    play();
  };

  return { play, replay, gameBoardArr };
})();

document.getElementById("playbtn").addEventListener("click", () => {
  gameBoard.play();
});

document.querySelector(".rebtn").addEventListener("click", () => {
  gameBoard.replay();
});
