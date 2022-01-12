import { Game } from "./game";

const pauseButton = document.getElementById("pause");

let lastGame: Game | null = null;
function newGame() {
  if (lastGame) {
    lastGame.stop();
    pauseButton.innerText = "Pause";
  }
  const game = new Game();
  lastGame = game;

  const pauseListener = () => {
    pauseButton.innerText = game.paused ? "Pause" : "Resume";
    if (game.paused) {
      game.resume();
    } else {
      game.pause();
    }
  };
  pauseButton.addEventListener("click", pauseListener);

  const keydownListener = (event: KeyboardEvent) => {
    console.log(event.key);
    switch (event.key) {
      case "ArrowLeft":
        game.move("left");
        break;
      case "ArrowRight":
        game.move("right");
        break;
      case "ArrowUp":
        game.rotate();
        break;
      case "Control":
        game.rotate({ clockwise: false });
        break;
      case "ArrowDown":
        game.move("down");
        break;
      case "Escape":
        pauseListener();
        break;
      case " ":
        game.hardDrop();
        break;
    }
    switch (event.code) {
      case "KeyX":
        game.rotate();
        break;
      case "KeyZ":
        game.rotate({ clockwise: false });
        break;
      case "KeyC":
        game.hold();
        break;
      case "F1":
        pauseListener();
        break;
      case "Numpad1":
      case "Numpad5":
      case "Numpad9":
        game.rotate({ clockwise: false });
        break;
      case "Numpad3":
      case "Numpad7":
        game.rotate({ clockwise: true });
        break;
      case "Numpad8":
        game.hardDrop();
        break;
      case "Numpad4":
        game.move("left");
        break;
      case "Numpad6":
        game.move("right");
        break;
      case "Numpad2":
        game.move("down");
        break;
    }
  };
  document.addEventListener("keydown", keydownListener);

  game.onStop(() => {
    document.removeEventListener("keydown", keydownListener);
    pauseButton.removeEventListener("click", pauseListener);
  });
}

const newGameButton = document.getElementById("new-game");
newGameButton.addEventListener("click", newGame);
newGame();
