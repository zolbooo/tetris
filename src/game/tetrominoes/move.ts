import { cloneDeep } from "lodash";

import { Tetrion } from "../types";
import { Tetromino } from "./types";
import { hasCollisionWithTetrion } from "./fall";

export function moveTetromino(
  tetromino: Tetromino,
  tetrion: Tetrion,
  dx: number
): Tetromino | null {
  if (dx !== 1 && dx !== -1) {
    throw Error("Invalid dx value");
  }
  const newTetromino = cloneDeep(tetromino);
  newTetromino.position.x += dx;
  if (hasCollisionWithTetrion(tetrion, tetromino)) {
    return null;
  }
  return newTetromino;
}
