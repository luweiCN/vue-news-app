<template>
 <transition name='slide'>
    <div class="search-news">
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.slide-enter-active, .slide-leave-active
  transition all .2s ease-in-out

.slide-enter, .slide-leave-to
  transform: translate3d(0, 0, 0)
  opacity: 0.8

.search-news
  position fixed
  top 90px
  bottom 0
  z-index 100
  width 100%
  height 100%
  background #fff
</style>
