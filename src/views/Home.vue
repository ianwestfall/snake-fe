<template>
  <div id="play">
    <h1>Play Snake</h1>
    <InteractiveSnake></InteractiveSnake>
  </div>
</template>

<script>
import InteractiveSnake from '@/components/InteractiveSnake.vue';

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
  text-align: center;
}
</style>
