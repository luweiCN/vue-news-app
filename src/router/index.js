import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index/index'
import Subscription from 'components/subscription/subscription'
import Fav from 'components/fav/fav'
import User from 'components/user/user'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Index
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: Subscription
    },
    {
      path: '/fav',
      name: 'fav',
      component: Fav
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
