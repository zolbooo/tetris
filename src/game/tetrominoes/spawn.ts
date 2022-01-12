import { TetrominoMatrix } from ".";
import { CellColor } from "../types";

import { createRandomHolder } from "./random";
import { TetrominoType, Tetromino } from "./types";

const tetrominoes: {
  [key in TetrominoType]: ReadonlyArray<ReadonlyArray<CellColor>>;
} = {
  I: [
    [null, null, null, null],
    ["cyan", "cyan", "cyan", "cyan"],
    [null, null, null, null],
    [null, null, null, null],
  ],
  J: [
    ["blue", null, null],
    ["blue", "blue", "blue"],
    [null, null, null],
  ],
  L: [
    [null, null, "orange"],
    ["orange", "orange", "orange"],
    [null, null, null],
  ],
  O: [
    ["yellow", "yellow"],
    ["yellow", "yellow"],
  ],
  S: [
    [null, "green", "green"],
    ["green", "green", null],
    [null, null, null],
  ],
  T: [
    [null, "purple", null],
    ["purple", "purple", "purple"],
    [null, null, null],
  ],
  Z: [
    ["red", "red", null],
    [null, "red", "red"],
    [null, null, null],
  ],
};

export function initialPositionFor(matrix: TetrominoMatrix): {
  x: number;
  y: number;
} {
  return {
    x: Math.floor((10 - matrix[0].length) / 2),
    y: 20 - matrix.length,
  };
}

const randomHolder = createRandomHolder();
export function spawnTetromino(): Tetromino {
  const tetrominoType = randomHolder.next();
  return {
    matrix: tetrominoes[tetrominoType],
    position: initialPositionFor(tetrominoes[tetrominoType]),
  };
}
