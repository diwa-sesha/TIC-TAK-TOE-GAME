let main = document.getElementById("mainD");
let mainDiv = document.getElementById("divButton");
let pvpButton = document.getElementById("pvpButton");
let pvbButton = document.getElementById("pvbButton");
let hDiv = document.getElementById("headingDiv");
let head = document.getElementById("heading");
let xBut = document.getElementById("xButton");
let oBut = document.getElementById("oButton");
let gall = document.getElementById("gal");
let rmBut = document.getElementById("rmButton");
let reset = document.getElementById("resetButton");
let mainMenuButton = document.getElementById("mainmenuButton");

// Symbols for display
let X = '<img src="./assets_02/wrong.png" width="80" height="80">';
let O = '<img src="./assets_02/circle.png" width="80" height="80">';
let X_VAL = "X";
let O_VAL = "O";

let currentPlayer;
let cells = [];
let board = [];
let gameMode = ""; // Track PvP or PvB

// Initial style
main.style.display = "grid";
main.style.gridTemplateColumns = "repeat(3, 100px)";
main.style.gridTemplateRows = "repeat(3, 100px)";
main.style.gap = "5px";
main.style.justifyContent = "center";
main.style.position = "absolute";
main.style.top = "100px";
main.style.left = "100px";

// PvP Button logic
pvpButton.addEventListener("click", function () {
  mainDiv.style.display = "none";
  hDiv.style.display = "flex";
  head.style.display = "unset";
  gall.style.display = "none";
  gameMode = "pvp";
});

// X and O selection (PvP)
xBut.addEventListener("click", function () {
  hDiv.style.display = "none";
  gall.style.display = "none";
  head.style.display = "none";
  rmBut.style.display = "unset";
  main.style.display = "grid";
  currentPlayer = X;
  gameMode = "pvp";
  gridBox();
});

oBut.addEventListener("click", function () {
  hDiv.style.display = "none";
  gall.style.display = "none";
  head.style.display = "none";
  rmBut.style.display = "unset";
  main.style.display = "grid";
  currentPlayer = O;
  gameMode = "pvp";
  gridBox();
});

// PvB Button logic
pvbButton.addEventListener("click", function () {
  mainDiv.style.display = "none";
  hDiv.style.display = "none";
  head.style.display = "none";
  gall.style.display = "none";
  rmBut.style.display = "flex";
  gameMode = "pvb";
  currentPlayer = X_VAL;
  board = Array(9).fill("");
  gridBoxPvB();
});

// Create PvP Grid
function gridBox() {
  main.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    let gridButton = document.createElement("button");

    gridButton.style.borderRadius = "10px";
    gridButton.style.fontSize = "24px";
    gridButton.style.width = "100px";
    gridButton.style.height = "100px";
    gridButton.style.zIndex = "3";
    gridButton.style.background = "linear-gradient(135deg,rgba(105, 0, 203, 0.78),rgb(60, 145, 188), #24c6dc,rgb(121, 56, 181))";
    gridButton.style.border = "none";
    gridButton.style.color = "#fff";
    gridButton.style.boxShadow = "10px 10px 4px rgba(0, 5, 91, 0.3)";
    gridButton.style.transition = "0.1s";

    gridButton.addEventListener("mouseover", () => {
      gridButton.style.transform = "scale(1.05)";
      gridButton.style.boxShadow = "0 0 20px #00f2fe, 0 0 40px #00f2fe";
      gridButton.style.cursor = "pointer";
    });

    gridButton.addEventListener("mouseout", () => {
      gridButton.style.transform = "scale(1)";
      gridButton.style.boxShadow = "0 0 15px #00f2fe, 0 0 30px #00f2fe";
    });

    gridButton.addEventListener("click", function () {
      gridButton.innerHTML = currentPlayer;
      gridButton.disabled = true;
      gridButton.style.background = "transparent";
      gridButton.style.boxShadow = (currentPlayer === X)
        ? "0 0 20px rgb(110, 255, 182), 0 0 40px #ff6ec4"
        : "0 0 20px rgb(140, 0, 254), 0 0 40px #00f2fe";

      if (win()) {
        disable();
        setTimeout(() => alert((currentPlayer === X ? "X" : "O") + " wins!"), 300);
      } else if (draw()) {
        setTimeout(() => alert("Match Draw!"), 300);
      } else {
        currentPlayer = currentPlayer === X ? O : X;
      }
    });

    cells.push(gridButton);
    main.appendChild(gridButton);
  }
}

// Create PvB Grid
function gridBoxPvB() {
  main.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    let gridButtonPvB = document.createElement("button");
    gridButtonPvB.style.width = "100px";
    gridButtonPvB.style.height = "100px";
    gridButtonPvB.style.borderRadius = "10px";
    gridButtonPvB.style.background = "linear-gradient(135deg,rgba(105, 0, 203, 0.78),#24c6dc)";
    gridButtonPvB.addEventListener("click", () => playerMove(i, gridButtonPvB));
    main.appendChild(gridButtonPvB);
    cells.push(gridButtonPvB);
  }
}

// PvP Win Logic
function win() {
  let winComb = [
    [0, 1, 2], [2, 5, 8], [8, 7, 6], [6, 3, 0],
    [0, 4, 8], [2, 4, 6], [3, 4, 5], [1, 4, 7]
  ];
  return winComb.some(([a, b, c]) =>
    cells[a].innerHTML === currentPlayer &&
    cells[b].innerHTML === currentPlayer &&
    cells[c].innerHTML === currentPlayer
  );
}

function draw() {
  return cells.every(cell => cell.innerHTML !== "");
}

function disable() {
  cells.forEach(cell => (cell.disabled = true));
}

// Player move (PvB)
function playerMove(index, button) {
  if (board[index] === "" && currentPlayer === X_VAL) {
    board[index] = X_VAL;
    button.innerHTML = X;
    button.disabled = true;

    if (checkWinner(X_VAL)) {
      setTimeout(() => alert("Player wins!"), 300);
      return;
    }

    if (board.every(c => c !== "")) {
      setTimeout(() => alert("Draw!"), 300);
      return;
    }

    currentPlayer = O_VAL;
    setTimeout(botMove, 300);
  }
}

// Bot Move
function botMove() {
  let move = getSmartMove();
  board[move] = O_VAL;
  cells[move].innerHTML = O;
  cells[move].disabled = true;

  if (checkWinner(O_VAL)) {
    setTimeout(() => alert("Bot wins!"), 300);
    return;
  }

  if (board.every(c => c !== "")) {
    setTimeout(() => alert("Draw!"), 300);
    return;
  }

  currentPlayer = X_VAL;
}

// Bot AI
function getSmartMove() {
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = O_VAL;
      if (checkWinner(O_VAL)) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }
  }

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = X_VAL;
      if (checkWinner(X_VAL)) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }
  }

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") return i;
  }

  return -1;
}

// Check win for PvB
function checkWinner(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

// Reset button logic
reset.addEventListener("click", function () {
  cells.forEach(cell => cell.remove());
  cells = [];
  main.innerHTML = "";

  if (gameMode === "pvp") {
    currentPlayer = X;
    gridBox();
  } else if (gameMode === "pvb") {
    board = Array(9).fill("");
    currentPlayer = X_VAL;
    gridBoxPvB();
  }
});

// Main Menu Button
mainMenuButton.addEventListener("click", function () {
  cells.forEach(cell => cell.remove());
  cells = [];
  main.innerHTML = "";
  rmBut.style.display = "none";
  mainDiv.style.display = "flex";
  hDiv.style.display = "none";
  head.style.display = "none";
  gall.style.display = "block";
  gameMode = "";
});
