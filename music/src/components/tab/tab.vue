<template>
  <div class="tab">
    <router-link tag="div"
                 class="tab-item"
                 to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div"
                 class="tab-item"
                 to="/rank">
      <span class="tab-link">排行榜
      </span>
    </router-link>
    <router-link tag="div"
                 class="tab-item"
                 to="/search">
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
}
.tab-item {
  flex: 1;
  text-align: center;
  height: 1.026rem;
  font-size: 0.437rem;
  line-height: 1.07rem;
  color: rgba(0, 0, 0, 0.6);
  border-bottom: 0.054rem solid #fff;
}
.router-link-active {
  color: #31c27c;
  border-bottom: 0.054rem solid #3bcfd6;
}
</style>
