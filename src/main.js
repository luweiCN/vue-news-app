// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png'),
<<<<<<< HEAD
  error: require('common/image/error.png'),
  silent: true
=======
  error: require('common/image/error.png')
>>>>>>> 6bafb0857e6f30ee3ed703cea3bfd42eaac20dcf
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
