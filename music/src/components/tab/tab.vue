<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行榜
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style>
.tab {
  display: flex;
  height: 5.5vh;
  background-color: #333;
}
.tab-item {
  flex: 1;
  text-align: center;
  /* height: 0.916rem; */
  font-size: 0.437rem;
  line-height: 1rem;
  color: #666;
  border-bottom: 0.054rem solid #333;
}
.router-link-active {
  color: #ccc;
  border-bottom: 0.054rem solid #ccc;
}
</style>
