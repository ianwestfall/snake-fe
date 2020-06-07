<template>
  <div class="outer-container">
    <div :class="{'game-over': game.gameOver}">
      <span class="score">
        Score: {{ game.score }}
      </span>
      <span class="game-info">
        Game ID: {{ game.id }},
        Turn Number: {{ game.turnNumber }}
      </span>
    </div>
    <div class="container">
      <div class="coord" v-for="idx in (game.width * game.height)" :key="idx"
           :class="{
              snake: isSnakeAtCoord(idx),
              'snake-head': isSnakeHeadAtCoord(idx),
              apple: isAppleAtCoord(idx),
            }"></div>
    </div>
  </div>
</template>

<script>
import Coordinate from '@/models/Coordinate';

export default {
  name: 'SnakeGame',
  props: {
    game: {
      required: true,
      validator: (prop) => typeof prop === 'object' || prop === null,
    },
  },
  methods: {
    convertIdxToCoord(idx) {
      // Convert the 1-indexed idx to an x,y coordinate
      const x = (idx - 1) % this.game.width;
      const y = Math.floor((idx - 1) / this.game.width);
      return new Coordinate(x, y);
    },
    isSnakeAtCoord(idx) {
      return this.game.snake.contains(this.convertIdxToCoord(idx));
    },
    isSnakeHeadAtCoord(idx) {
      return this.game.snake.body[0].equals(this.convertIdxToCoord(idx));
    },
    isAppleAtCoord(idx) {
      return this.game.apple.equals(this.convertIdxToCoord(idx));
    },
  },
};
</script>

<style scoped>
.outer-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.container {
  display: grid;
  grid-template-columns: repeat(10, auto);
  grid-template-rows: repeat(10, auto);
  width: 100%;
  height: inherit;
}

.coord {
  background-color: #26c485;
  border: 1px solid black;
  width: 100%;
  height: 100%;
  border-radius: 20%;
}

.snake {
  background-color: #553a41;
}

.snake-head {
  background-color: #9c6d7a;
}

.apple {
  background-color: #b72411;
}

.score {
  float: right;
}

.game-info {
  float: left;
}

.game-over {
  color: red;
  font-weight: bold;
}
</style>
