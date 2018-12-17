// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import './assets/styles/reset.css'
import './assets/api/rem'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyLoad from 'vue-lazyload'
import 'swiper/dist/css/swiper.css'
import store from './store'

Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(VueLazyLoad, {
  loading: require('base/image/pig.png'),
  preLoad: 1.3,
  error: 'dist/error.png',
  attempt: 1
})
Vue.config.productionTip = false
fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
