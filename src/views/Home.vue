<template>
  <div id="play">
    <h1>Play Snake</h1>
    <InteractiveSnake></InteractiveSnake>
  </div>
</template>

<script>
import InteractiveSnake from '@/components/interactive/InteractiveSnake.vue';

export default {
  name: 'Home',
  components: {
    InteractiveSnake,
  },
};
</script>

<style scoped>
#play {
  display: block;
  width: 100%;
  height: 90vh;
  text-align: center;
}

h1 {
  margin: 0;
}
</style>
