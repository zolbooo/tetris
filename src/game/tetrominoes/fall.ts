import { cloneDeep } from "lodash";

import { Tetrion } from "../types";
import { Tetromino } from "./types";

export function hasCollisionWithTetrion(
  tetrion: Tetrion,
  tetromino: Tetromino
): boolean {
  for (let i = 0; i < tetromino.matrix.length; i++) {
    for (let j = 0; j < tetromino.matrix[i].length; j++) {
      if (!tetromino.matrix[i][j]) {
        continue;
      }
      const x = tetromino.position.x + j;
      const y = tetromino.position.y + i;
      if (y < 0 || y >= tetrion.length || x < 0 || x >= tetrion[y].length) {
        return true;
      }
      const cell = tetrion[y][x];
      if (!cell || cell.color !== "white") {
        return true;
      }
    }
  }
  return false;
}

export function simulateFall(
  tetrion: Tetrion,
  tetromino: Tetromino
): { hasCollision: boolean; newTetromino: Tetromino } {
  const newTetromino = cloneDeep(tetromino);
  newTetromino.position.y++;
  const hasCollision = hasCollisionWithTetrion(tetrion, newTetromino);
  return { hasCollision, newTetromino };
}

export function simulateHardFall(
  tetrion: Tetrion,
  tetromino: Tetromino
): Tetromino {
  let currentTetromino = tetromino;
  let hasCollision = false;
  do {
    const fallResults = simulateFall(tetrion, currentTetromino);
    if (fallResults.hasCollision) {
      break;
    }
    currentTetromino = fallResults.newTetromino;
  } while (!hasCollision);
  return currentTetromino;
}
