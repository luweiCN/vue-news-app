<template>
  <div class="home">
    <div class="search" @click='goSearchNews'>
      <search-box @search='searchNews' :goBack='goBack' ref="search"></search-box>
    </div>
    <div class="scroll-tab">
      <scroll-tab :list='channelList' @selectTabEv="selectTab" v-if='channelList.length'></scroll-tab>
    </div>
    <div class="list-view">
      <news-list :list='showList' :channel='channel' @needLoadMore='loadmore'></news-list>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { getNewsList, getChannelList, searchNews } from 'api/news'
import { ERR_OK } from 'api/config'
import { setSearchHistory } from 'common/js/search-history'

// components
import ScrollTab from 'base/scroll-tab/scroll-tab'
import Scroll from 'base/scroll/scroll'
import SearchBox from 'base/search-box/search-box'
import NewsList from 'base/news-list/news-list'

const PAGE_SIZE = 15

export default {
  data () {
    return {
      channelList: [],
      newsList: {},
      page: {},
      channel: '',
      showList: [],
      isEnd: {},
      goBack: false
    }
  },
  components: {
    ScrollTab,
    Scroll,
    SearchBox,
    NewsList
  },
  created () {
    this.$nextTick(function () {
      this._getChannelList()
    })
  },
  methods: {
    _getChannelList () {
      getChannelList().then((res) => {
        if (parseInt(res.status) === ERR_OK) {
          this.channelList = res.result
          this.generateParams(this.channelList)
        }
      })
    },
    _getNewsList (channel, page) {
      if (page === 1) {
        this.newsList[channel] = []
      }
      getNewsList(channel, page, PAGE_SIZE).then((res) => {
        let num = res.result.num
        let list = res.result.list
        if (list.length) {
          this.page[channel] += 1
        }
        if (parseInt(res.status) === ERR_OK) {
          if (!this.newsList[channel]) {
            this.newsList[channel] = []
          }
          this.newsList[channel] = this.newsList[channel].concat(list)
          this.showList = this.newsList[channel]
          if (num >= PAGE_SIZE) {
            this.isEnd[channel] = false
          } else {
            this.isEnd[channel] = true
          }
        }
      })
    },
    generateParams (list) {
      list.map((v) => {
        this.page[v] = 1
        this.newsList[v] = []
      })
    },
    selectTab (channel) {
      this.channel = channel
      if (!this.newsList[channel].length) {
        this.showList = []
        this._getNewsList(channel, this.page[channel])
      } else {
        this.showList = this.newsList[channel]
      }
    },
    loadmore () {
      if (!this.isEnd[this.channel]) {
        this._getNewsList(this.channel, this.page[this.channel])
      }
    },
    searchNews (key) {
      this.$router.push('/news/search/' + key)
      setSearchHistory(key)
    },
    goSearchNews () {
      this.$router.push('/news/search')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.home
  position fixed
  top 0
  left 0
  right 0
  bottom 100px
  line-height $font-size-large-x * 2 /*px*/

.scroll-tab
  position fixed
  top 90px
  height 80px
  background #fff
  box-shadow 0px 1px 5px #999999 /*no*/
  border-bottom 2px solid $color-background-d
  z-index 10

.search
  position fixed
  top 0px
  left 0
  right 0
  height 90px
  background #fff
  z-index 10

.list-view
  overflow hidden
  position relative
  top 170px
  height calc(100% - 170px)
  bottom 0
</style>
