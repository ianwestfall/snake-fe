import { expect } from 'chai';
import HighScores from '@/models/HighScores';

describe('HighScores', () => {
  describe('.registerScore()', () => {
    let highScores;

    beforeEach(() => {
      highScores = new HighScores(2);
    });

    it('stores scores ordered high to low', () => {
      const games = [{ id: 0, score: 4, turnNumber: 10 }, { id: 1, score: 5, turnNumber: 21 }];

      games.forEach((game) => {
        highScores.registerScore(game);
      });

      expect(highScores.scores).to.deep.equal([
        { gameId: 1, score: 5, turns: 21 }, { gameId: 0, score: 4, turns: 10 },
      ]);
    });

    it('uses turnNumber ascending as a tie breaker', () => {
      const games = [{ id: 0, score: 4, turnNumber: 10 }, { id: 1, score: 4, turnNumber: 5 }];

      games.forEach((game) => {
        highScores.registerScore(game);
      });

      expect(highScores.scores).to.deep.equal([
        { gameId: 1, score: 4, turns: 5 }, { gameId: 0, score: 4, turns: 10 },
      ]);
    });

    it('only stores the configured number of scores', () => {
      const games = [
        { id: 0, score: 4, turnNumber: 10 },
        { id: 1, score: 4, turnNumber: 5 },
        { id: 2, score: 20, turnNumber: 127 },
      ];

      games.forEach((game) => {
        highScores.registerScore(game);
      });

      expect(highScores.scores).to.deep.equal([
        { gameId: 2, score: 20, turns: 127 }, { gameId: 1, score: 4, turns: 5 },
      ]);
    });
  });
});
