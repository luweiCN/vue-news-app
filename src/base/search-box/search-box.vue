<template>
  <div class="search-box">
    <icon type="ios-search-strong" class="icon-search"></icon>
    <input ref="query" v-model="query" class="box"
    @blur="blur"
    @keyup.enter="search"
    @focus="focus"
    :placeholder="placeholder"
    :disabled='disable'/>
    <icon type="close-circled" class="close-circled" v-show="inputBlur" @click="blur"></icon>
  </div>
</template>

<script type="text/ecmascript-6">
import {debounce} from 'common/js/utils'

export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索新闻、热点'
    },
    disable: {
      type: Boolean,
      default: false
    },
    // 当搜索框失去焦点时是否需要回到上个路由
    goBack: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      query: '',
      inputBlur: false
    }
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    },
    blur () {
      this.$refs.query.blur()
      this.inputBlur = false
      this.query = ''
      if (this.goBack) {
        this.$router.go(-1)
      }
    },
    focus () {
      this.inputBlur = true
    },
    search () {
      this.$emit('search', this.query)
    }
  },
  created () {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 200))
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 12px
    height: 90px
    background: #fff
    .icon-search
      font-size: 48px /*px*/
      color: $color-background
    .box
      flex: 1
      margin: 0 10px
      line-height: 36px
      background: #EBEBEB
      color: $color-content-title
      font-size: $font-size-medium * 2
      outline: 0
      padding 10px
      border-radius 6px
      transition all 30s
      &::placeholder
        color: $color-dialog-background
    .close-circled
      font-size: 36px /*px*/
      color: $color-background-d
</style>
