<template>
  <div class="home">
    <div class="search" @click='goSearchNews'>
      <search-box @search='searchNews' :goBack='true'></search-box>
    </div>
    <div class="scroll-tab">
      <scroll-tab :list='channelList' @selectTabEv="selectTab" v-if='channelList.length'></scroll-tab>
    </div>
    <div class="news-list">
      <scroll :data='newsList[channel]' :click='true' :pullup='true' @scrollToEnd='loadmore' ref="scroll">
        <div>
          <ul class="container">
            <router-link tag="li" :to="{name: 'newsDetail', params: {news: item, channel}}" class="news-item" v-for='(item, index) in newsList[channel]' :key='index'>
              <div class="item-no-pic news" v-if="!item.pic">
                <p class="item-no-pic-title title">{{item.title}}</p>
                <p class="item-no-pic-info info">{{item.src}}<span v-if="item.src">&nbsp;&nbsp;</span>{{item.time}}</p>
              </div>
              <div class="item-one-pic news" v-if="item.pic">
                <div class="text-info">
                  <p class="item-one-pic-title title">{{item.title}}</p>
                  <p class="info">{{item.src}}<span v-if="item.src">&nbsp;&nbsp;</span>{{item.time}}</p>
                </div>
                <div class="image-container">
                  <img class="image" v-lazy='item.pic'>
                </div>
              </div>
              <!-- <div class="item-more-pic news" v-if="item.havePic && item.imageurls.length > 1">
                <p class="item-no-pic-title title">{{item.title}}</p>
                <p class="info">{{item.source}}&nbsp;&nbsp;{{item.pubDate}}</p>
                <div class="image-container-box">
                  <div class="image-container" v-for='(image, num) in item.imageurls' :key='num' v-if="num < 3">
                    <img class="image" v-lazy='image.url'>
                  </div>
                </div>
              </div> -->
            </router-link>
          </ul>
          <vue-loading ref="loading" type="bubbles" color="#d9544e" :size="{ width: '50px', height: '50px' }" v-show="loading"></vue-loading>
        </div>
      </scroll>
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
import VueLoading from 'vue-loading-template'
import Scroll from 'base/scroll/scroll'
import SearchBox from 'base/search-box/search-box'

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
      loading: false
    }
  },
  components: {
    ScrollTab,
    VueLoading,
    Scroll,
    SearchBox
  },
  created () {
    this._getChannelList()
  },
  methods: {
    _getChannelList () {
      this.loading = true
      getChannelList().then((res) => {
        if (parseInt(res.status) === ERR_OK) {
          this.channelList = res.result
          this.generateParams(this.channelList)
        }

        this.loading = false
      })
    },
    _getNewsList (channel, page) {
      this.loading = true
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
          if (num >= PAGE_SIZE) {
            this.isEnd[channel] = false
          } else {
            this.isEnd[channel] = true
          }
        }

        this.loading = false
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
        this._getNewsList(channel, this.page[channel])
      }
    },
    loadmore () {
      if (this.loading) {
        return
      }
      if (!this.isEnd[this.channel]) {
        this._getNewsList(this.channel, this.page[this.channel])
      }
    },
    searchNews (key) {
      setSearchHistory(key)
      searchNews(key).then((res) => {
        if (parseInt(res.status) === ERR_OK) {
          console.log(res)
        }
      })
    },
    goSearchNews () {
      this.$router.push('/news/search')
    }
  },
  watch: {
    loading () {
      this.$refs.scroll.refresh()
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
  height 80px
  top 85px
  left 0
  right 0
  z-index 10
  background #fff
  box-shadow 0px 1px 5px #999999 /*no*/
  border-bottom 2px solid $color-background-d

.title
  font-weight 500
  font-size $font-size-medium * 2 /*px*/
  width 490px

.info
  font-size $font-size-small * 2 /*px*/
  width 490px

.news-list
  position absolute
  top 170px
  bottom 0
  width 100%
  overflow hidden
  padding-bottom 100px

.news-item
  padding 20px
  padding-top 0
  font-size $font-size-medium-x * 2 /*px*/

.item-no-pic
  display flex
  flex-direction column
  justify-content space-between
  text-align left
  border-top 1px solid $color-background-d /*no*/
  padding-top 20px

  .item-no-pic-title, .item-no-pic-info
    width 100%

.desc
  font-size $font-size-medium * 2 /*px*/
  max-height $font-size-large-x * 4 /*px*/
  line-height $font-size-large-x * 2 /*px*/
  display -webkit-box
  overflow hidden
  white-space normal
  text-overflow: ellipsis
  word-wrap break-word
  -webkit-line-clamp 2
  -webkit-box-orient vertical

.image-container
  width 200px
  height 160px
  overflow hidden
  border-radius 1px /*no*/

.image
  width 100%
  min-height 160px

.item-one-pic
  text-align left
  display flex
  flex-direction row
  justify-content space-between
  border-top 1px solid $color-background-d /*no*/
  padding-top 20px
  .text-info
    display flex
    flex-direction column
    justify-content space-between
    .title
      width 480px

.item-more-pic
  text-align left
  border-top 1px solid $color-background-d /*no*/
  padding-top 20px
  .image-container-box
    display flex
    flex-direction row
    .image-container
      padding-right 20px

li:first-child .news
  border none

.search
  height 90px
  background #fff
</style>
