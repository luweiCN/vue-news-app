<template>
  <div class="search-box">
    <div class="go-back" @click="goBackHander" v-if='goBack'>
      <icon type="ios-arrow-back"></icon>
    </div>
    <div class="container">
      <icon type="ios-search-strong" class="icon-search"></icon>
      <input ref="query" v-model="query" class="box"
      @blur="blur"
      @focus="focus"
      @keyup.enter="search"
      @input="type"
      :placeholder="placeholder"
      :disabled='disable'/>
      <div @click="cancelSearch"  class="close-circled-box" v-show='inputBlur'>
        <icon type="close-circled" class="close-circled"></icon>
      </div>
    </div>
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
    // 返回按钮
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
      if (this.query !== '') {
        this.inputBlur = true
      } else {
        this.inputBlur = false
      }
    },
    type () {
      if (this.query !== '') {
        this.inputBlur = true
      } else {
        this.inputBlur = false
      }
    },
    focus () {
      if (this.query !== '') {
        this.inputBlur = true
      }
    },
    search () {
      this.$emit('search', this.query)
    },
    cancelSearch () {
      console.log(1)
      this.query = ''
    },
    goBackHander () {
      this.$router.go(-1)
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
    justify-content space-between
    .icon-search
      font-size: 48px /*px*/
      color: $color-background-d
      position absolute
      left 12px
    .box
      display block
      width 100%
      line-height: 36px
      background: #EBEBEB
      color: $color-content-title
      font-size: $font-size-medium * 2
      outline: 0
      padding 10px 10px 10px 58px
      border-radius 6px
      transition all 30s
      &::placeholder
        color: $color-dialog-background
    .close-circled-box
      font-size: 36px /*px*/
      color: $color-background-d
      position absolute
      right 12px
      display flex
      align-items center

.go-back
    font-size 50px
    float left
    width 50px
    text-align left
    padding 0 40px 0 10px

.container
  flex 1
  position relative
  display flex
  flex-direction row
  align-items center
</style>
