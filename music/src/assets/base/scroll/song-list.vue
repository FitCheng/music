<template>
  <div>
    <div class="song" @click="setSongList(item,index)" v-for="(item,index) in singerDetail" :key="item.id">
      <div class="content">
        <h2 class="name">{{item.name}}</h2>
        <p class="desc">{{getDesc(item)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songList',
  props: {
    singerDetail: {
      type: Array
    }
  },
  methods: {
    getDesc (song) {
      return `${song.singer}·${song.album}`
    },
    setSongList (item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>

<style>
.content {
  padding: 0.3rem 0 0.4rem 0.8rem;
}
.content .name {
  color: aliceblue;
  font-size: 0.4rem;
}
.content .desc {
  color: #666;
  font-size: 0.4rem;
}
</style>
