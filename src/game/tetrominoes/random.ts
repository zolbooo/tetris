import { TetrominoType } from "./types";

type RandomHolder = {
  shuffle: () => void;
  state: TetrominoType[];
  next: () => TetrominoType;
};

export function createRandomHolder(): RandomHolder {
  const state: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];
  const shuffle = () => {
    for (let i = state.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state[i], state[j]] = [state[j], state[i]];
    }
  };
  let index = 0;
  return {
    shuffle,
    state,
    next: () => {
      const result = state[index++];
      if (index === state.length - 1) {
        shuffle();
        index = 0;
      }
      return result;
    },
  };
}
