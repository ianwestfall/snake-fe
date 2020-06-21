import { expect } from 'chai';
import Game from '@/models/Game';
import Coordinate from '@/models/Coordinate';

describe('Game', () => {
  describe('.fromWebSocketEvent()', () => {
    it('correctly creates a new Game instance from a web socket event', () => {
      const testEvent = {
        id: 41,
        board: {
          snake: {
            direction: 'UP',
            body: [
              { x: 3, y: 3 },
              { x: 3, y: 4 },
              { x: 3, y: 5 },
              { x: 3, y: 6 },
              { x: 3, y: 7 },
              { x: 2, y: 7 },
              { x: 1, y: 7 },
            ],
          },
          apple: { x: 9, y: 9 },
        },
        turnNumber: 7,
        score: 4,
        gameOver: false,
      };

      const game = Game.fromWebsocketEvent(testEvent);

      expect(game.id).to.equal(41);
      expect(game.turnNumber).to.equal(7);
      expect(game.score).to.equal(4);
      expect(game.gameOver).to.equal(false);
      expect(game.snake.direction).to.equal('UP');
      expect(game.snake.body).to.be.an('array').that.has.lengthOf(7);
      expect(game.snake.body[0].equals(new Coordinate(3, 3))).to.equal(true);
      expect(game.snake.body[1].equals(new Coordinate(3, 4))).to.equal(true);
      expect(game.snake.body[2].equals(new Coordinate(3, 5))).to.equal(true);
      expect(game.snake.body[3].equals(new Coordinate(3, 6))).to.equal(true);
      expect(game.snake.body[4].equals(new Coordinate(3, 7))).to.equal(true);
      expect(game.snake.body[5].equals(new Coordinate(2, 7))).to.equal(true);
      expect(game.snake.body[6].equals(new Coordinate(1, 7))).to.equal(true);
      expect(game.apple.equals(new Coordinate(9, 9))).to.equal(true);
    });
  });
});
