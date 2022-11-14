// the ui/design of the game
import { createBoard, markTile } from "./minesweeper.js";
// 1. generate the board
// key takeaway: creating functions that we can dynamically edit the input and output, instead of hardcoding the layout
// console.log(board)
const boardElement = document.querySelector(".board");
const BOARD_SIZE = 10
const NUM_OF_MINES = 10
const board = createBoard(BOARD_SIZE, NUM_OF_MINES);
// for(const row of board){
//     for(const tile of row){
//         boardElement.appendChild(tile.element)
//         tile.element.addEventListener("contextmenu", (e) => {
//             e.preventDefault();
//             markTile(tile)
//           });
//         tile.element.addEventListener('click', e => {
//             console.log(tile.x, tile.y)
//         })
//     }
// } 
boardElement.style.setProperty("--size", BOARD_SIZE);
//key takeaway: can use variable in css, then use js to set it up
// 2. left click
// 3. right click
// 4. game over logic
