<template>
  <div class="player" v-show="playlist.length>0">
    <div class="normal-player" v-show="fullScreen">
      <div class="normal-top">
        <div class="normal-top-icon">
          <img src="../../assets/base/image/play0.png" alt="">
        </div>
      </div>
      <div class="normal-middle">
        <div class="normal-middle-cd"></div>
      </div>
      <div class="normal-bottom">
        <div class="normal-bottom-icon">
          <div><img src="../../assets/base/image/play1.png" alt=""></div>
          <div><img src="../../assets/base/image/play3.png" alt=""></div>
          <div><img class="normal-bottom-icon3" src="../../assets/base/image/play4.png" alt=""></div>
          <div><img src="../../assets/base/image/play6.png" alt=""></div>
          <div><img src="../../assets/base/image/play7.png" alt=""></div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Player',
  computed: {
    ...mapGetters([
      'playlist',
      'fullScreen'
    ])
  }

}
</script>

<style>
.player .normal-player {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: aliceblue;
  z-index: 150;
  background-color: black;
}
.player .mini-player {
  position: fixed;
  height: 1rem;
  left: 0;
  bottom: 0;
  right: 0;
  color: aliceblue;
  z-index: 150;
}
.normal-top {
  width: 100%;
  height: 0;
  padding-bottom: 20%;
}
.normal-top-icon {
  position: absolute;
  top: 0.25rem;
  left: 0.3rem;
  z-index: 110;
}
.normal-middle {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  display: flex;
  justify-content: center;
}
.normal-middle-cd {
  position: absolute;
  width: 8rem;
  height: 8rem;
  border: 10px solid hsla(0, 0%, 100%, 0.2);
  border-radius: 50%;
}
.normal-bottom {
  width: 100%;
  height: 0;
  padding-bottom: 57.8%;
}
.normal-bottom-icon {
  margin-top: 3.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.normal-bottom-icon3 {
  width: 1.2rem;
}
</style>
