import { Tetrion } from "./types";
import { clearRows } from "./rows";

describe("Rows", () => {
  it("should clear multiple rows properly", () => {
    const tetrion: Tetrion = [
      [{ color: "white" }],
      [{ color: "red" }],
      [{ color: "red" }],
    ];
    expect(clearRows(tetrion)).toStrictEqual([
      [{ color: "white" }],
      [{ color: "white" }],
      [{ color: "white" }],
    ]);

    expect(
      clearRows([
        [{ color: "white" }, { color: "white" }, { color: "white" }],
        [{ color: "red" }, { color: "red" }, { color: "red" }],
        [{ color: "yellow" }, { color: "white" }, { color: "yellow" }],
      ])
    ).toStrictEqual([
      [{ color: "white" }, { color: "white" }, { color: "white" }],
      [{ color: "white" }, { color: "white" }, { color: "white" }],
      [{ color: "yellow" }, { color: "white" }, { color: "yellow" }],
    ]);
  });
});
