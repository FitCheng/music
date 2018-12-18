<template>
  <transition name='slider'>
    <div class="detail">
      <music-list :singerDetail="singerDetail" :title="title" :imgUrl="imgUrl">
      </music-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/api.js'
import { ERR_OK } from 'api/config'
import { createSong } from 'api/song.js'
import musicList from 'base/scroll/music-list'
export default {
  name: 'singerDetail',
  data () {
    return {
      singerDetail: [],
      imgUrl: '',
      title: ''
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getSinger()
  },
  methods: {
    _getSinger () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.singerDetail = this._normalizeSongs(res.data.list)
          this.imgUrl = 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + this.singer.id + '.jpg'
          this.title = this.singer.name
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item, index) => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    musicList
  }
}
</script>

<style>
.detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
}
.slider-enter-active,
.slider-leave-active {
  transition: transform 0.3s;
}
.slider-enter,
.slider-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
