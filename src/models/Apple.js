import Coordinate from '@/models/Coordinate';

class Apple extends Coordinate {
  static fromWebsocketEvent(e) {
    return new Apple(e.x, e.y);
  }
}

export default Apple;
