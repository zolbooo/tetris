import { TetrominoMatrix } from "./types";

/**
 * rotate a tetromino 90 degrees clockwise.
 * @param {arraytype} tetromino - The tetromino to rotate.
 * @returns The rotated tetromino.
 */
export function rotateTetromino(tetromino: TetrominoMatrix): TetrominoMatrix {
  const height = tetromino.length;
  const width = tetromino[0].length;
  // Rotate tetromino 90 degrees clockwise relative to the center
  const rotatedTetromino = Array(width)
    .fill(null)
    .map(() => Array(height).fill(null));
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      rotatedTetromino[x][height - y - 1] = tetromino[y][x];
    }
  }
  return rotatedTetromino;
}

export function rotateCounterClockwise(
  tetromino: TetrominoMatrix
): TetrominoMatrix {
  const height = tetromino.length;
  const width = tetromino[0].length;
  // Rotate tetromino 90 degrees counter-clockwise relative to the center
  const rotatedTetromino = Array(width)
    .fill(null)
    .map(() => Array(height).fill(null));
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      rotatedTetromino[width - x - 1][y] = tetromino[y][x];
    }
  }
  return rotatedTetromino;
}
