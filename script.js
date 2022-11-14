// the ui/design of the game
import {
  checkLose,
  checkWin,
  createBoard,
  markTile,
  revealTile,
  TILE_STATUS,
} from "./minesweeper.js";
// 1. generate the board
// key takeaway: creating functions that we can dynamically edit the input and output, instead of hardcoding the layout
// console.log(board)
const boardElement = document.querySelector(".board");
const mineCountText = document.querySelector("[data-mine-count]");
const subText = document.querySelector('.subtext')
const BOARD_SIZE = 10;
const NUM_OF_MINES = 3;
mineCountText.innerText = NUM_OF_MINES;
const board = createBoard(BOARD_SIZE, NUM_OF_MINES);
for (const row of board) {
  for (const tile of row) {
    boardElement.appendChild(tile.element);
    // 3. right click
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
      //minus the number of marked tiles from the mine-count
      mineCountText.innerText = NUM_OF_MINES - getMarkedTileNum();
    });
    // 2. left click
    //reveal the tiles
    tile.element.addEventListener("click", (e) => {
      revealTile(board, tile);
      checkGameOver(board);
    });
  }
}
//key takeaway: can use variable in css, then use js to set it up
boardElement.style.setProperty("--size", BOARD_SIZE);

function getMarkedTileNum() {
  const markedTileNum = board.reduce((acc, row) => {
    return (
      row.filter((tile) => tile.status === TILE_STATUS.MARKED).length + acc
    );
  }, 0);
  // key takeaway: the usage of reduce method on counting total num
  return markedTileNum;
}

function checkGameOver(board) {
  const win = checkWin(board);
  const lose = checkLose(board);
  console.log(lose)
  if(win || lose){
    boardElement.addEventListener('click', stopProp, {capture:true} )
    boardElement.addEventListener('contextmenu', stopProp, {capture:true} )
  }
  if (win) {
    subText.innerText = 'You Win!'
  } 
  if (lose) {
    subText.innerText = 'You Lose.'
    for(const row of board){
        for(const tile of row){
            if(tile.status === TILE_STATUS.MARKED) markTile(tile)
            if(tile.mine) tile.status = TILE_STATUS.MINE
        }
    }

  }

}

function stopProp(e){
    e.stopPropagation();
};

