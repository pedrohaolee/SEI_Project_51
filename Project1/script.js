// Define Variables
let counter = 0;
let sudokuGenerated = false;
const sudokuTable = document.querySelector("#sudokuTable");
let mistakeCounter = 0;
// const timeLimit = 10;

// Define functions used in Sudoku generation

// Generate random array from 1 to 9
function generateRandomizedArray(arrayLength) {
  const array1N = [...Array(arrayLength).keys()].map((i) => i + 1);
  const randomArray = array1N.sort((a, b) => 0.5 - Math.random());
  return randomArray;
}

// Initialize the grid with cells contain 0
function initializeGrid() {
  let Mat9x9 = [];
  for (let i = 0; i < 9; i++) {
    Mat9x9[i] = [];
    for (let j = 0; j < 9; j++) {
      Mat9x9[i][j] = 0;
    }
  }
  return Mat9x9;
}

// Check if num is in the current row
function rowSafe(inputGrid, cellPos, num) {
  return !inputGrid[cellPos[0]].includes(num);
}

// Check if num is in the current column
function colSafe(inputGrid, cellPos, num) {
  return !inputGrid.map((grid) => grid[cellPos[1]]).includes(num);
}

// Check if num is in the current 3x3 box
function boxSafe(inputGrid, cellPos, num) {
  return !inputGrid
    .slice(Math.floor(cellPos[0] / 3) * 3, Math.floor(cellPos[0] / 3) * 3 + 3)
    .map((row) =>
      row.slice(
        Math.floor(cellPos[1] / 3) * 3,
        Math.floor(cellPos[1] / 3) * 3 + 3
      )
    )
    .flat()
    .includes(num);
}

// Check if num is safe to be placed in the grid
function gridSafe(inputGrid, cellPos, num) {
  return (
    rowSafe(inputGrid, cellPos, num) &&
    colSafe(inputGrid, cellPos, num) &&
    boxSafe(inputGrid, cellPos, num)
  );
}

// Find the next unfilled cell, return the row and col position of next unfilled cell.
// If all cells are filled, the funciton will return [-1,-1]
function nextCell(inputGrid) {
  return [
    Math.floor(inputGrid.flat().indexOf(0) / 9),
    inputGrid.flat().indexOf(0) % 9,
  ];
}

// Solve Sudoku using recursion and backtracking
function solveSudoku(startingGrid) {
  const firstCellLoc = nextCell(startingGrid);
  if (firstCellLoc[0] === -1 && firstCellLoc[1] === -1) {
    // console.log("ALL FINISHED");
    sudokuGenerated = true;
    return startingGrid;
  }

  if (counter > 100000000) throw new Error("Recursion timeout");

  for (const num1 of generateRandomizedArray(9)) {
    counter++;
    if (gridSafe(startingGrid, firstCellLoc, num1)) {
      startingGrid[firstCellLoc[0]][firstCellLoc[1]] = num1;
      if (solveSudoku(startingGrid)) return startingGrid;
      startingGrid[firstCellLoc[0]][firstCellLoc[1]] = 0;
    }
  }
  return false;
}

//  Set-up the display given the input matrix by adding sudoku numbers into different cells
function initDisplay(inputMat) {
  const sudokuDisplayTable = document.querySelector("#sudokuTable");
  console.log(sudokuDisplayTable);
  for (let i = 0; i < 9; i++) {
    const newRow = document.createElement("tr");
    sudokuDisplayTable.append(newRow);
    for (let j = 0; j < 9; j++) {
      const newCell = document.createElement("td");
      newCell.innerText = inputMat[i][j];
      newCell.classList.add("sudokuCell");

      if (inputMat[i][j] === 0) {
        const newInput = document.createElement("input");
        newCell.innerText = "";
        newInput.setAttribute("type", "number");
        newInput.setAttribute(
          "onkeypress",
          "return event.charCode >= 49 && event.charCode <= 57"
        );
        newInput.classList.add("holesToSolve");
        newInput.setAttribute("id", "row" + i + "col" + j);
        newInput.style.background = "none";
        // newInput.style.fontSize = "0.4em";
        newCell.append(newInput);
      }
      newRow.append(newCell);
    }
  }
}
// Remove numbers in the generated Sudoku matrix
// The holeNum can be used to specify the level of difficulty
// e.g. for easy mode, holeNum = 5; for medium mode, holeNum = 10; for hard mode, holeNum = 20
function generatePlayBoard(inputGrid, holeNum) {
  const startingGrid = structuredClone(inputGrid);
  const holeVal = [];
  const holeIdxArray = generateRandomizedArray(81).map((d) => d - 1);
  let i = 0;
  while (holeVal.length < holeNum) {
    let rowIdx = Math.floor(holeIdxArray[i] / 9);
    let colIdx = holeIdxArray[i] % 9;
    holeVal.push({
      rowIdx: rowIdx,
      colIdx: colIdx,
      val: startingGrid[rowIdx][colIdx],
    });
    startingGrid[rowIdx][colIdx] = 0;
    i++;
  }
  return [startingGrid, holeVal];
}

// Format the time left, such as 63 seconds will appear 01:03 instead 1:3
function formatTime(timeSec) {
  let timeMin = Math.floor(timeSec / 60);
  if (timeMin < 10) {
    timeMin = `0${timeMin}`;
  }
  let leftSec = timeSec % 60;
  if (leftSec < 10) {
    leftSec = `0${leftSec}`;
  }
  return `${timeMin}:${leftSec}`;
}

// Start timer and update the screen
// If the time is less than 5 seconds, the timer will turn red
// If the time is up, an alert will display "Time is up!"
function startTimer(timeLimit) {
  let timePassed = 0;
  let myTimer = setInterval(() => {
    timePassed++;
    let timeLeft = timeLimit - timePassed;
    document.getElementById("gameTimeLeft").innerText = formatTime(timeLeft);
    if (timeLeft < 5) {
      document.getElementById("gameTimeLeft").style.color = "red";
    }
    if (timeLeft === 0) {
      alert("Time is up!!!");
      document.getElementById("gameTimeLeft").style.color = "#f5f5f5";
      clearInterval(myTimer);
    }
  }, 1000);
}

// Check if the Sudoku generation is finished
function checkSudokuGenFinish() {
  if (sudokuGenerated === false) {
    setTimeout(checkSudokuGenFinish, 100);
  }
}

function startGamePlay(holeNum, timeLimit) {
  document.getElementById("sudokuTable").innerHTML = "";
  const solvedMat = solveSudoku(initializeGrid());
  console.log(solvedMat);
  checkSudokuGenFinish();
  const [PlayBoard, holeInfo] = generatePlayBoard(solvedMat, holeNum);
  initDisplay(PlayBoard);
  startTimer(timeLimit);
  document.getElementById("mCount").innerText =
    "Mistake: " + mistakeCounter + "/3";
  sudokuTable.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      cellID = event.target.id;
      cellIDSplit = [...cellID];
      cellValue = event.target.value;
      console.log(cellID);
      // console.log(solvedMat[cellIDSplit[3]][cellIDSplit[7]]);
      if (cellValue != solvedMat[cellIDSplit[3]][cellIDSplit[7]]) {
        mistakeCounter++;
        document.getElementById(cellID).style.backgroundColor = "red";
        document.getElementById("mCount").innerText =
          "Mistake: " + mistakeCounter + "/3";
        // console.log(document.getElementById("mCount"));
        if (mistakeCounter >= 3) alert("three strikes, you are out! ");
      }
      if (cellValue == solvedMat[cellIDSplit[3]][cellIDSplit[7]]) {
        document.getElementById(cellID).style.background = "none";
        animate();
      }
    }
  });
}

// Below is the Fireworks animation from Alexander Obregon
// https://medium.com/@AlexanderObregon/coding-fireworks-for-the-4th-of-july-a-fun-and-simple-html-and-javascript-tutorial-c4e999831763
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
// console.log(ctx);
canvas.width = 300;
canvas.height = 400;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = {
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8,
    };
    this.alpha = 1;
    this.friction = 0.99;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = { x: 0, y: Math.random() * -2.5 - 0.5 };
    this.particles = [];
    this.lifespan = 180;
    this.hasExploded = false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  explode() {
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color));
    }
  }

  update() {
    this.lifespan--;

    if (this.lifespan <= 0 && !this.hasExploded) {
      this.explode();
      this.velocity = { x: 0, y: 0 };
      this.hasExploded = true;
    } else if (this.lifespan > 0) {
      this.y += this.velocity.y;
    }

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();
    }
  }
}

let fireworks = [];

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(256, 256, 256, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();

    if (
      firework.lifespan <= 0 &&
      firework.particles.every((p) => p.alpha <= 0)
    ) {
      fireworks.splice(index, 1);
    }
  });

  if (Math.random() < 0.015) {
    const x = Math.random() * canvas.width;
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    fireworks.push(new Firework(x, canvas.height, color));
  }
}
