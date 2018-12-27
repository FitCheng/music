<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <router-view />
    <player></player>
  </div>
</template>

<script>
import Tab from '@/components/tab/tab'
import MHeader from '@/components/tab/m-header'
import Player from '@/components/player/player'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style>
#app {
  background-color: #333;
}
</style>
