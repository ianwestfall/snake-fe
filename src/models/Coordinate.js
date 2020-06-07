class Coordinate {
  #x;

  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  equals(other) {
    return this.#x === other.x && this.#y === other.y;
  }
}

export default Coordinate;
