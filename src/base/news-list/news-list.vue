<template>
  <div class="news-list">
      <scroll :data='list' :click='true' :pullup='true' @scrollToEnd='loadmore' ref="scroll">
        <div>
          <ul class="container">
            <router-link tag="li" :to="{name: 'newsDetail', params: {news: item, channel}}" class="news-item" v-for='(item, index) in list' :key='index'>
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
            <li class='loading' v-show='loading'>
              <vue-loading ref="loading" type="bubbles" color="#d9544e" :size="{ width: '100px', height: '100px' }" ></vue-loading>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import VueLoading from 'vue-loading-template'

export default {
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    this.loading = true
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    channel: {
      type: String,
      default: ''
    }
  },
  methods: {
    loadmore () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.$emit('needLoadMore')
    }
  },
  watch: {
    list () {
      if (!this.list.length) {
        this.loading = true
      } else {
        this.loading = false
      }
    },
    channel () {
      this.$refs.scroll.scrollTo(0, 0, 0)
    }
  },
  components: {
    Scroll,
    VueLoading
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.title
  font-weight 500
  font-size $font-size-medium * 2 /*px*/
  width 490px

.info
  font-size $font-size-small * 2 /*px*/
  width 490px

.news-list
  position absolute
  top 0
  bottom 0
  padding-bottom 100px
  width 100%
  overflow hidden

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

.loading
  // position absolute
  // bottom 10px
  // left 0
  // right 0
  display flex
  justify-content center
</style>
