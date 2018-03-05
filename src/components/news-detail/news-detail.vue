<template>
  <transition name='slide'>
    <div class="news-detail">
      <app-head :title='"新闻 / " + channel'></app-head>
      <div class="news-wrapper">
        <scroll :data='news' ref='news'>
          <div class="news">
            <h2 class="news-title" v-html="news.title"></h2>
            <p class="news-info">{{news.src}}<span v-if="news.src">&nbsp;&nbsp;</span>{{news.time}}</p>
            <div class="news-content" v-html="news.content"></div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import AppHead from 'base/app-head/app-head'
export default {
  data () {
    return {
      news: null,
      channel: ''
    }
  },
  beforeMount () {
    this.news = this.$route.params.news
    this.channel = this.$route.params.channel
    if (!this.news) {
      this.$router.go(-1)
    }
  },
  components: {
    Scroll,
    AppHead
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.news = vm.$route.params.news
    })
  },
  watch: {
    news () {
      this.$refs.news.scrollTo(0, 0, 0)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.slide-enter-active, .slide-leave-active
  transition all .3s ease

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)

.news-detail
  position fixed
  top 0
  bottom 0
  z-index 100
  width 100%
  height 100%
  background $color-news-background
  .news
    text-align left
    .news-title
      font-size $font-size-content-title /*px*/
      line-height 64px /*px*/
      color $color-content-title
      text-overflow ellipsis
      display -webkit-box
      -webkit-line-clamp 2
      -webkit-box-orient vertical
      word-break break-all
      padding 30px 30px 20px
      font-weight 700
      text-align justify
      background #fff
    .news-info
      display block
      box-sizing border-box
      -webkit-box-sizing border-box
      padding 0 30px 30px
      margin-bottom 48px
      background #fff
      font-size $font-size-small-s * 2 /*px*/
      color #888
      line-height 24px /*px*/

.news-wrapper
  position fixed
  top 85px
  bottom 0
  width 100%
  z-index -1

.news-content p
  margin 0 30px 48px
  font-size $font-size-content-p /*px*/
  color #1a1a1a
  line-height 60px /*px*/
  word-break normal
  text-align justify
</style>
