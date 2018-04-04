// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import showdown from 'showdown'
import App from './App'
import router from './router'

// 请求中加入 token
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('koa-blog');
  if (token != null) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
  next()
})

import layout from '@/components/Layout'
Vue.use(layout)
Vue.use(ElementUI)
Vue.prototype.$http = Axios
Vue.prototype.$converter = new showdown.Converter()
Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
