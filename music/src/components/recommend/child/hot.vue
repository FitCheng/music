<template>
  <div>
    <h1 class="hot-h1">热门歌单推荐</h1>
    <div class="hot" ref="hotScroll">
      <div>
        <div class="hotList" v-for="item in discList" :key="item.id" @touchstart="handleTouchStart">
          <img class="hotImg" :src="item.imgurl" alt="">
          <div class="hotText">
            <p class="Text-1">{{item.creator.name}}</p>
            <p class="Text-2">{{ item.dissname}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: 'hot',
  data () {
    return {
      swiperShow: true
    }
  },
  props: {
    discList: Array
  },
  mounted () {
    this.$refs.hotScroll.addEventListener('scroll', this.handleScroll)
    this.scroll = new Bscroll(this.$refs.hotScroll)
  },
  methods: {
    sendMsg () {
      this.$emit('sendmsg', this.swiperShow)
    },
    handleTouchStart (e) {
      if (e.target.offsetTop > 600) {
        this.swiperShow = false
        this.sendMsg()
      }
    }
  }
}
</script>

<style>
.hot {
  overflow: hidden;
  height: 10.11rem;
  background-color: black;
}
.hot-h1 {
  width: 100%;
  text-align: center;
  font-size: 0.43rem;
  padding: 0.5rem 0 0.5rem 0;
  color: #ffcd32;
  background-color: black;
}
.hotList {
  margin-top: 0.5rem;
  display: flex;
  overflow: hidden;
}
.hotImg {
  width: 2rem;
  height: 2rem;
  margin: 0 0 0 0.5rem;
}
.hotText {
  flex: 1;
}
.Text-1 {
  margin: 0.1rem 0 0 0.4rem;
  font-size: 0.45rem;
  color: #ddd;
}
.Text-2 {
  margin: 0.7rem 0 0 0.4rem;
  font-size: 0.35rem;
  color: #888;
}
</style>
