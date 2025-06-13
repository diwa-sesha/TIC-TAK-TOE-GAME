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
  hDiv.style.display = "unset";
  hDiv.style.display = "flex";
  head.style.display = "unset";
  head.style.textAlign = "center";
  head.style.grid = "none";
  gall.style.display = "none";
});

//x and o image path
let X = '<img src="./assets_02/wrong.png" width="80" height="80">';
let O = '<img src="./assets_02/circle.png" width="80" height="80">';

// x and o button events
xBut.addEventListener("click", function () {
  hDiv.style.display = "none";
  gall.style.display = "none";
  head.style.display = "none";
  rmBut.style.display = "unset";
  currentPlayer = X;
  gridBox();
});

oBut.addEventListener("click", function () {
  hDiv.style.display = "none";
  gall.style.display = "none";
  head.style.display = "none";
  rmBut.style.display = "unset";
  currentPlayer = O;
  gridBox();
});

// Create function for x and o button
let currentPlayer;
let cells = [];
function gridBox() {
  for (let index = 0; index < 9; index++) {
    let gridButton = document.createElement("button");

    //gridbutton style
    gridButton.style.borderRadius = "10px";
    gridButton.style.fontSize = "24px";
    gridButton.style.width = "100px";
    gridButton.style.height = "100px";
    gridButton.style.zIndex = "3";

    gridButton.style.background =
      "linear-gradient(135deg,rgba(105, 0, 203, 0.78),rgb(60, 145, 188), #24c6dc,rgb(121, 56, 181))";
    gridButton.style.border = "none";
    gridButton.style.color = "#fff";
    gridButton.style.boxShadow = "0 0 10pxrgb(224, 112, 241), 0 0 10px #00f2fe";
    gridButton.style.transition = "all 0.3s ease-in-out";

    gridButton.style.boxShadow = "10px 10px 4px rgba(0, 5, 91, 0.3)";
    gridButton.style.transition = "0.1s";

    //mouse hover event
    gridButton.addEventListener("mouseover", () => {
      gridButton.style.transform = "scale(1.05)";
      gridButton.style.boxShadow = "0 0 20px #00f2fe, 0 0 40px #00f2fe";
      gridButton.style.cursor = "pointer";
    });

    gridButton.addEventListener("mouseout", () => {
      gridButton.style.transform = "scale(1)";
      gridButton.style.boxShadow = "0 0 15px #00f2fe, 0 0 30px #00f2fe";
    });

    //function for click event in grid button
    gridButton.addEventListener("click", function () {
      gridButton.innerHTML = currentPlayer;
      gridButton.disabled = true;
      // Make the background transparent after click
      gridButton.style.background = "transparent";

      // Optional: remove border if you want it fully clean
      // gridButton.style.border = "none";
      if (currentPlayer === X) {
        gridButton.style.boxShadow =
          "0 0 20px rgb(110, 255, 182), 0 0 40px #ff6ec4"; // pink
      } else {
        gridButton.style.boxShadow =
          "0 0 20px rgb(140, 0, 254), 0 0 40px #00f2fe"; // blue
      }

      if (win()) {
        disable();
        setTimeout(() => {
          let winner = currentPlayer == X ? "X" : "O";
          alert(winner + " wins!");
        }, 500);
      } else if (draw()) {
        setTimeout(() => {
          alert("Match Draw!");
        }, 500);
      } else {
        currentPlayer = currentPlayer === X ? O : X; // this should only run if no win/draw
      }
    });

    cells.push(gridButton);
    main.appendChild(gridButton);
  }
}

// Win logic
function win() {
  let winingCombination = [
    [0, 1, 2],
    [2, 5, 8],
    [8, 7, 6],
    [6, 3, 0],
    [0, 4, 8],
    [2, 4, 6],
    [3, 4, 5],
    [1, 4, 7],
  ];
  return winingCombination.some(([a, b, c]) => {
    return (
      cells[a].innerHTML === currentPlayer &&
      cells[b].innerHTML === currentPlayer &&
      cells[c].innerHTML === currentPlayer
    );
  });
}

// Draw logic
function draw() {
  return cells.every((cell) => cell.innerHTML !== "");
}

// Disable all cells
function disable() {
  cells.forEach((cell) => (cell.disabled = true));
}

//function for reset
reset.addEventListener("click", function () {
  // Clear the game board
  cells.forEach((cell) => {
    cell.remove(); // Remove all buttons
  });

  // Clear the cell list
  cells = [];

  // Restart the grid
  gridBox();
});

//function for main menu
mainMenuButton.addEventListener("click", function () {
  // Clear the game board
  cells.forEach((cell) => cell.remove());
  cells = [];

  // Hide game UI
  main.style.display = "grid"; // or none if you're hiding it
  rmBut.style.display = "none";

  // Show initial UI
  mainDiv.style.display = "flex"; // PvP/PvB buttons
  hDiv.style.display = "none";
  head.style.display = "none";
  gall.style.display = "block";
});
