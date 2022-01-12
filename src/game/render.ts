import { TetrominoMatrix } from "./tetrominoes";

export function renderInContainer(
  container: HTMLTableElement,
  matrix: TetrominoMatrix
) {
  container.innerHTML = "";
  for (let y = 0; y < matrix.length; y++) {
    const row = document.createElement("tr");
    container.appendChild(row);
    for (let x = 0; x < matrix[y].length; x++) {
      const cell = document.createElement("td");
      cell.classList.add("cell");
      cell.style.backgroundColor = matrix[y][x];
      row.appendChild(cell);
    }
  }
}
