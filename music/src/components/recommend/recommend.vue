<template>
  <div>
    <re-swiper :recommends='recommends' :swiperShow="swiperShow"></re-swiper>
    <re-hot @sendmsg="getMsg" :discList='discList'></re-hot>
  </div>
</template>

<script>
import ReSwiper from './child/swiper'
import ReHot from './child/hot'
import axios from 'axios'
import { getDiscList } from 'api/api.js'
import { ERR_OK } from 'api/config'
export default {
  name: 'recommend',
  data () {
    return {
      recommends: [],
      discList: [],
      swiperShow: true
    }
  },
  components: {
    ReSwiper,
    ReHot
  },
  mounted () {
    this.getRecommend()
    this._getDiscList()
  },
  methods: {
    getMsg (data) {
      this.swiperShow = data
    },
    getRecommend () {
      axios.get('api/getDiscLists')
        .then(res => {
          this.recommends = res.data.data.slider
        })
    },
    _getDiscList () {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
          console.log(this.discList)
        }
      })
    }
  }
}
</script>

<style>
</style>
