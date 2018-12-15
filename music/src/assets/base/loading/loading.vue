<template>
  <div class="loading">
    <img width="48" height="48" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>
<style>
.loading {
  width: 100%;
  text-align: center;
}

.desc {
  margin-top: 0.2rem;
  line-height: 20px;
  font-size: 0.35rem;
  color: #ccc;
}
</style>
