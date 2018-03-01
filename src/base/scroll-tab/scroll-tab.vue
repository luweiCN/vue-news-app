<template>
 <div class="scroll-tab wrapper" ref="wrapper">
  <ul class="content">
    <li v-for="(item, index) in list" :key="index" class="scroll-tab-item" @click="selectTab" :data-channel='item' ref="tab">
      {{item}}
    </li>
  </ul>
 </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass, removeClass, hasClass } from 'common/js/dom'

const AVTIVE_CLASS = 'scroll-tab-item-active'
export default {
  data () {
    return {

    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initSroll()
      this.initActiveTab()
    })
  },
  methods: {
    initSroll () {
      if (!this.$refs.wrapper) {
        return
      }

      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        scrollY: false,
        probeType: 1,
        bounce: false,
        momentum: true,
        HWCompositing: true,
        click: true
      })
    },
    selectTab (ev) {
      this.$refs.tab.forEach((v, i) => {
        removeClass(v, AVTIVE_CLASS)
      })
      this.$emit('selectTabEv', ev.target.dataset.channel)
      addClass(ev.target, AVTIVE_CLASS)
    },
    initActiveTab () {
      this.$refs.tab.forEach((v, i) => {
        if (hasClass(v, AVTIVE_CLASS)) {
          return 0
        }
      })
      addClass(this.$refs.tab[0], AVTIVE_CLASS)
      this.$emit('selectTabEv', this.list[0])
    }
  },
  watch: {
    // 监听数据的变化，延时20时间后调用refresh方法重新计算，保证滚动效果正常
    list () {
      setTimeout(() => {
        this.initActiveTab()
        this.scroll.refresh()
      }, 20)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.scroll-tab
  width 100%
  position relative
  height 80px
  .content
    position fixed
    top 0
    display flex
    flex-direction row
    height 80px
    background #fff
    z-index 10
    box-shadow 0px 1px 5px #999999 /*no*/
    .scroll-tab-item
      height 78px
      line-height 80px
      white-space nowrap
      padding 0 20px
      font-size $font-size-medium * 2 /*px*/
      border-bottom 2px solid $color-background-d
    .scroll-tab-item-active
      color $color-theme
      border-bottom 4px solid $color-theme
      height 76px
</style>
