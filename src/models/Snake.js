import Coordinate from '@/models/Coordinate';

class Snake {
  #direction;

  #body;

  constructor(direction, body) {
    this.#direction = direction;
    this.#body = body;
  }

  get direction() {
    return this.#direction;
  }

  get body() {
    return this.#body;
  }

  contains(coord) {
    return this.#body.some((bodyPart) => coord.equals(bodyPart));
  }

  static fromWebsocketEvent(e) {
    return new Snake(e.direction, e.body.map((ec) => new Coordinate(ec.x, ec.y)));
  }
}

export default Snake;
