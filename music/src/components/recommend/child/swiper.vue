<template>
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
  props: {
    recommends: Array
  },
  computed: {
    showSwiper () {
      return this.recommends.length
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
