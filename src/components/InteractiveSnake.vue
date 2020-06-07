<template>
  <div class="snake-game">
    <div>
      <span>
        <button @click="playGame">New game</button>
        <button @click="randomizeGame">Watch the computer play</button>
      </span>
    </div>
    <SnakeGame :game="game" v-if="game !== null"></SnakeGame>
  </div>
</template>

<script>
import SnakeGame from '@/components/SnakeGame.vue';
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
      randomInterval: null,
    };
  },
  methods: {
    connectToGameServer() {
      if (this.webSocket !== null) {
        this.webSocket.close();
      }

      const gameServer = process.env.VUE_APP_GAME_SERVER;
      this.webSocket = new WebSocket(gameServer);

      this.webSocket.onopen = () => {
        console.log(`Connected to game server at: ${gameServer}`);
      };

      this.webSocket.onclose = () => {
        console.log(`Connection to game server closed: ${gameServer}`);
      };

      this.webSocket.onerror = (err) => {
        console.error(`Error with connection to game server: ${gameServer}`);
        console.error(err);
        this.webSocket.close();
      };

      this.webSocket.onmessage = (message) => {
        const websocketEvent = JSON.parse(message.data);
        console.debug(websocketEvent);

        this.game = Game.fromWebsocketEvent(websocketEvent);

        if (this.game.gameOver && this.randomInterval !== null) {
          clearInterval(this.randomInterval);
          this.webSocket.close();
        }
      };
    },
    playGame() {},
    randomizeGame() {
      // Connect to the game server
      this.connectToGameServer();

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
.snake-game {
  position: relative;
  width: 40%;
  margin-left: 30%;
}

.snake-game:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
</style>
