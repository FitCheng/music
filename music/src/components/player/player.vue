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
        <div class="progress-bar">
          <span class="time-l">{{changeTime(currentTime)}}</span>
          <div class="progress">
            <progress-bar :percent="percent" @changeProgress="changeProgress"></progress-bar>
          </div>
          <span class="time-r">{{changeTime(currentSong.duration)}}</span>
        </div>
        <div class="normal-bottom">
          <div class="normal-bottom-icon">
            <div><span class="iconfont">&#xe672;</span></div>
            <div><span @click="lastSong" class="iconfont">&#xe615;</span></div>
            <div class="normal-bottom-icon3">
              <span @click="songPlay" :class="Play"></span>
            </div>
            <div><span @click="nextSong" class="iconfont">&#xe614;</span></div>
            <div>
              <span @click="collection" class="iconfont">&#xe6a7;</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="video" autoplay @timeupdate="updateTime" muted></audio>
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
          <div class="mini-music-img1"><span @click="songPlay" :class="Play"></span></div>
          <div class="mini-music-img2">
            <span @click="closeMini" class="iconfont">&#xe674;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import progressBar from '../../assets/base/progress-Bar/progress-Bar'
export default {
  name: 'Player',
  data () {
    return {
      index: 1,
      currentTime: 0,
      allTime: 0
      // Play: ''
    }
  },
  computed: {
    Play () {
      return this.playing ? 'iconfont icon-zanting' : 'iconfont icon-bofang'
    },
    percent () {
      return this.currentTime / this.currentSong.duration
    },
    ...mapGetters([
      'playlist',
      'fullScreen',
      'currentSong',
      'miniScreen',
      'playing',
      'currentIndex'
    ]),
    miniChange () {
      // this.Play = this.playing ? 'iconfont icon-bofang' : 'iconfont icon-zanting'
      return this.miniScreen && (!this.fullScreen)
    }
  },
  watch: {
    playing (newplaying) {
      const video = this.$refs.video
      this.$nextTick(() => {
        newplaying ? video.play() : video.pause()
        this.$refs.normalCd.className = this.playing ? 'normal-middle-cd2  ' : 'normal-middle-cd1'
        this.$refs.miniCd.className = this.playing ? 'mini-cd2' : 'mini-cd1'
      })
    }
  },
  methods: {
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    close () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    closeMini () {
      this.setMiniScreen(false)
      this.setPlayingState(false)
    },
    songPlay () {
      this.setPlayingState(!this.playing)
    },
    lastSong () {
      let max = this.playlist.length - 1
      if (this.currentIndex === 0) {
        this.setCurrentIndex(max + 1)
      }
      this.setCurrentIndex(this.currentIndex - 1)
      if (!this.playing) {
        this.songPlay()
      }
      if (this.playing) {
        this.setPlayingState(true)
      }
    },
    nextSong () {
      let max = this.playlist.length - 1
      if (this.currentIndex === max) {
        this.setCurrentIndex(-1)
      }
      this.setCurrentIndex(this.currentIndex + 1)
      if (!this.playing) {
        this.songPlay()
      }
    },
    // 时间换算
    changeTime (time) {
      time = time | 0
      let min = time / 60 | 0
      let sec = this._pad(time % 60)
      return `${min}:${sec}`
    },
    // 补零函数
    _pad (num, n = 2) {
      let len = num.toString().length
      if (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    changeProgress (pre) {
      this.$refs.video.currentTime = this.currentSong.duration * pre
    },
    /* 收藏歌曲 */
    collection () {

    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setMiniScreen: 'SET_MINI_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  },
  components: {
    progressBar
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
  height: 15vh;
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
  height: 55vh;
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
/*进度条*/
.progress-bar {
  margin-top: 2rem;
  display: flex;
  align-items: center;
}
.time-l {
  margin-left: 1rem;
  margin-right: 0.1rem;
}
.time-r {
  margin-left: 0.1rem;
  margin-right: 1rem;
}
.progress {
  height: 0.15rem;
  flex: 1;
  background-color: #444;
  border-radius: 0.5rem;
}
.normal-bottom {
  width: 100%;
  height: 30vh;
}
.normal-bottom-icon {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.normal-bottom-icon3 span {
  font-size: 90px;
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
  margin-right: 0.2rem;
  align-items: center;
  flex: 1;
  display: flex;
}
.mini-music-img2 span {
  font-size: 98px;
}
.mini-music-img1 {
  display: flex;
  align-items: center;
  margin-right: 0.2rem;
  flex: 1;
}
</style>
