<template>
  <re-swiper :recommends='recommends'></re-swiper>
</template>

<script>
import ReSwiper from './child/swiper'
import axios from 'axios'
export default {
  name: 'recommend',
  data () {
    return {
      recommends: []
    }
  },
  components: {
    ReSwiper
  },
  mounted () {
    this.getRecommend()
  },
  methods: {
    getRecommend () {
      axios.get('api/getDiscLists')
        .then(res => {
          this.recommends = res.data.data.slider
          console.log(this.recommends)
        })
    }
  }
}
</script>

<style>
</style>
