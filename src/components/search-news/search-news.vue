<template>
 <transition name='slide'>
    <div class="search-news">
      <scroll :click='true' :data='{historyList, hots}'>
        <div>
          <div class="search-history" v-if='historyList.length'>
            <h2 class="search-title">搜索历史</h2>
            <ul class="history-box">
              <li class="history" v-for="(item, index) in historyList" :key='index'>
                <span class="history-text" @click="searchHistory(item)">{{item}}</span>
                <div class="delete-history" @click='deleteHistory(item)'>
                  <icon type="ios-close-empty"></icon>
                </div>
              </li>
            </ul>
          </div>
          <div class="hot-news">
            <h2 class="search-title">热门搜索</h2>
            <ul class="hot-box">
              <li class="hot" v-for='(hot, index) in hots' :key="index" @click="searchHot(hot)">
                <span class="hot-index">{{index + 1 + '.'}}</span>
                <span class="hot-text">{{hot}}</span>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import { getHot } from 'api/news'
import { ERR_OK } from 'api/config'
import { hasSpecailchar } from 'common/js/utils'
import { setSearchHistory, getSearchHistory, deleteSearchHistory } from 'common/js/search-history'

import Scroll from 'base/scroll/scroll'
export default {
  data () {
    return {
      hots: [],
      historyList: []
    }
  },
  created () {
    this.getHotNewsKey()
    this.historyList = getSearchHistory()
  },
  methods: {
    getHotNewsKey () {
      getHot().then((res) => {
        if (parseInt(res.data.showapi_res_code) === ERR_OK) {
          this.hots = this.normalizeHotKeys(res.data.showapi_res_body.pagebean.contentlist)
        }
      })
    },
    normalizeHotKeys (list = []) {
      let res = []
      list.forEach((item) => {
        if (!hasSpecailchar(item.title) && item.title.length <= 21 && res.length < 10) {
          res.push(item.title)
        }
        if (res.length >= 10) {
          return res
        }
      })

      return res
    },
    _search (key) {
      this.$router.push('/news/search/' + key)
    },
    searchHistory (key) {
      this._search(key)
      setSearchHistory(key)
      this.historyList = getSearchHistory()
    },
    searchHot (key) {
      this._search(key)
    },
    deleteHistory (key) {
      deleteSearchHistory(key)
      this.historyList = getSearchHistory()
    }
  },
  components: {
    Scroll
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      vm.historyList = getSearchHistory()
      vm.$parent.goBack = true
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$parent.$refs.search.query = ''
    this.$parent.goBack = false
    this.$parent.$refs.search.blur()
    this.historyList = getSearchHistory()
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.slide-enter-active {
  animation: slide-in .5s;
}
.slide-leave-active {
  animation: slide-in .5s reverse;
}
@keyframes slide-in {
  0% {
    height 0
  }
  100% {
    height 100%
  }
}

// .slide-enter-active, .slide-leave-active
//   transition all .2s ease-in-out
//   animation slide-in .5s

// .slide-enter, .slide-leave-to
//   transform: translate3d(0, 0, 0)
//   opacity: 0.8

.search-news
  text-align left
  position fixed
  top 90px
  bottom 0
  z-index 100
  width 100%
  // height 100%
  padding 20px 30px 0 30px
  background rgba(255, 255, 255, 1)
  overflow hidden

.search-title
  font-size $font-size-content-info
  color $color-content-title
  font-weight 700
  margin-bottom 10px

.history-box
  display flex
  flex-direction row
  flex-wrap wrap

.history
  display flex
  align-items center
  justify-content space-between
  padding 0
  background #F6F6F6
  border-radius 150px
  margin 0 20px 20px 0
  word-break keep-all
  text-overflow ellipsis
  overflow hidden

.history-text
  display inline-block
  padding 0 20px
  line-height 50px
  max-width 550px

.delete-history
  width 50px
  height 50px
  font-size 50px
  text-align center
  line-height 50px

.hot
  height 72px
  border-bottom 1px solid #E4E4E4
  display flex
  flex-direction row
  justify-content flex-start
  align-items center

.hot:nth-child(1)
  border-top 1px solid #E4E4E4
  .hot-index
    color #EB5449
    font-weight 600

.hot:nth-child(2) .hot-index
  color #F2A262
  font-weight 600

.hot:nth-child(3) .hot-index
  color #F6C755
  font-weight 600

.hot-index
  display inline-block
  width 40px
  font-size 26px
.hot-text
  font-size 26px
  color #333
</style>
