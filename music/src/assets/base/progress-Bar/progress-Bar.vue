<template>
  <div class="progress-box" ref="progressBox" @click="clickChange">
    <div class="progress" ref="progress"></div>
    <div class="progress-btn" ref="progressBtn" @touchstart.prevent="progressStart" @touchmove.prevent="progressMove" @touchend="progressEnd"></div>
  </div>
</template>

<script>
import { prefixStyle } from '../../api/dom.js'
const transform = prefixStyle('transform')
export default {
  name: 'progressBar',
  data () {
    return {
      Move: {}
    }
  },
  props: {
    percent: Number
  },
  watch: {
    percent (per) {
      if (per >= 0 && !this.Move.initiated) {
        const pro = this.$refs.progressBox.clientWidth - 17
        const ScrollWidth = pro * per
        this.moveTo(ScrollWidth)
      }
    }
  },
  methods: {
    moveTo (X) {
      this.$refs.progress.style.width = `${X}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${X}px,0,0)`
    },
    progressStart (e) {
      this.Move.initiated = true
      this.Move.startX = e.touches[0].pageX
      this.Move.left = this.$refs.progress.clientWidth
    },
    progressMove (e) {
      if (!this.Move.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.Move.startX
      const ScrollWidth = Math.min(this.$refs.progressBox.clientWidth - 17, Math.max(0, deltaX + this.Move.left))
      this.moveTo(ScrollWidth)
    },
    progressEnd (e) {
      this.Move.initiated = false
      this.changeProgress()
    },
    changeProgress () {
      const pro = this.$refs.progressBox.clientWidth - 17
      const pre = this.$refs.progress.clientWidth / pro
      this.$emit('changeProgress', pre)
    },
    clickChange (e) {
      this.moveTo(e.offsetX)
      this.changeProgress()
    }
  }
}
</script>

<style scoped>
.progress {
  background-color: #ffcd32;
  height: 0.15rem;
}
.progress-btn {
  position: relative;
  top: -18px;
  left: -2px;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  border: 6px solid #fff;
  border-radius: 50%;
  background: #ffcd32;
}
</style>
