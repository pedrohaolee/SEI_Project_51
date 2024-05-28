// Generate random array from 1 to 9
function generateRandomizedArray() {
  const array19 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const randomArray = array19.sort((a, b) => 0.5 - Math.random());
  return randomArray;
}

// Initialize the grid with 3 diagonal 3x3 matrices filled, the remaining cells contain 0
function InitializeGrid() {
  let Mat9x9 = [];
  for (i = 0; i < 9; i++) {
    Mat9x9[i] = [];
    for (j = 0; j < 9; j++) {
      Mat9x9[i][j] = 0;
    }
  }

  ranArray1 = generateRandomizedArray();
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      Mat9x9[i][j] = ranArray1[i * 3 + j];
    }
  }

  ranArray2 = generateRandomizedArray();
  for (i = 3; i < 6; i++) {
    for (j = 3; j < 6; j++) {
      Mat9x9[i][j] = ranArray2[(i - 3) * 3 + (j - 3)];
    }
  }

  ranArray3 = generateRandomizedArray();
  for (i = 6; i < 9; i++) {
    for (j = 6; j < 9; j++) {
      Mat9x9[i][j] = ranArray3[(i - 6) * 3 + (j - 6)];
    }
  }
  return Mat9x9;
}

testMat = [
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
