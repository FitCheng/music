<template>
  <div class="scroll-box">
    <scroll ref="scroll" class="singer" :data="singerList" @scroll='scroll' :listenScroll="listenScroll" :probeType="probeType">
      <div>
        <div v-for="item in singerList" :key="item.id" ref="titleList">
          <h1 class="singer-title">{{item.title}}</h1>
          <div @click="goDetail(item)" class="singer-box" v-for="item in item.items" :key="item.id">
            <img class="singer-img" v-lazy="item.imgUrl" alt="">
            <p class="singer-name">{{`${item.name}(${item.country})`}}</p>
          </div>
        </div>
        <loading class="loading" v-show="!singerList"></loading>
      </div>
      <h1 class="singer-title-fixed" v-show="fixedTitle" ref="diffFixed">{{fixedTitle}}</h1>
    </scroll>
    <div class="list-shortcut" @touchstart="onTouchStart" @touchmove.stop.prevent="onTouchMove">
      <ul>
        <li v-for="(item,index) in singerList" :key="item.id" class="item" :class="{'current':currentIndex===index}" :data-index="index">
          {{item.title.substr(0,1)}}
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from 'api/api.js'
import Scroll from 'base/scroll/scroll'
import { pinyin } from 'api/change.js'
import { ERR_OK } from 'api/config.js'
import Loading from 'base/loading/loading'
import { getData } from 'api/dom.js'
import { mapMutations } from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
const LETTER_HIGHT = 39
const DIFF = 76

export default {
  name: 'singer',
  data () {
    return {
      singer: [],
      singerList: [],
      moveObj: {},
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    this.listHeight = []
  },
  mounted () {
    this._getSingerList()
  },
  methods: {
    goDetail (item) {
      this.$router.push({
        path: `/singer/${item.id}`
      })
      this.setSinger(item)
    },
    _getSingerList () {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singer = res.singerList.data.singerlist
          this.singerList = this.getNormalList(this.singer)
        }
      })
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.titleList
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    getNormalList (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push({
            name: item.singer_name,
            imgUrl: item.singer_pic,
            country: item.country,
            id: item.singer_mid
          })
        }
        const key = pinyin.getFullChars(item.singer_name).substring(0, 1)
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
          name: item.singer_name,
          imgUrl: item.singer_pic,
          country: item.country,
          id: item.singer_mid
        })
      })
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    onTouchStart (e) {
      let touchIndex = getData(e.target, 'index')
      this.moveObj.firstMove = e.touches[0].pageY
      this.moveObj.index = touchIndex
      this.scrollTo(touchIndex)
      this.currentIndex = touchIndex
    },
    onTouchMove (e) {
      this.moveObj.nextMove = e.touches[0].pageY
      let move = (this.moveObj.nextMove - this.moveObj.firstMove) / LETTER_HIGHT | 0
      this.scrollTo(Number(this.moveObj.index) + move)
    },
    scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index] - Math.random() / 1000000000
      this.$refs.scroll.scrollToElement(this.$refs.titleList[index])
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  watch: {
    singerList () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      this.currentIndex = listHeight.length - 2
    },
    diff (newDiff) {
      let fixedTop = (newDiff > 0 && newDiff < DIFF) ? newDiff - DIFF : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.diffFixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  computed: {
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.singerList[this.currentIndex] ? this.singerList[this.currentIndex].title : ''
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style>
.singer {
  height: 88vh;
  overflow: hidden;
  padding-top: 0rem;
  background-color: #000;
  position: relative;
}
.singer-hot {
  height: 1rem;
  background-color: #333;
  color: #fff;
}
.singer-title {
  height: 1rem;
  padding: 0rem 0.15rem 0rem 0.6rem;
  line-height: 1rem;
  font-size: 0.4rem;
  color: #ccc;
  background-color: rgb(29, 28, 28);
}
.singer-box {
  display: flex;
  padding: 0rem 0 0rem 0.8rem;
  height: 2.1rem;
  color: #999;
  font-size: 0.5rem;
  align-items: center;
  border-top: 1px solid #666;
}
.singer-img {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.75rem;
}
.singer-name {
  font-size: 0.4rem;
  padding-left: 0.5rem;
}
.loading {
  position: absolute;
  top: 50%;
}
.list-shortcut {
  position: absolute;
  top: 25%;
  right: 0;
  color: #aaa;
}
.list-shortcut .item {
  padding: 0.1rem;
}
.current {
  color: #ffcd32;
}
.singer-title-fixed {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  position: absolute;
  top: 0;
  padding: 0rem 0.15rem 0rem 0.6rem;
  font-size: 0.4rem;
  color: #ccc;
  background-color: rgb(29, 28, 28);
  /* background-color: #fff; */
}
</style>
