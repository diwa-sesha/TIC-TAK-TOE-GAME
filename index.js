let mainDiv = document.getElementById("divButton");
let pvpButton = document.getElementById("pvpButton");
let pvbButton = document.getElementById("pvbButton");
let currentPlayer;
let cells = [];

// Initial style
mainDiv.style.display = "grid";
mainDiv.style.gridTemplateColumns = "repeat(3, 100px)";
mainDiv.style.gridTemplateRows = "repeat(3, 100px)";
mainDiv.style.gap = "5px";
mainDiv.style.justifyContent = "center";

// Remove mode buttons
function remove() {
  pvbButton.remove();
  pvpButton.remove();
}

// PvP Button logic
pvpButton.addEventListener("click", function () {
  let headingText = document.createElement("h2");
  headingText.innerText = "Select Your Symbol";
  mainDiv.appendChild(headingText);
  headingText.style.color="red";
  headingText.style.grid="none";
  headingText.style.textAlign="center";
  remove();
  


  // Create X and O buttons
  let xButton = document.createElement("button");
  xButton.innerText = "X";
  xButton.style.position="relative";
    xButton.style.top="200px";

  mainDiv.appendChild(xButton);

  let oButton = document.createElement("button");
  oButton.innerText = "O";
   oButton.style.position="relative";
    oButton.style.top="200px";
  mainDiv.appendChild(oButton);

  xButton.addEventListener("click", function () {
    currentPlayer = "X";
    headingText.remove();
    xButton.remove();
    oButton.remove();
    gridBox();
  });

  oButton.addEventListener("click", function () {
    currentPlayer = "O";
    headingText.remove();
    xButton.remove();
    oButton.remove();
    gridBox();
  });
});

// Create grid
function gridBox() {
  // Clear old cells
  mainDiv.innerHTML = "";
  cells = [];

  for (let index = 0; index < 9; index++) {
    let gridButton = document.createElement("button");
    gridButton.style.borderRadius = "10px";
    gridButton.style.fontSize = "24px";
    gridButton.style.width = "100px";
    gridButton.style.height = "100px";

    gridButton.addEventListener("click", function () {
      gridButton.innerText = currentPlayer;
      gridButton.disabled = true;

      if (win()) {
        disable();
        setTimeout(() => {
          alert(currentPlayer + " wins!");
        }, 500);
      } else if (draw()) {
        setTimeout(() => {
          alert("Match Draw!");
        }, 500);
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // this should only run if no win/draw
      }
    });

    cells.push(gridButton);
    mainDiv.appendChild(gridButton);
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
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    );
  });
}

// Draw logic
function draw() {
  return cells.every((cell) => cell.textContent !== "");
}

// Disable all cells
function disable() {
  cells.forEach((cell) => (cell.disabled = true));
}
