import { cloneDeep } from "lodash";

import { Tetrion } from "./types";

export function clearRows(tetrion: Tetrion): Tetrion {
  const result = cloneDeep(tetrion);
  for (let i = result.length - 1; i >= 0; i--) {
    const isFull = result[i].every((cell) => cell.color !== "white");
    if (isFull) {
      for (let j = i; j > 0; j--) {
        result[j] = result[j - 1];
      }
      result[0] = Array(result[0].length)
        .fill(null)
        .map(() => ({ color: "white" }));
      i++;
    }
  }
  return result;
}
