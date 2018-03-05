<template>
  <div class="search-result">
    <app-head :title='title'></app-head>
    <div class="result-list">
      <news-list channel="搜索" :list='searchResult'></news-list>
    </div>
  </div>
</template>

<script>
import { searchNews } from 'api/news'
import { ERR_OK } from 'api/config'
import { getSearchHistory } from 'common/js/search-history'

import AppHead from 'base/app-head/app-head'
import NewsList from 'base/news-list/news-list'

export default {
  data () {
    return {
      page: 1,
      searchResult: [],
      key: '',
      title: '搜索'
    }
  },
  created () {
    this.key = this.$route.params.key
  },
  methods: {

  },
  components: {
    AppHead,
    NewsList
  },
  watch: {
    key () {
      if (this.key.length <= 5) {
        this.title = '搜索 / ' + this.key
      } else {
        this.title = '搜索 / ' + this.key.slice(0, 5) + '...'
      }

      searchNews(this.key).then((res) => {
        if (parseInt(res.status) === ERR_OK) {
          this.searchResult = res.result.list
        }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$parent.historyList = getSearchHistory()
    next()
  }
}
</script>

<style lang="stylus" scoped>
.search-result
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  width 100%
  height 100%
  background #fff

.result-list
  position fixed
  top 90px
  bottom 0
  left 0
  right 0
</style>
