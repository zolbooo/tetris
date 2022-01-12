import { Tetrion } from "./types";

export function createTetrion(): {
  tetrion: Tetrion;
  container: HTMLTableSectionElement;
} {
  const game = document.getElementById("game");
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  function createRow() {
    const row = document.createElement("tr");
    for (let i = 0; i < 10; i++) {
      const cell = document.createElement("td");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    return row;
  }

  // Create rows
  const rows = Array(20).fill(null).map(createRow);

  rows.forEach((row) => tbody.appendChild(row));
  table.appendChild(tbody);
  game.appendChild(table);

  const tetrion: Tetrion = Array(40)
    .fill(null)
    .map(() => Array(10).fill({ color: "white" }));
  return { tetrion, container: tbody };
}

export function renderTetrion(
  tetrion: Tetrion,
  container: HTMLTableSectionElement
) {
  // First 20 row of tetrion are hidden
  for (let i = 20; i < tetrion.length; i++) {
    for (let j = 0; j < tetrion[i].length; j++) {
      (
        container.children[i - 20].children[j] as HTMLTableRowElement
      ).style.backgroundColor = tetrion[i][j].color;
    }
  }
}
