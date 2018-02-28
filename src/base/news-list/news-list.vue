<template>
 <div class="news-list">
   <scroll :data='list' :click='true' :pullup='loadmore' @scrollToEnd='needLoadMore'>
     <ul class="container">
      <li class="news-item" v-for='(item, index) in list' :key='index'>
        <div class="item-no-pic news" v-if="!item.havePic">
          <div>
            <p class="item-no-pic-title title">{{item.title}}</p>
            <p class="desc">{{item.desc}}</p>
          </div>
          <p class="info">{{item.source}}&nbsp;&nbsp;{{item.pubDate}}</p>
        </div>
        <div class="item-one-pic news" v-if="item.havePic && item.imageurls.length == 1">
          <div class="text-info">
            <p class="item-no-pic-title title">{{item.title}}</p>
            <p class="info">{{item.source}}&nbsp;&nbsp;{{item.pubDate}}</p>
          </div>
          <div class="image-container">
            <img class="image" v-lazy='item.imageurls[0].url'>
          </div>
        </div>
        <div class="item-more-pic news" v-if="item.havePic && item.imageurls.length > 1">
          <p class="item-no-pic-title title">{{item.title}}</p>
          <p class="info">{{item.source}}&nbsp;&nbsp;{{item.pubDate}}</p>
          <div class="image-container-box">
            <div class="image-container" v-for='(image, num) in item.imageurls' :key='num' v-if="num < 3">
              <img class="image" v-lazy='image.url'>
            </div>
          </div>
        </div>
      </li>
     </ul>
   </scroll>
 </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    loadmore: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  created () {
  },
  components: {
    Scroll
  },
  methods: {
    needLoadMore () {
      this.$emit('needLoadMore')
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
.title
  font-weight 500
  font-size $font-size-medium
.info
  font-size $font-size-small

.news-list
  width 100%
  overflow hidden
  line-height $font-size-large-x
  padding-bottom 54px

.news-item
  padding 10px
  padding-top 0
  font-size $font-size-medium-x

.item-no-pic
  display flex
  flex-direction column
  justify-content space-between
  text-align left
  border-top 1px solid $color-background-d
  padding-top 10px

.desc
  font-size $font-size-medium
  max-height $font-size-large-x * 2
  line-height $font-size-large-x
  display -webkit-box
  overflow hidden
  white-space normal
  text-overflow: ellipsis
  word-wrap break-word
  -webkit-line-clamp 2
  -webkit-box-orient vertical

.image-container
  width 100px
  height 80px
  overflow hidden
  border-radius 1px

.image
  width 100%
  min-height 80px

.item-one-pic
  text-align left
  display flex
  flex-direction row
  justify-content space-between
  border-top 1px solid $color-background-d
  padding-top 10px
  .text-info
    display flex
    flex-direction column
    justify-content space-between
    .title
      width 240px

.item-more-pic
  text-align left
  border-top 1px solid $color-background-d
  padding-top 10px
  .image-container-box
    display flex
    flex-direction row
    .image-container
      padding-right 10px

li:first-child .news
  border none
</style>
