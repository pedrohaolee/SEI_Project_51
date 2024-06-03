## Introduction

_Sudoku_ is a popular number puzzle game that tests logical thinking and problem-solving skills. The game consists of a 9x9 grid, which is divided into nine 3x3 subgrids, also known as regions or boxes. The objective of Sudoku is to fill the grid with numbers from 1 to 9, following these simple rules:

- Each row must contain the numbers from 1 to 9, without repetition.
- Each column must contain the numbers from 1 to 9, without repetition.
- Each of the nine 3x3 subgrids must contain the numbers from 1 to 9, without repetition.

The puzzle starts with some cells pre-filled with numbers, providing clues that guide the player towards the solution. A well-designed Sudoku puzzle has a unique solution, which can be reached through logical deduction rather than guesswork.

## Game Play

Upon starting the game, the player is prompted to select a difficulty level.
![initial screen](https://github.com/pedrohaolee/SEI_Project_51/blob/main/Project1/img/Initial%20Screen.jpg)

---

Once the level is chosen, the game begins.
![game play](https://github.com/pedrohaolee/SEI_Project_51/blob/main/Project1/img/GamePlay%20Screen.jpg)

---

If the player enters an incorrect number into the board, the cell will turn red and the mistake counter will increase by one.
![mistake](https://github.com/pedrohaolee/SEI_Project_51/blob/main/Project1/img/wrongcell.jpg)

---

Conversely, when the correct number is entered, a celebratory firework animation will display on the screen.
![firework](https://github.com/pedrohaolee/SEI_Project_51/blob/main/Project1/img/fireworks.jpg)

## Code structure explanation

The following functions ensure the proper adherence to _Sudoku_ rules and game mechanics:

`rowSafe()`,`colSafe()` and `boxSafe()` These functions verify compliance with the three fundamental _Sudoku_ rules within rows, columns, and 3x3 subgrids, respectively.

`gridSafe()` This function checks if all three Sudoku rules are satisfied across the entire grid.

`nextCell()` This function identifies the location of the next unfilled cell in the grid.

`solveSudoku()` This function generates a 9x9 matrix that adheres to all Sudoku rules, utilizing recursion and backtracking.

`startGamePlay()` This function initiates the game. It receives two parameters, `holeNum` and `timeLimit` from the event listener, which are determined by the button clicked by the player.

&copy; The Firework class was created by [Alexander Obregon](https://medium.com/@AlexanderObregon/coding-fireworks-for-the-4th-of-july-a-fun-and-simple-html-and-javascript-tutorial-c4e999831763)
