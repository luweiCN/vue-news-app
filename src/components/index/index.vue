<template>
 <div class="home">
   <scroll-tab :list='channelList' @selectTabEv="selectTab" v-if='channelList.length'></scroll-tab>
<<<<<<< HEAD
   <div class="news-list">
     <news-list :list='showList' v-if="showList.length" :loadmore='true' @needLoadMore='loadmore'></news-list>
   </div>
   <vue-loading type="bubbles" color="#d9544e" :size="{ width: '50px', height: '50px' }" v-show="loading"></vue-loading>
=======
   <vue-loading type="bubbles" color="#d9544e" :size="{ width: '50px', height: '50px' }" v-if="!showList.length"></vue-loading>
   <div class="news-list">
     <news-list :list='showList' v-if="showList.length" :loadmore='true' @needLoadMore='loadmore'></news-list>
   </div>
>>>>>>> 6bafb0857e6f30ee3ed703cea3bfd42eaac20dcf
 </div>
</template>

<script>
import { getNewsList, getChannelList } from 'api/news'
import { ERR_OK } from 'api/config'

// components
import ScrollTab from 'base/scroll-tab/scroll-tab'
import NewsList from 'base/news-list/news-list'
import VueLoading from 'vue-loading-template'

<<<<<<< HEAD
const PAGE_SIZE = 15

=======
>>>>>>> 6bafb0857e6f30ee3ed703cea3bfd42eaac20dcf
export default {
  data () {
    return {
      channelList: [],
      newsList: {},
      page: {},
<<<<<<< HEAD
      channel: '',
      showList: [],
      isEnd: {},
      loading: false
=======
      channelId: '',
      showList: [],
      isEnd: {}
>>>>>>> 6bafb0857e6f30ee3ed703cea3bfd42eaac20dcf
    }
  },
  components: {
    ScrollTab,
    NewsList,
    VueLoading
  },
  created () {
    this._getChannelList()
  },
  methods: {
    _getChannelList () {
<<<<<<< HEAD
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
        this.showList = []
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
          this.showList = this.newsList[channel]
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
      } else {
        this.showList = this.newsList[channel]
      }
    },
    loadmore () {
      if (this.loading) {
        return
      }
      if (!this.isEnd[this.channel]) {
        this._getNewsList(this.channel, this.page[this.channel])
=======
      getChannelList().then((res) => {
        if (res.showapi_res_code === ERR_OK) {
          this.channelList = this.normalizeChannelList(res.showapi_res_body.channelList)
          this.generateParams(this.channelList)
        }
      })
    },
    _getNewsList (channelId, page) {
      getNewsList(channelId, page).then((res) => {
        let allNum = res.showapi_res_body.pagebean.allNum
        let list = res.showapi_res_body.pagebean.contentlist
        if (list.length) {
          console.log(list, this.isEnd)
          this.page[channelId] += 1
        }
        if (res.showapi_res_code === ERR_OK) {
          if (!this.newsList[channelId]) {
            this.newsList[channelId] = []
          }
          this.newsList[channelId] = this.newsList[channelId].concat(list)
          if (allNum <= this.newsList[channelId].length) {
            this.isEnd[channelId] = true
          } else {
            this.isEnd[channelId] = false
          }
          this.showList = this.newsList[channelId]
        }
      })
    },
    normalizeChannelList (list) {
      if (list.length <= 10) {
        return list
      }

      return list.slice(0, 10)
    },
    generateParams (list) {
      list.map((v) => {
        this.page[v.channelId] = 1
        this.newsList[v.channelId] = []
      })
    },
    selectTab (channelId) {
      this.channelId = channelId
      if (!this.newsList[channelId].length) {
        this._getNewsList(channelId, this.page[channelId])
      }
    },
    loadmore () {
      console.log(this.page)
      if (!this.isEnd[this.channelId]) {
        this._getNewsList(this.channelId, this.page[this.channelId])
>>>>>>> 6bafb0857e6f30ee3ed703cea3bfd42eaac20dcf
      }
    }
  },
  watch: {
    newsList: function (val, oldVal) {
      if (val[this.channelId]) {
        this.showList = val[this.channelId]
      }
    },
    channelId: function (val, oldVal) {
      if (this.newsList[val]) {
        this.showList = this.newsList[val]
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
