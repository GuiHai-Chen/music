import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.scss'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import loading from './plugin/loading/index'

Vue.use(VueLazyload, {
  // 配置图片没被加载之前的占位图片
  loading: require('./assets/images/loading.png')
})
Vue.use(loading, {
  title: '正在拼命加载...'
})
fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
