<template>
  <div class="interactive-snake-game">
    <div class="options">
      <span>
        <button @click="playGame">New game</button>
        <button @click="randomizeGame">Watch the computer play</button>
      </span>
    </div>
    <div class="board">
      <SnakeGame :game="game" v-if="game !== null"></SnakeGame>
    </div>
  </div>
</template>

<script>
import SnakeGame from '@/components/common/SnakeGame.vue';
import Game from '@/models/Game';

export default {
  name: 'InteractiveSnake',
  components: {
    SnakeGame,
  },
  data() {
    return {
      game: null,
      webSocket: null,

      // Used for randomized games
      randomInterval: null,
    };
  },
  methods: {
    connectToGameServer(onmessage) {
      const gameServer = process.env.VUE_APP_GAME_SERVER;
      const webSocket = new WebSocket(gameServer);

      webSocket.onopen = () => {
        console.log(`Connected to game server: ${gameServer}`);
      };

      webSocket.onclose = () => {
        console.log(`Connection to game server closed: ${gameServer}`);
      };

      webSocket.onerror = (err) => {
        console.error(`Error with connection to game server: ${gameServer}`);
        console.error(err);
        webSocket.close();
      };

      webSocket.onmessage = (message) => {
        const websocketEvent = JSON.parse(message.data);
        console.debug(websocketEvent);

        onmessage(websocketEvent);
      };

      return webSocket;
    },
    playGame() {},
    randomizeGame() {
      // Close any pre-existing connections
      if (this.webSocket !== null) {
        this.webSocket.close();
      }

      // Connect to the game server
      this.webSocket = this.connectToGameServer((websocketEvent) => {
        this.game = Game.fromWebsocketEvent(websocketEvent);

        if (this.game.gameOver && this.randomInterval !== null) {
          clearInterval(this.randomInterval);
          this.webSocket.close();
        }
      });

      // Send random actions to the game server on an interval
      this.randomInterval = setInterval(() => {
        const rand = parseInt(Math.floor(Math.random() * 3), 10);
        this.webSocket.send(`{"rawActionDirection": ${rand}}`);
      }, 50);
    },
  },
};
</script>

<style scoped>
.interactive-snake-game {
  display: flex;
  flex-flow: column;

  width: 100%;
  height: 100%;
}

.options {
  flex: 0 1 auto;
}

.board {
  flex: 1 1 auto;
  width: 90vh;
  height: 100%;

  margin-left: auto;
  margin-right: auto;
}
</style>
