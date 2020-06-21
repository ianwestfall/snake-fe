class HighScores {
  #length;

  scores;

  constructor(length) {
    this.#length = length;
    this.scores = [];
  }

  registerScore(finishedGame) {
    // Adds the newly finished game's score to the scores list, sorts it, then trims it to the
    // configured length.
    this.scores.push({
      score: finishedGame.score,
      gameId: finishedGame.id,
      turns: finishedGame.turnNumber,
    });

    this.scores.sort((a, b) => {
      // Sort by score desc, turns asc
      if (a.score === b.score) {
        return a.turns - b.turns;
      }

      return b.score - a.score;
    });

    this.scores = this.scores.slice(0, this.#length);
  }

  get maxLength() {
    return this.#length;
  }
}

export default HighScores;
