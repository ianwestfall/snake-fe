import { expect } from 'chai';
import Coordinate from '@/models/Coordinate';

describe('Coordinate', () => {
  describe('.equals()', () => {
    it('returns true when the coordinates are equal', () => {
      const a = new Coordinate(5, 12);
      const b = new Coordinate(5, 12);

      expect(a.equals(b)).to.equal(true);
      expect(b.equals(a)).to.equal(true);
      expect(a.equals(a)).to.equal(true);
      expect(b.equals(b)).to.equal(true);
    });

    it('returns false when the coordinates are not equal', () => {
      let a = new Coordinate(5, 12);
      let b = new Coordinate(4, 12);

      expect(a.equals(b)).to.equal(false);
      expect(b.equals(a)).to.equal(false);

      a = new Coordinate(5, 12);
      b = new Coordinate(5, 11);

      expect(a.equals(b)).to.equal(false);
      expect(b.equals(a)).to.equal(false);

      a = new Coordinate(5, 12);
      b = new Coordinate(4, 11);

      expect(a.equals(b)).to.equal(false);
      expect(b.equals(a)).to.equal(false);
    });
  });
});
