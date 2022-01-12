import { CellColor } from "../types";

export type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

export type TetrominoMatrix = ReadonlyArray<ReadonlyArray<CellColor>>;

export type Tetromino = {
  matrix: TetrominoMatrix;
  position: {
    x: number;
    y: number;
  };
};
