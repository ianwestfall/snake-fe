<template>
  <div class="snake-game">
    <div class="info" :class="{'game-over': game.gameOver}">
      <span class="score">
        Score: {{ game.score }}
      </span>
      <span class="game-info">
        Game ID: {{ game.id }},
        Turn # {{ game.turnNumber }}
      </span>
    </div>
    <div class="board">
      <div class="row" v-for="row in game.height" :key="`row_${row}`">
        <div class="cell" v-for="col in game.width" :key="`cell_${row}_${col}`"
             :data-cy="`${col},${row}`"
             :class="{
              snake: isSnakeAtCoord(col - 1, row - 1),
              'snake-head': isSnakeHeadAtCoord(col - 1, row - 1),
              apple: isAppleAtCoord(col - 1, row - 1),
            }"></div>
      </div>
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
    isSnakeAtCoord(x, y) {
      return this.game.snake.contains(new Coordinate(x, y));
    },
    isSnakeHeadAtCoord(x, y) {
      return this.game.snake.body[0].equals(new Coordinate(x, y));
    },
    isAppleAtCoord(x, y) {
      return this.game.apple.equals(new Coordinate(x, y));
    },
  },
};
</script>

<style scoped>
.snake-game {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.info {
  flex: 0 1 auto;
}

.board {
  flex: 1 1 auto;
  height: 100%;

  display: flex;
  flex-flow: column;
}

.row {
  flex: 1;
  width: 100%;
  height: 100%;

  display: flex;
}

.cell {
  flex: 1;
  width: 100%;
  height: 100%;

  background-color: #26c485;
  border: 1px solid #58e8af;
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
