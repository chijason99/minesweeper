// the logic for the minesweeper game
const TILE_STATUS = {
  HIDDEN: "hidden",
  MINE: "mine",
  MARKED: "marked",
  NUMBER: "number",
};
export function createBoard(boardSize, numberOfMines = 2) {
  const boardAry = [];
  const minesAry = setupMines(boardSize, numberOfMines);
  for (let x = 1; x <= boardSize; x++) {
    const row = [];
    for (let y = 1; y <= boardSize; y++) {
      const element = document.createElement("div");
      const tile = {
        element,
        x,
        y,
        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          this.element.dataset.status = value;
        },
      };
      tile.status = TILE_STATUS.HIDDEN;
      if (minesAry.some(({ x, y }) => x === tile.x && y === tile.y)) {
        tile.mine = true;
      } else {
        tile.mine = false;
      }
      //takeaway : can create a function to check for position, as ary.some would return true/false
      tile.element.addEventListener("click", (e) => {
        console.log(tile.x, tile.y);
      });
      // adding the marked function for the right click

      row.push(tile);
    }
    boardAry.push(row);
  }
  return boardAry;
}

//creating mines in the board
// depending on the number of  sqr/ number of mines
function setupMines(boardSize, numberOfMines) {
  const mines = [];
  // setting up x,y location for the mine
  // the mines cannot have the same location

  while (mines.length < numberOfMines) {
    const mine = {
      x: randomCoordinate(boardSize),
      y: randomCoordinate(boardSize),
    };
    if (mines.every(({ x, y }) => x !== mine.x && y !== mine.y)) {
      mines.push(mine);
    }
  }
  return mines;
}

function randomCoordinate(boardSize) {
  if (boardSize < 2) return;
  return Math.ceil(Math.random() * (boardSize - 1));
}

export function markTile(tile) {
  switch (tile.status) {
    case TILE_STATUS.HIDDEN:
      tile.status = TILE_STATUS.MARKED;
      break;
    case TILE_STATUS.MARKED:
      tile.status = TILE_STATUS.HIDDEN;
      break;
    default:
      return;
  }
}
