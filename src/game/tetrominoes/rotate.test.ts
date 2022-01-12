import { CellColor } from "../types";

import { TetrominoType } from "./types";
import { rotateCounterClockwise, rotateTetromino } from "./rotate";

type TetrominoRotation = (CellColor | null)[][];
export const tetrominoRotations: {
  [key in TetrominoType]: [
    TetrominoRotation,
    TetrominoRotation,
    TetrominoRotation,
    TetrominoRotation
  ];
} = {
  I: [
    [
      [null, null, null, null],
      ["cyan", "cyan", "cyan", "cyan"],
      [null, null, null, null],
      [null, null, null, null],
    ],
    [
      [null, null, "cyan", null],
      [null, null, "cyan", null],
      [null, null, "cyan", null],
      [null, null, "cyan", null],
    ],
    [
      [null, null, null, null],
      [null, null, null, null],
      ["cyan", "cyan", "cyan", "cyan"],
      [null, null, null, null],
    ],
    [
      [null, "cyan", null, null],
      [null, "cyan", null, null],
      [null, "cyan", null, null],
      [null, "cyan", null, null],
    ],
  ],
  J: [
    [
      ["blue", null, null],
      ["blue", "blue", "blue"],
      [null, null, null],
    ],
    [
      [null, "blue", "blue"],
      [null, "blue", null],
      [null, "blue", null],
    ],
    [
      [null, null, null],
      ["blue", "blue", "blue"],
      [null, null, "blue"],
    ],
    [
      [null, "blue", null],
      [null, "blue", null],
      ["blue", "blue", null],
    ],
  ],
  L: [
    [
      [null, null, "orange"],
      ["orange", "orange", "orange"],
      [null, null, null],
    ],
    [
      [null, "orange", null],
      [null, "orange", null],
      [null, "orange", "orange"],
    ],
    [
      [null, null, null],
      ["orange", "orange", "orange"],
      ["orange", null, null],
    ],
    [
      ["orange", "orange", null],
      [null, "orange", null],
      [null, "orange", null],
    ],
  ],
  O: [
    [
      ["yellow", "yellow"],
      ["yellow", "yellow"],
    ],
    [
      ["yellow", "yellow"],
      ["yellow", "yellow"],
    ],
    [
      ["yellow", "yellow"],
      ["yellow", "yellow"],
    ],
    [
      ["yellow", "yellow"],
      ["yellow", "yellow"],
    ],
  ],
  S: [
    [
      [null, "green", "green"],
      ["green", "green", null],
      [null, null, null],
    ],
    [
      [null, "green", null],
      [null, "green", "green"],
      [null, null, "green"],
    ],
    [
      [null, null, null],
      [null, "green", "green"],
      ["green", "green", null],
    ],
    [
      ["green", null, null],
      ["green", "green", null],
      [null, "green", null],
    ],
  ],
  T: [
    [
      [null, "purple", null],
      ["purple", "purple", "purple"],
      [null, null, null],
    ],
    [
      [null, "purple", null],
      [null, "purple", "purple"],
      [null, "purple", null],
    ],
    [
      [null, null, null],
      ["purple", "purple", "purple"],
      [null, "purple", null],
    ],
    [
      [null, "purple", null],
      ["purple", "purple", null],
      [null, "purple", null],
    ],
  ],
  Z: [
    [
      ["red", "red", null],
      [null, "red", "red"],
      [null, null, null],
    ],
    [
      [null, null, "red"],
      [null, "red", "red"],
      [null, "red", null],
    ],
    [
      [null, null, null],
      ["red", "red", null],
      [null, "red", "red"],
    ],
    [
      [null, "red", null],
      ["red", "red", null],
      ["red", null, null],
    ],
  ],
};

describe("Block rotation", () => {
  Object.entries(tetrominoRotations).forEach(([tetromino, rotations]) => {
    it(`should rotate ${tetromino} clockwise properly`, () => {
      rotations.forEach((rotation, i) => {
        expect(rotateTetromino(rotation)).toStrictEqual(
          rotations[(i + 1) % rotations.length]
        );
      });
    });
  });
  Object.entries(tetrominoRotations).forEach(([tetromino, rotations]) => {
    it(`should rotate ${tetromino} counterclockwise properly`, () => {
      rotations.forEach((rotation, i) => {
        expect(rotateCounterClockwise(rotation)).toStrictEqual(
          rotations[(i + 3) % rotations.length]
        );
      });
    });
  });
});
