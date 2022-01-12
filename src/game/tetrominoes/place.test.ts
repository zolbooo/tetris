import { placeTetromino } from ".";

describe("Place tetromino", () => {
  it("should place a piece", () => {
    const tetrion = Array(4)
      .fill(null)
      .map(() => Array(4).fill(null));
    placeTetromino(tetrion, {
      matrix: [
        ["blue", null, null],
        ["blue", "blue", "blue"],
        [null, null, null],
      ],
      position: {
        x: 0,
        y: 0,
      },
    });
    expect(tetrion).toStrictEqual([
      [{ color: "blue" }, null, null, null],
      [{ color: "blue" }, { color: "blue" }, { color: "blue" }, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
  });
});
