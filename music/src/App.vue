<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view />
  </div>
</template>

<script>
import Tab from '@/components/tab/tab'
import MHeader from '@/components/tab/m-header'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style>
#app {
  background-color: black;
}
</style>
