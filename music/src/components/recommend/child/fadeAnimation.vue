<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'FadeAnimation'
}
</script>

<style>
.v-enter,
.v-leave-to {
  height: 0%;
}
.v-enter-active,
.v-leave-active {
  transition: height 3.5s;
}
</style>
