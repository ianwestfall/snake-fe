import { expect } from 'chai';
import Snake from '@/models/Snake';
import Coordinate from '@/models/Coordinate';

describe('Snake', () => {
  describe('.contains()', () => {
    let testSnake;
    beforeEach('initialize a test snake', () => {
      testSnake = new Snake('UP', [
        new Coordinate(3, 3),
        new Coordinate(3, 4),
        new Coordinate(3, 5),
      ]);
    });

    it('returns true when the snake\'s body contains the given coordinate', () => {
      expect(testSnake.contains(new Coordinate(3, 3))).to.equal(true);
      expect(testSnake.contains(new Coordinate(3, 4))).to.equal(true);
      expect(testSnake.contains(new Coordinate(3, 5))).to.equal(true);
    });

    it('returns false when the snake\'s body does not contain the given coordinate', () => {
      // For a 10 x 10 board, make sure no other spaces return true
      [...Array(10).keys()].forEach((x) => {
        [...Array(10).keys()].forEach((y) => {
          const coord = new Coordinate(x, y);
          if (!testSnake.body.some((bodyCoord) => bodyCoord.equals(coord))) {
            expect(testSnake.contains(coord)).to.equal(false);
          }
        });
      });
    });
  });
});
