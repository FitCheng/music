<template>
  <transition>
    <swiper :options="swiperOption" ref="mySwiper" v-if="showSwiper">
      <!-- slides -->
      <swiper-slide v-for="item of recommends" :key="item.id">
        <a :href="item.linkUrl">
          <img class="swiper-img" :src="item.picUrl" alt="">
        </a>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </transition>
</template>

<script>
export default {
  name: 'ReSwiper',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        autoplay: true,
        speed: 3000,
        loop: true,
        autoplayDisableOnInteraction: false
      }
    }
  },
  components: {
  },
  props: {
    recommends: Array,
    swiperShow: Boolean
  },
  computed: {
    showSwiper () {
      return this.recommends.length
    },
    showSwiper2 () {
      return this.swiperShow
    }
  }
}
</script>

<style>
.swiper-img {
  width: 100%;
  height: 40%;
}
.swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 0 0.213rem;
}
.swiper-pagination-bullet {
  width: 0.213rem;
  height: 0.213rem;
}
.swiper-pagination-bullet-active {
  background-color: #fff;
}
</style>
