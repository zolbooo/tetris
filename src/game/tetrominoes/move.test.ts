import { Tetrion } from "../types";
import { Tetromino } from ".";
import { moveTetromino } from "./move";

describe("Tetromino move test", () => {
  it("should move pieces properly", () => {
    const tetromino: Tetromino = {
      matrix: [
        ["yellow", "yellow"],
        ["yellow", "yellow"],
      ],
      position: { x: 1, y: 0 },
    };
    const tetrion: Tetrion = [
      [{ color: "white" }, { color: "white" }, { color: "white" }],
      [{ color: "white" }, { color: "white" }, { color: "white" }],
      [{ color: "white" }, { color: "white" }, { color: "white" }],
    ];
    expect(moveTetromino(tetromino, tetrion, -1).position).toStrictEqual({
      x: 0,
      y: 0,
    });
  });
  it("should handle overflow", () => {
    const tetromino: Tetromino = {
      matrix: [
        ["red", "red"],
        ["red", null],
      ],
      position: { x: 2, y: 0 },
    };
    const tetrion: Tetrion = [
      [{ color: "white" }, { color: "white" }, { color: "white" }],
      [{ color: "white" }, { color: "white" }, { color: "white" }],
      [{ color: "white" }, { color: "white" }, { color: "white" }],
    ];
    expect(moveTetromino(tetromino, tetrion, 1)).toBe(null);
  });
});
