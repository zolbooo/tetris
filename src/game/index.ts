import { cloneDeep } from "lodash";

import {
  type Tetromino,
  simulateFall,
  moveTetromino,
  placeTetromino,
  clearTetromino,
  spawnTetromino,
  rotateTetromino,
  rotateCounterClockwise,
  hasCollisionWithTetrion,
  initialPositionFor,
} from "./tetrominoes";
import { Tetrion } from "./types";
import { clearRows } from "./rows";
import { renderInContainer } from "./render";
import { createTetrion, renderTetrion } from "./field";

import { removeNode } from "../utils/dom";
import { simulateHardFall } from "./tetrominoes/fall";

export class Game {
  paused: boolean = false;
  gameOver: boolean = false;

  private tetrion: Tetrion;
  private container: HTMLTableSectionElement;

  private nextTetrominoContainer = document.querySelector(
    ".next-tetromino table"
  ) as HTMLTableElement;
  private nextTetromino = spawnTetromino();

  private inHoldContainer = document.querySelector(
    ".in-hold table"
  ) as HTMLTableElement;
  private inHold: Tetromino | null = null;

  private tetromino = spawnTetromino();
  private fallInterval: NodeJS.Timer;

  private renderTetromino({ tetromino = this.tetromino, scan = false } = {}) {
    if (hasCollisionWithTetrion(this.tetrion, tetromino)) {
      return;
    }
    placeTetromino(this.tetrion, tetromino);
    if (scan) {
      this.tetrion = clearRows(this.tetrion);
    }
    if (tetromino !== this.tetromino) {
      this.tetromino = tetromino;
    }
    renderTetrion(this.tetrion, this.container);
  }

  private handleFall() {
    clearInterval(this.fallInterval);
    this.tetromino = this.nextTetromino;
    this.nextTetromino = spawnTetromino();
    renderInContainer(this.nextTetrominoContainer, this.nextTetromino.matrix);
    this.fallLoop();
  }

  private fallLoop = () => {
    if (this.paused) {
      return;
    }
    this.fallInterval = setInterval(() => {
      clearTetromino(this.tetrion, this.tetromino);
      const { hasCollision, newTetromino } = simulateFall(
        this.tetrion,
        this.tetromino
      );

      if (hasCollision) {
        if (this.tetromino.position.y === 20 - this.tetromino.matrix.length) {
          clearInterval(this.fallInterval);
          this.gameOver = true;
          return;
        }

        this.renderTetromino({ scan: true });
        this.handleFall();
        return;
      }

      this.renderTetromino({ tetromino: newTetromino });
    }, 500);
  };

  private getTetrionSnapshot(): Tetrion {
    const snapshot = cloneDeep(this.tetrion);
    clearTetromino(snapshot, this.tetromino);
    return snapshot;
  }

  move(direction: "left" | "right" | "down") {
    if (this.paused || this.gameOver) {
      return;
    }

    const snapshot = this.getTetrionSnapshot();
    clearTetromino(snapshot, this.tetromino);

    let newTetromino: Tetromino | null = null;
    switch (direction) {
      case "left":
        newTetromino = moveTetromino(this.tetromino, snapshot, -1);
        if (newTetromino) {
          this.tetrion = snapshot;
          this.renderTetromino({ tetromino: newTetromino });
        }
        break;
      case "right":
        newTetromino = moveTetromino(this.tetromino, snapshot, 1);
        if (newTetromino) {
          this.tetrion = snapshot;
          this.renderTetromino({ tetromino: newTetromino });
        }
        break;
      case "down":
        const fallResults = simulateFall(snapshot, this.tetromino);
        if (!fallResults.hasCollision) {
          this.tetrion = snapshot;
          this.renderTetromino({ tetromino: fallResults.newTetromino });
        } else {
          this.handleFall();
        }
        break;
    }
  }

  rotate({ clockwise = true } = {}) {
    if (this.paused || this.gameOver) {
      return;
    }

    const tetrionSnapshot = this.getTetrionSnapshot();
    const newMatrix = clockwise
      ? rotateTetromino(this.tetromino.matrix)
      : rotateCounterClockwise(this.tetromino.matrix);
    const newTetromino = {
      ...cloneDeep(this.tetromino),
      matrix: newMatrix,
    };
    if (!hasCollisionWithTetrion(tetrionSnapshot, newTetromino)) {
      clearTetromino(this.tetrion, this.tetromino);
      this.renderTetromino({ tetromino: newTetromino, scan: true });
    }
  }

  hardDrop() {
    if (this.paused || this.gameOver) {
      return;
    }
    clearTetromino(this.tetrion, this.tetromino);
    this.renderTetromino({
      tetromino: simulateHardFall(this.getTetrionSnapshot(), this.tetromino),
      scan: true,
    });
    this.handleFall();
  }

  hold() {
    if (this.paused || this.gameOver) {
      return;
    }

    clearTetromino(this.tetrion, this.tetromino);
    const lastHold = this.inHold;

    this.inHold = {
      ...cloneDeep(this.tetromino),
      position: initialPositionFor(this.tetromino.matrix),
    };

    if (lastHold) {
      this.tetromino = lastHold;
    } else {
      this.tetromino = this.nextTetromino;
      this.nextTetromino = spawnTetromino();
    }

    this.renderTetromino();
    renderInContainer(this.nextTetrominoContainer, this.nextTetromino.matrix);
    renderInContainer(this.inHoldContainer, this.inHold.matrix);
  }

  constructor() {
    const { tetrion, container } = createTetrion();
    this.tetrion = tetrion;
    this.container = container;
    this.fallLoop();
    renderInContainer(this.nextTetrominoContainer, this.nextTetromino.matrix);
  }

  pause = () => {
    this.paused = true;
    clearInterval(this.fallInterval);
  };
  resume = () => {
    this.paused = false;
    this.fallLoop();
  };

  private onStopHandler = () => {};
  onStop = (handler: () => void) => {
    this.onStopHandler = handler;
  };

  stop() {
    this.pause();
    removeNode(this.container);
    this.onStopHandler();
  }
}
