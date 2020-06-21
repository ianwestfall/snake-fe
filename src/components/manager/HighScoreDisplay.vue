<template>
  <div class="high-scores">
    <div class="bordered-box">
      <h3>High Scores</h3>
      <ol v-if="highScores && highScores.scores.length" class="score-list">
        <li v-for="highScore in highScores.scores" :key="highScore.gameId">
          #{{ highScore.gameId }} -
          {{ highScore.score }} point{{ highScore.score > 1 ? 's' : '' }} /
          {{ highScore.turns }} turn{{ highScore.turns > 1 ? 's' : '' }}
        </li>
      </ol>
      <span v-else>No games have finished yet</span>
    </div>
  </div>
</template>

<script>
import HighScores from '@/models/HighScores';

export default {
  name: 'HighScoreDisplay',
  props: {
    highScores: {
      required: true,
      type: HighScores,
    },
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
}

.high-scores {
  width: 100%;
  text-align: center;
}

.bordered-box {
  border: 1px solid black;
  border-radius: 25px;
  padding-bottom: 20px;
  margin-right: 10px;
}

.score-list {
  text-align: left;
}
</style>
