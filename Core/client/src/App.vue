<template>
  <div id="app">
    <!--<router-view/>-->
    <div class="grid-container">
      <Title />
      <Nav />
      <Tickets />
      <Map />
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav'
import Tickets from './components/Tickets'
import Map from './components/Map'
import Title from './components/Title'

export default {
  name: 'App',
  components: {
    Nav, Tickets, Map, Title
  }
}

</script>

<style lang="scss">
  @import './assets/styles.scss';

</style>
