import { simulateFall } from ".";
import { Tetrion } from "../types";
import { Tetromino } from "./types";

describe("Tetromino fall", () => {
  it("should stop falling if collision is detected", () => {
    const tetromino: Tetromino = {
      matrix: [
        ["yellow", "yellow"],
        ["yellow", null],
      ],
      position: { x: 0, y: 0 },
    };
    const tetrion: Tetrion = [
      [{ color: "white" }, { color: "white" }],
      [{ color: "white" }, { color: "white" }],
      [{ color: "red" }, { color: "red" }],
    ];
    let { hasCollision } = simulateFall(tetrion, tetromino);
    expect(hasCollision).toBe(true);

    tetromino.position.y++;
    ({ hasCollision } = simulateFall(tetrion, tetromino));
    expect(hasCollision).toBe(true);
  });
  it("should not mutate tetromino object", () => {
    const tetromino: Tetromino = {
      matrix: [
        ["yellow", "yellow"],
        ["yellow", null],
      ],
      position: { x: 0, y: 0 },
    };
    const tetrion: Tetrion = [
      [{ color: "white" }, { color: "white" }],
      [{ color: "white" }, { color: "white" }],
      [{ color: "red" }, { color: "red" }],
    ];
    const { newTetromino } = simulateFall(tetrion, tetromino);
    expect(newTetromino).not.toBe(tetromino);
    expect(newTetromino.matrix).not.toBe(tetromino.matrix);
    expect(newTetromino.position).not.toBe(tetromino.position);
  });
});
