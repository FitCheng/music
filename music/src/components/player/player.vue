<template>
  <div class="player" v-show="playlist.length>0">
    <transition name="openClose">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image" alt="">
        </div>
        <div class="normal-top">
          <div class="normal-top-icon" @click="close">
            <img src="../../assets/base/image/play0.png" alt="">
          </div>
          <p class="normal-top-title">{{currentSong.name}}</p>
          <p class="normal-top-name">{{currentSong.singer}}</p>
        </div>
        <div class="normal-middle">
          <div class="normal-middle-cd">
            <img class="normal-middle-cd1" :src="currentSong.image" alt="" ref="normalCd">
          </div>
        </div>
        <div class="normal-bottom">
          <div class="normal-bottom-icon">
            <div><img class="normal-bottom-icon1" src="../../assets/base/image/play1.png" alt=""></div>
            <div><img @click="lastSong" class="normal-bottom-icon1" src="../../assets/base/image/play3.png" alt=""></div>
            <div>
              <img @click="songPlay" v-show="!playing" class="normal-bottom-icon3" src="../../assets/base/image/play5.png" alt="">
              <img @click="songPause" v-show="playing" class="normal-bottom-icon3" src="../../assets/base/image/play4.png" alt="">
            </div>
            <div><img @click="nextSong" class="normal-bottom-icon1" src="../../assets/base/image/play6.png" alt=""></div>
            <div>
              <img @click="collection" class="normal-bottom-icon1" src="../../assets/base/image/play7.png" alt="">
              <!-- <img @click="unCollection" class="normal-bottom-icon1" src="../../assets/base/image/play8.png" alt=""> -->
            </div>
          </div>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="video"></audio>
    <div class="mini-player" v-show="miniChange">
      <div class="mini-icon">
        <div class="mini-icon-box">
          <img class="mini-cd1" :src="currentSong.image" alt="" ref="miniCd">
        </div>
        <div @click="open" class="mini-text-box">
          <p class="mini-title">{{currentSong.name}}</p>
          <p class="mini-name">{{currentSong.singer}}</p>
        </div>
        <div class="mini-music-box">
          <img @click="songPlay" v-show="!playing" class="mini-music-img1" src="../../assets/base/image/play5.png" alt="">
          <img @click="songPause" v-show="playing" class="mini-music-img1" src="../../assets/base/image/play4.png" alt="">
          <img @click="closeMini" class="mini-music-img2" src="../../assets/base/image/music.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Player',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'playlist',
      'fullScreen',
      'currentSong',
      'miniScreen',
      'playing',
      'currentIndex'
    ]),
    miniChange () {
      return this.miniScreen && (!this.fullScreen)
    }
  },
  methods: {
    close () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    closeMini () {
      this.setMiniScreen(false)
      this.$refs.video.pause()
      this.setPlaying(false)
      this.$refs.normalCd.className = 'normal-middle-cd1'
      this.$refs.miniCd.className = 'mini-cd1'
    },
    songPlay () {
      this.$refs.video.play()
      this.setPlaying(true)
      this.$refs.normalCd.className = 'normal-middle-cd2'
      this.$refs.miniCd.className = 'mini-cd2'
    },
    songPause () {
      this.$refs.video.pause()
      this.setPlaying(false)
      this.$refs.normalCd.className = 'normal-middle-cd1'
      this.$refs.miniCd.className = 'mini-cd1'
    },
    lastSong () {
      if (this.currentIndex === 0) {
        return this.setCurrentIndex(0)
      }
      this.setCurrentIndex(this.currentIndex - 1)
    },
    nextSong () {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    collection () {

    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setMiniScreen: 'SET_MINI_SCREEN',
      setPlaying: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  }

}
</script>

<style scoped>
@keyframes rotate {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
.openClose-enter-active,
.openClose-leave-active {
  transition: transform 0.3s;
}
.openClose-enter,
.openClose-leave-to {
  transform: translate3d(0, 100%, 0);
}
.player .normal-player {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: aliceblue;
  z-index: 200;
  background-color: #000;
}
.background {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: -100;
  opacity: 0.6;
  filter: blur(10px);
}
.normal-top {
  width: 100%;
  height: 0;
  padding-bottom: 25%;
}
.normal-top-icon {
  position: absolute;
  top: 0.25rem;
  left: 0.3rem;
  z-index: 110;
}
.normal-top-icon img {
  width: 0.8rem;
}
.normal-top-title {
  padding: 0.5rem 0 0.3rem 0;
  font-size: 0.5rem;
  text-align: center;
  color: #eee;
}
.normal-top-name {
  font-size: 0.4rem;
  text-align: center;
  color: #eee;
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
.normal-middle-cd1 {
  width: 8rem;
  border-radius: 50%;
}
.normal-middle-cd2 {
  width: 8rem;
  border-radius: 50%;
  animation: rotate 20s linear infinite;
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
.normal-bottom-icon .normal-bottom-icon3 {
  width: 1.2rem;
}
.normal-bottom-icon .normal-bottom-icon1 {
  width: 1rem;
}
.player .mini-player {
  position: fixed;
  height: 1.6rem;
  left: 0;
  bottom: 0;
  right: 0;
  color: aliceblue;
  z-index: 150;
  background-color: #222;
}
.mini-icon {
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
}
.mini-icon-box {
  height: 100%;
  padding: 0.4rem 0.3rem 0 0.5rem;
}
.mini-cd1 {
  width: 1.2rem;
  border-radius: 50%;
}
.mini-cd2 {
  width: 1.2rem;
  border-radius: 50%;
  animation: rotate 20s linear infinite;
}
.mini-text-box {
  flex: 1;
  height: 100%;
}
.mini-title {
  font-size: 0.4rem;
  color: aliceblue;
  margin: 0.3rem 0 0.25rem 0;
}
.mini-name {
  font-size: 0.4rem;
  color: #666;
}
.mini-music-box {
  /* flex: 1; */
  display: flex;
  height: 100%;
  justify-content: flex-end;
}
.mini-music-img2 {
  width: 1.4rem;
  height: 1.4rem;
  margin-right: 0.2rem;
}
.mini-music-img1 {
  padding-top: 0.3rem;
  width: 0.9rem;
  height: 0.9rem;
  margin-right: 0.2rem;
}
</style>
