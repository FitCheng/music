<template>
  <div>
    <div class="singer" ref="singerScroll">
      <div>
        <div v-for="item in singerList" :key="item.id">
          <h1 class="singer-title">{{item.title}}</h1>
          <div class="singer-box" v-for="item in item.items" :key="item.id">
            <img class="singer-img" :src="item.imgUrl" alt="">
            <p class="singer-name">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerList } from 'api/api.js'
import BScroll from 'better-scroll'
import { pinyin } from 'api/change.js'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  name: 'singer',
  data () {
    return {
      singer: [],
      singerList: []
    }
  },
  mounted () {
    this._getSingerList()
    this.scroll = new BScroll(this.$refs.singerScroll)
  },
  methods: {
    _getSingerList () {
      getSingerList().then(res => {
        this.singer = res.singerList.data.singerlist
        this.singerList = this.getNormalList(this.singer)
      })
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
            imgUrl: item.singer_pic
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
          imgUrl: item.singer_pic
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
      console.log(hot.concat(ret))
      return hot.concat(ret)
    }
  }
}
</script>

<style>
.singer {
  height: 14.04rem;
  overflow: hidden;
  padding-top: 0.5rem;
  background-color: #000;
}
.singer-hot {
  height: 1rem;
  background-color: #333;
  color: #fff;
}
.singer-title {
  padding: 0.3rem 0.3rem 0.3rem 0.6rem;
  font-size: 0.4rem;
  color: #ccc;
  background-color: rgb(29, 28, 28);
}
.singer-box {
  display: flex;
  padding: 0.5rem 0 0.5rem 0.8rem;
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
</style>
