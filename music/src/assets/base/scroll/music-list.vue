<template>
  <div class="music-list">
    <div class="back" @click="back">
      <img src="../image/back.png" alt="">
    </div>
    <h1 class="bgImge-title">{{title}}</h1>
    <div class="bgImge" :style="bgStyle" ref="bgImge">
      <div class="bgImge-mark">
      </div>
    </div>
    <scroll @scroll="scroll" :listenScroll="listenScroll" :probeType="probeType" :data="singerDetail" class="scroll">
      <div class="song-list-wrapper">
        <song-list @select="select" :singerDetail="singerDetail"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import songList from './song-list'
import scroll from './scroll'
import { mapActions } from 'vuex'
export default {
  name: 'musicList',
  data () {
    return {
      scrollY: 0
    }
  },
  props: {
    singerDetail: {
      type: Array
    },
    title: {
      type: String,
      default: '歌手名字'
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  created () {
    this.listenScroll = true
    this.probeType = 3
  },
  methods: {
    scroll (pos) {
      this.scrollY = pos.y
    },
    back () {
      this.$router.back()
    },
    select (item, index) {
      this.selectPlay({
        list: this.singerDetail,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.imgUrl})`
    }
  },
  watch: {
    scrollY (newY) {
      if (newY > 0) {
        let heght = newY / this.$refs.bgImge.offsetHeight
        let scale = 1 + heght
        this.$refs.bgImge.style['transform'] = `scale(${scale})`
      }
    }
  },
  components: {
    songList,
    scroll
  }

}
</script>

<style>
.music-list {
  background-color: #000;
}
.scroll {
  width: 100%;
  height: 10.78rem;
  overflow: hidden;
  background-color: #000;
}
.bgImge {
  width: 100%;
  padding-bottom: 70%;
  background-size: cover;
  transform-origin: top;
}
.bgImge-mark {
  width: 100%;
  height: 0;
  padding-bottom: 70%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
}
.bgImge-title {
  position: absolute;
  z-index: 101;
  width: 100%;
  text-align: center;
  font-size: 0.5rem;
  padding-top: 0.5rem;
  color: aliceblue;
}
.back {
  position: absolute;
  top: 0.25rem;
  left: 0.2rem;
  z-index: 110;
}
.back img {
  width: 0.8rem;
}
</style>
