<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Play</router-link> |
      <router-link to="/manage">Manage</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#nav {
  text-align: center;
}

body {
  background-color: #32908f;
  font-family: 'Manrope', sans-serif;
  color: #a3e7fc;
}

a {
  color: #a3e7fc;
}

h1 {
  font-weight: normal;
}
</style>
