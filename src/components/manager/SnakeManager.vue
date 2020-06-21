<template>
  <div class="manager-display">
    <div class="monitoring">
      <div class="game-board" v-for="game in activeGames.games" :key="game.id">
        <SnakeGame :game="game"></SnakeGame>
      </div>
    </div>
    <div class="high-scores">
      <HighScoreDisplay :highScores="highScores"></HighScoreDisplay>
    </div>
  </div>
</template>

<script>
import Game from '@/models/Game';
import HighScores from '@/models/HighScores';
import HighScoreDisplay from '@/components/manager/HighScoreDisplay.vue';
import SnakeGame from '@/components/common/SnakeGame.vue';

export default {
  components: {
    HighScoreDisplay,
    SnakeGame,
  },
  data() {
    return {
      webSocket: null,
      activeGames: {
        games: {},
      },
      highScores: new HighScores(process.env.VUE_APP_HIGH_SCORE_LENGTH),
      gamesCompleted: 0,
    };
  },
  methods: {
    connectToGameServer() {
      if (this.webSocket !== null) {
        this.webSocket.close();
      }

      const monitoringServer = process.env.VUE_APP_MONITORING_SERVER;
      this.webSocket = new WebSocket(monitoringServer);

      this.webSocket.onopen = () => {
        console.log(`Connected to monitoring server: ${monitoringServer}`);
      };

      this.webSocket.onclose = () => {
        console.log(`Connected to monitoring server closed: ${monitoringServer}`);
      };

      this.webSocket.onerror = (err) => {
        console.error(`Error with connection to monitoring server: ${monitoringServer}`);
        console.error(err);
        this.webSocket.close();
      };

      this.webSocket.onmessage = (message) => {
        const websocketEvent = JSON.parse(message.data);
        console.debug(websocketEvent);

        this.processEvent(Game.fromWebsocketEvent(websocketEvent));
      };
    },
    processEvent(game) {
      this.$set(this.activeGames.games, game.id, game);

      if (game.gameOver) {
        // delete this.activeGames.games[game.id];
        this.highScores.registerScore(game);
        this.gamesCompleted += 1;
      }
    },
  },
  mounted() {
    this.connectToGameServer();
  },
};
</script>

<style scoped>
.manager-display {
  display: flex;
  height: 100%
}

.monitoring {
  width: 100%;
  flex: 7;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
}

.high-scores {
  flex: 1;
}

.game-board {
  min-width: 200px;
  min-height:200px;

  max-width: 100%;
  max-height: 100%;

  font-size: smaller;
}
</style>
