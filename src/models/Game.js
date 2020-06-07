import Snake from '@/models/Snake';
import Apple from '@/models/Apple';

class Game {
  #id;

  #width;

  #height;

  #snake;

  #apple;

  #turnNumber;

  #score;

  #gameOver;

  constructor(id, width, height, snake, apple, turnNumber, score, gameOver) {
    this.#id = id;
    this.#width = width;
    this.#height = height;
    this.#snake = snake;
    this.#apple = apple;
    this.#turnNumber = turnNumber;
    this.#score = score;
    this.#gameOver = gameOver;
  }

  static fromWebsocketEvent(e) {
    // Create a new snake
    const snake = Snake.fromWebsocketEvent(e.board.snake);

    // Create a new apple
    const apple = Apple.fromWebsocketEvent(e.board.apple);

    return new Game(e.id, e.board.width, e.board.height, snake, apple, e.turnNumber, e.score,
      e.gameOver);
  }

  get id() {
    return this.#id;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get snake() {
    return this.#snake;
  }

  get apple() {
    return this.#apple;
  }

  get turnNumber() {
    return this.#turnNumber;
  }

  get score() {
    return this.#score;
  }

  get gameOver() {
    return this.#gameOver;
  }
}

export default Game;
