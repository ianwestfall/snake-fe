<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Play</router-link> |
      <router-link to="/manage">Manage</router-link>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<style>
html, body {
  margin: 0;
  height: 100%;
}
</style>

<style scoped>
#app {
  display: flex;
  flex-flow: column;
  height: 100%;

  background-color: #32908f;
  font-family: 'Manrope', sans-serif;
  color: #a3e7fc;
}

#nav {
  text-align: center;
  flex: 0 1 auto;
}

.content {
  flex: 1 1 auto;
}

a {
  color: #a3e7fc;
}

h1 {
  font-weight: normal;
}
</style>
