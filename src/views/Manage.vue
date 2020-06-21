<template>
  <div class="full-height">
    <SnakeManager></SnakeManager>
  </div>
</template>

<script>
import SnakeManager from '@/components/manager/SnakeManager.vue';

export default {
  name: 'Manager',
  components: {
    SnakeManager,
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
