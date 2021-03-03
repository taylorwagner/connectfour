/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
let gameIsRunning = true;

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for(let y = 0; y < HEIGHT; y++){
      board.push(Array.from({length: WIDTH}));
    }
  }

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  const top = document.createElement("tr"); //creating a table row
  top.setAttribute("id", "column-top"); //giving the new table row an id of "column-top"
  top.addEventListener("click", handleClick); //giving the row an event listener for a click with a callback function of handleClick

  for (let x = 0; x < WIDTH; x++) { //setting the row length to the same number as the width variable
    const headCell = document.createElement("td"); //creating table data cell
    headCell.setAttribute("id", x); //giving the new table data cell an id of "x"
    top.append(headCell); //adding the table data cell to the #column-top row
  }
  htmlBoard.append(top); //adding the top variable (table row) to the board

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { //setting the column length to the same number as the height variable
    const row = document.createElement("tr"); //creating a table row
    for (let x = 0; x < WIDTH; x++) { //make the cells for the amount of width variable
      const cell = document.createElement("td"); //creating the individual cells for the table
      cell.setAttribute("id", `${y}-${x}`); //giving the individual cells an id of "${y}-${x}"
      row.append(cell); //adding the individual cells to each row
    }
    htmlBoard.append(row); //adding the rows to the board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT - 1; y >= 0; y--){
    if(!board[y][x]){
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const intendedCell = document.getElementById(`${y}-${x}`); //y is the row, x is the column
  intendedCell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  setTimeout(function(){
  alert(msg);
  }, 200);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  if(gameIsRunning === false){
    return;
  }

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(checkForTie()){
    return endGame("It's a tie!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  switchCurrPlayer();
}

function checkForTie(){
  return board.every(row=>row.every(intendedCell => intendedCell));
}

function switchCurrPlayer(){
  return currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
