import Vue from 'vue'
import Router from 'vue-router'
import News from 'components/news/news'
import Subscription from 'components/subscription/subscription'
import Fav from 'components/fav/fav'
import User from 'components/user/user'
import NewsDetail from 'components/news-detail/news-detail'
import SearchNews from 'components/search-news/search-news'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: News,
      redirect: '/news',
      children: [
        {
          name: 'newsDetail',
          path: '/news/detail',
          component: NewsDetail
        },
        {
          name: 'search',
          path: '/news/search',
          component: SearchNews
        }
      ]
    },
    {
      path: '/news',
      name: 'news',
      component: News
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
