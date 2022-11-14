// the logic for the minesweeper game

export const TILE_STATUS = {
  HIDDEN: "hidden",
  MINE: "mine",
  MARKED: "marked",
  NUMBER: "number",
};
export function createBoard(boardSize, numberOfMines = 2) {
  const boardAry = [];
  const minesAry = setupMines(boardSize, numberOfMines);
  for (let y = boardSize; y >= 1; y--) {
    const row = [];
    for (let x = 1; x <= boardSize; x++) {
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
      checkMinePosition(minesAry, tile);
      //takeaway : can create a function to check for position, as ary.some would return true/false
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
    if (mines.every(({ x, y }) => x !== mine.x || y !== mine.y)) {
      //key takeaway: if using &&, it means that every x and u should be unique, which only gives at most 9 coordinates
      mines.push(mine);
    }
  }
  return mines;
}

function randomCoordinate(boardSize) {
  if (boardSize < 2) return;
  return Math.ceil(Math.random() * (boardSize - 1));
}
function checkMinePosition(mineAry, tile) {
  if (mineAry.some(({ x, y }) => x === tile.x && y === tile.y)) {
    tile.mine = true;
  } else {
    tile.mine = false;
  }
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

export function revealTile(board, tile) {
  // case : if the tile is a mine
  if (tile.status !== TILE_STATUS.HIDDEN) return;
  if (tile.mine) {
    // show the mine, end the game
    tile.status = TILE_STATUS.MINE;
    return;
  }
  // show how many mines are inside the 8 sqrs nearby
  const tilesAround = getTilesAround(tile, board).filter((t) => t != undefined);
  tile.status = TILE_STATUS.NUMBER;
  const minesNearby = tilesAround.filter((t) => t.mine === true).length;
  if(minesNearby === 0){
    tilesAround.forEach(revealTile.bind(null,board))
    // key takeaway: using the recursive function to do repeat work, using bind to auto bind the parameters
  }else{
    tile.element.innerText = minesNearby;
  }
}
function getTilesAround(tile, board) {
  const tilesAround = [];
  const { x, y } = tile;
  const topTile = getSingleTile(board, x, y + 1);
  const bottomTile = getSingleTile(board, x, y - 1);
  const leftTile = getSingleTile(board, x - 1, y);
  const rightTile = getSingleTile(board, x + 1, y);
  const topLeftTile = getSingleTile(board, x - 1, y + 1);
  const topRightTile = getSingleTile(board, x + 1, y + 1);
  const bottomLeftTile = getSingleTile(board, x - 1, y - 1);
  const bottomRightTile = getSingleTile(board, x + 1, y - 1);
  tilesAround.push(
    topTile,
    bottomTile,
    leftTile,
    rightTile,
    topLeftTile,
    topRightTile,
    bottomLeftTile,
    bottomRightTile
  );
  return tilesAround;
}

function getSingleTile(board, x, y) {
  return board[10 - y]?.find((t) => t.x === x);
  // using the option chaining
}

export function checkWin(board){
  return board.every(row => {
    return row.every(tile => {
      return (tile.status === TILE_STATUS.NUMBER) || (tile.mine && ((tile.status === TILE_STATUS.HIDDEN) || (tile.status === TILE_STATUS.MARKED) ) ) 
    })
  })
}

export function checkLose(board){
  return board.some(row => {
    return row.some(tile => tile.status === TILE_STATUS.MINE)
  })
}
