<template>
  <div id="app">
    <BackendTest />
  </div>
</template>

<script>

import BackendTest from './components/Backend-Test'

export default {
  name: 'App',
  components: {
    BackendTest
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
