// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import { Icon } from 'iview'

import 'common/stylus/index.styl'
import 'iview/dist/styles/iview.css'

import 'lib-flexible'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png'),
  error: require('common/image/error.png'),
  silent: true
})
Vue.component('Icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
