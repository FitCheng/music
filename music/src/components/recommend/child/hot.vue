<template>
  <div class="hot">
    <h1 class="hot-h1">热门歌单推荐</h1>
    <scroll ref="scroll" class="hot-scroll" :data="discList">
      <div>
        <div class="hotList" v-for="item in discList" :key="item.id" @touchstart="handleTouchStart">
          <img class="hotImg" v-lazy="item.imgurl" alt="">
          <div class="hotText">
            <p class="Text-1">{{item.creator.name}}</p>
            <p class="Text-2">{{ item.dissname}}</p>
          </div>
        </div>
        <loading class="loading" v-show="!discList"></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
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
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style>
.hot-scroll {
  overflow: hidden;
  height: 9.63rem;
  background-color: black;
  padding-top: 0.5rem;
  position: relative;
}
.hot-h1 {
  width: 100%;
  text-align: center;
  font-size: 0.41rem;
  padding: 0.5rem 0 0.5rem 0;
  color: #ffcd32;
  background-color: black;
}
.hotList {
  display: flex;
  overflow: hidden;
}
.hotImg {
  width: 2rem;
  height: 2rem;
  margin: 0 0 0.5rem 0.5rem;
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
.loading {
  position: absolute;
  top: 25%;
}
</style>
