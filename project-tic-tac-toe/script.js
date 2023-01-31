const gameBoardDisplay = document.querySelector(".game-board");
const winMove = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [2, 4, 8],
];
// gameboard module
const gameBoard = (() => {
  const gameBoardArr = ["", "", "", "", "", "", "", "", ""];
  let turn = "p1";

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
    if (gameBoardArr[i] === "X" || gameBoardArr[i] === "O") {
      return true;
    }
  };

  const play = (el) => {
    let i_num = el.getAttribute("data-box");
    if (checkArr(i_num)) {return}  

    if (turn === "p1") {
      changeGameBoardArr(i_num, player1.sign);
      player1.makeMove(i_num);
      turn = "p2";
    } else {
      changeGameBoardArr(i_num, player2.sign);
      player2.makeMove(i_num);
      turn = "p1";
    }
  };

  const addEventLisnerToBox = () => {
    const gameBox = document.querySelectorAll(".game-box");
    gameBox.forEach((e) =>
      e.addEventListener(
        "click",
        () => {
          play(e);
        }
        // () => {
        //   let i_num = e.getAttribute("data-box");
        //   e.classList.add("used");
        //   if (turn === "p1") {
        //     changeGameBoardArr(i_num, player1.sign);
        //     player1.makeMove(i_num);
        //     turn = "p2";
        //   } else {
        //     changeGameBoardArr(i_num, player2.sign);
        //     player2.makeMove(i_num);
        //     turn = "p1";
        //   }
        // }
      )
    );
  };

  const renderGameBoard = () => {
    clearDisplay();
    for (let i = 0; i < gameBoardArr.length; i += 1) {
      createGameBox(i);
    }
    addEventLisnerToBox();
  };

  return { renderGameBoard };
})();

const Player = (name, sign) => {
  let playerMoves = [];

  const makeMove = (num) => {
    playerMoves.push(num);
    gameBoard.renderGameBoard();
    console.log(`${name} : ${playerMoves}`);
  };

  return {
    name,
    sign,
    playerMoves,
    makeMove,
  };
};

const player1 = Player("vrutik", "X");
const player2 = Player("priyanshu", "O");

gameBoard.renderGameBoard();
