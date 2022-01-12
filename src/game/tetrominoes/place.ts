import { Tetrion } from "../types";
import { Tetromino } from "./types";

export function clearTetromino(tetrion: Tetrion, tetromino: Tetromino) {
  for (let i = 0; i < tetromino.matrix.length; i++) {
    for (let j = 0; j < tetromino.matrix[i].length; j++) {
      if (tetromino.matrix[i][j]) {
        tetrion[tetromino.position.y + i][tetromino.position.x + j] = {
          color: "white",
        };
      }
    }
  }
}

export function placeTetromino(tetrion: Tetrion, tetromino: Tetromino) {
  for (let i = 0; i < tetromino.matrix.length; i++) {
    for (let j = 0; j < tetromino.matrix[i].length; j++) {
      if (tetromino.matrix[i][j]) {
        tetrion[tetromino.position.y + i][tetromino.position.x + j] = {
          color: tetromino.matrix[i][j],
        };
      }
    }
  }
}
