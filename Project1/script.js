// Generate random array from 1 to 9
function generateRandomizedArray() {
  const array19 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const randomArray = array19.sort((a, b) => 0.5 - Math.random());
  return randomArray;
}

// Initialize the grid with 3 diagonal 3x3 matrices filled, the remaining cells contain 0
function initializeGrid() {
  let Mat9x9 = [];
  for (i = 0; i < 9; i++) {
    Mat9x9[i] = [];
    for (j = 0; j < 9; j++) {
      Mat9x9[i][j] = 0;
    }
  }

  //   ranArray1 = generateRandomizedArray();
  //   for (i = 0; i < 3; i++) {
  //     for (j = 0; j < 3; j++) {
  //       Mat9x9[i][j] = ranArray1[i * 3 + j];
  //     }
  //   }

  //   ranArray2 = generateRandomizedArray();
  //   for (i = 3; i < 6; i++) {
  //     for (j = 3; j < 6; j++) {
  //       Mat9x9[i][j] = ranArray2[(i - 3) * 3 + (j - 3)];
  //     }
  //   }

  //   ranArray3 = generateRandomizedArray();
  //   for (i = 6; i < 9; i++) {
  //     for (j = 6; j < 9; j++) {
  //       Mat9x9[i][j] = ranArray3[(i - 6) * 3 + (j - 6)];
  //     }
  //   }
  return Mat9x9;
}

const testMat1 = [
  [5, 7, 1, 0, 0, 0, 0, 0, 0],
  [6, 3, 9, 0, 0, 0, 0, 0, 0],
  [2, 8, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 7, 2, 0, 0, 0],
  [0, 0, 0, 6, 9, 5, 0, 0, 0],
  [0, 0, 0, 8, 3, 4, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 7, 1, 6],
  [0, 0, 0, 0, 0, 0, 2, 5, 9],
  [0, 0, 0, 0, 0, 0, 3, 4, 8],
];

const testMat2 = [
  [5, 7, 1, 3, 4, 8, 6, 9, 2],
  [6, 3, 9, 0, 0, 0, 0, 0, 0],
  [2, 8, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 7, 2, 0, 0, 0],
  [0, 0, 0, 6, 9, 5, 0, 0, 0],
  [0, 0, 0, 8, 3, 4, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 7, 1, 6],
  [0, 0, 0, 0, 0, 0, 2, 5, 9],
  [0, 0, 0, 0, 0, 0, 3, 4, 8],
];

const testMat3 = [
  [5, 7, 1, 3, 4, 8, 6, 9, 2],
  [6, 3, 9, 3, 4, 8, 6, 9, 2],
  [2, 8, 4, 3, 4, 8, 6, 9, 2],
  [0, 0, 0, 1, 7, 2, 0, 0, 0],
  [0, 0, 0, 6, 9, 5, 0, 0, 0],
  [0, 0, 0, 8, 3, 4, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 7, 1, 6],
  [0, 0, 0, 0, 0, 0, 2, 5, 9],
  [0, 0, 0, 0, 0, 0, 3, 4, 8],
];

const testMat4 = [
  [5, 7, 1, 3, 4, 8, 6, 9, 2],
  [6, 3, 9, 3, 4, 8, 6, 9, 2],
  [2, 8, 4, 3, 4, 8, 6, 9, 2],
  [2, 8, 4, 3, 4, 8, 6, 9, 2],
  [2, 8, 4, 3, 4, 8, 6, 9, 2],
  [2, 8, 4, 3, 4, 8, 6, 9, 2],
  [2, 8, 4, 3, 4, 8, 6, 9, 2],
  [2, 8, 4, 3, 4, 8, 6, 9, 2],
  [2, 8, 4, 3, 4, 8, 6, 9, 2],
];
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
let counter = 0;
let sudokuGenerated = false;

function solveSudoku(startingGrid) {
  //   return nextCell(startingGrid) == "[-1, -1]" ? true : false;
  const firstCellLoc = nextCell(startingGrid);
  if (firstCellLoc[0] === -1 && firstCellLoc[1] === -1) {
    console.log("ALL FINISHED");
    sudokuGenerated = true;
    return startingGrid;
  }

  if (counter > 100000000) throw new Error("Recursion timeout");
  //   //   if (firstCellLos == [-1, -1]) return startingGrid;

  for (num1 of generateRandomizedArray()) {
    // console.log("counter = " + counter + " num = " + num1);
    counter++;
    if (gridSafe(startingGrid, firstCellLoc, num1)) {
      startingGrid[firstCellLoc[0]][firstCellLoc[1]] = num1;
      if (solveSudoku(startingGrid)) return startingGrid;
      startingGrid[firstCellLoc[0]][firstCellLoc[1]] = 0;
    }
  }
  return false;
}

// console.log(solveSudoku(initializeGrid()));

// const solvedMat = solveSudoku(initializeGrid());

function initDisplay(inputMat) {
  const sudokuDisplayTable = document.querySelector("#sudokuTable");
  console.log(sudokuDisplayTable);
  for (i = 0; i < 9; i++) {
    const newRow = document.createElement("tr");
    sudokuDisplayTable.append(newRow);
    for (j = 0; j < 9; j++) {
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
        // newInput.setAttribute(max, 9);
        // newInput.setAttribute(max, 9);
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

function generatePlayBoard(inputGrid, holeNum) {
  const startingGrid = structuredClone(inputGrid);
  const holeVal = [];
  const rowIdxArray = generateRandomizedArray();
  const colIdxArray = generateRandomizedArray();
  let i = 0;
  while (holeVal.length < holeNum) {
    holeVal.push({
      rowIdx: rowIdxArray[i],
      colIdx: colIdxArray[i],
      val: startingGrid[rowIdxArray[i]][colIdxArray[i]],
    });
    startingGrid[rowIdxArray[i]][colIdxArray[i]] = 0;
    i++;
  }
  return [startingGrid, holeVal];
}

// const [PlayBoard, holeInfo] = generatePlayBoard(solvedMat, 5);
// console.log(holeInfo);
// console.log(PlayBoard);

// initDisplay(PlayBoard);

// const sudokuTable = document.querySelector("#sudokuTable");
// let mistakeCounter = 0;
// sudokuTable.addEventListener("keyup", (event) => {
//   cellID = event.target.id;
//   cellIDSplit = [...cellID];
//   cellValue = event.target.value;
//   console.log(solvedMat[cellIDSplit[3]][cellIDSplit[7]]);
//   if (cellValue != solvedMat[cellIDSplit[3]][cellIDSplit[7]]) {
//     mistakeCounter++;
//     document.getElementById(cellID).style.backgroundColor = "red";
//     document.getElementById("mCount").innerText =
//       "Mistake: " + mistakeCounter + "/3";
//     // console.log(document.getElementById("mCount"));
//     if (mistakeCounter >= 3) alert("three strikes, you are out! ");
//   }
//   if (cellValue == solvedMat[cellIDSplit[3]][cellIDSplit[7]]) {
//     document.getElementById(cellID).style.background = "none";
//   }
// });

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
timeLimit = 10;
const solvedMat = solveSudoku(initializeGrid());

function startTimer(timeLimit) {
  let timePassed = 0;
  let myTimer = setInterval(() => {
    timePassed++;
    let timeLeft = timeLimit - timePassed;
    document.getElementById("gameTimeLeft").innerText = formatTime(timeLeft);
    // let dashArray = `${timeLeft} ${timeLimit}`;
    // document
    //   .getElementById("timerCircle")
    //   .setAttribute("stroke-dasharray", dashArray);
    // console.log(dashArray);
    if (timeLeft < 5) {
      document.getElementById("gameTimeLeft").style.color = "red";
    }
    if (timeLeft === 0) {
      alert("Time is up!!!");
      clearInterval(myTimer);
    }
  }, 1000);
}

function checkSudokuGenFinish() {
  if (sudokuGenerated === false) {
    setTimeout(checkSudokuGenFinish, 100);
  }
}

function startGamePlay(holeNum) {
  checkSudokuGenFinish();
  // const [PlayBoard, holeInfo] = generatePlayBoard(solvedMat, 30);
  document.getElementById("playfield").innerHTML =
    '<table id="sudokuTable"></table><footer id="mCount">Mistake: 0/3</footer><footer id="gameTimeLeft"></footer>;';
  // initDisplay(PlayBoard);

  startTimer(timeLimit);
  // console.log(holeNum);

  // const sudokuTable = document.querySelector("#sudokuTable");
  // let mistakeCounter = 0;
  // sudokuTable.addEventListener("keyup", (event) => {
  //   cellID = event.target.id;
  //   cellIDSplit = [...cellID];
  //   cellValue = event.target.value;
  //   console.log(solvedMat[cellIDSplit[3]][cellIDSplit[7]]);
  //   if (cellValue != solvedMat[cellIDSplit[3]][cellIDSplit[7]]) {
  //     mistakeCounter++;
  //     document.getElementById(cellID).style.backgroundColor = "red";
  //     document.getElementById("mCount").innerText =
  //       "Mistake: " + mistakeCounter + "/3";
  //     // console.log(document.getElementById("mCount"));
  //     if (mistakeCounter >= 3) alert("three strikes, you are out! ");
  //   }
  //   if (cellValue == solvedMat[cellIDSplit[3]][cellIDSplit[7]]) {
  //     document.getElementById(cellID).style.background = "none";
  //   }
  // });
}
console.log(solvedMat);

console.log(formatTime(39));

// const a1 = "row4col4";
// const b1 = [...a1];
// console.log(b1[3], b1[7]);
// console.log(holeInfo);
// initDisplay(PlayBoard, holeInfo);

// initDisplay(testMat1);

// console.log(sudokuDisplayTable);
// addToDisplay(testMat1);
// newDiv.innerText = sudokuMat;
// document.querySelector("");
// console.log();

// console.log(solveSudoku(InitializeGrid()));

// console.log(counter);
// console.log(solveSudoku(testMat2));
// console.log(solveSudoku(testMat3));
// console.log(solveSudoku(testMat4));

// console.log(testMat1.length());
