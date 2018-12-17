<template>
  <transition name='slider'>
    <div class="Detail">1</div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/api.js'
import { ERR_OK } from 'api/config'
export default {
  name: 'singerDetail',
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
          console.log(res.data.list)
        }
      })
    }
  }
}
</script>

<style>
.Detail {
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
