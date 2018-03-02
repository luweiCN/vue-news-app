<template>
<div class="app-head">
  <div class="go-back" @click="goBack">
    <icon type="ios-arrow-back"></icon>
  </div>
  <div class="logo" v-if="false">
    <icon type="earth"></icon>
  </div>
  <div class="head-title" v-text='title'></div>
</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    title: {
      type: String,
      default: '新闻'
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.app-head
  height 85px
  line-height 85px
  display flex
  flex-direction row
  padding 0
  align-items center
  color #fff
  background $color-theme
  font-size $font-size-content-p
  position: relative;
  .go-back
    font-size 50px
    float left
    width 50px
    text-align left
    padding 0 40px 0 20px
  .logo
    font-size 40px
    margin-right 20px
  .head-title
    float left
    position: relative
</style>
