<template>
 <div class="bottom-tab">
   <ul class="tab-container">
     <router-link tag="li" to="/news" class="tab-item">
       <i class="iconfont icon-shouyeweixuanzhong tab-icon" v-show="routerName != 'news'"></i>
       <i class="iconfont icon-shouyexuanzhong tab-icon" v-show="routerName == 'news'"></i>
       <span class="tab-text">新闻</span>
     </router-link>
     <router-link tag="li" to="/subscription" class="tab-item">
       <i class="iconfont icon-fenquweixuanzhong tab-icon" v-show="routerName != 'subscription'"></i>
       <i class="iconfont icon-fenquxuanzhong tab-icon" v-show="routerName == 'subscription'"></i>
       <span class="tab-text">订阅</span>
     </router-link>
     <router-link tag="li" to="/fav" class="tab-item">
       <i class="iconfont icon-dongtaiweixuanzhong tab-icon" v-show="routerName != 'fav'"></i>
       <i class="iconfont icon-dongtaixuanzhong tab-icon" v-show="routerName == 'fav'"></i>
       <span class="tab-text">收藏</span>
     </router-link>
     <router-link tag="li" to="/user" class="tab-item">
       <i class="iconfont icon-wodeweixuanzhong tab-icon" v-show="routerName != 'user'"></i>
       <i class="iconfont icon-wodexuanzhong tab-icon" v-show="routerName == 'user'"></i>
       <span class="tab-text">我的</span>
     </router-link>
   </ul>
 </div>
</template>

<script>
export default {
  data () {
    return {
      routerName: 'home'
    }
  },
  watch: {
    $route: function () {
      this.routerName = this.$route.name
    }
  },
  components: {

  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '../../common/css/tab-icon.css'
@import '~common/stylus/variable'
.bottom-tab
  position fixed
  bottom 0
  width 100%
  overflow hidden
  height 108px
  border-top 1px solid $color-background-d /*no*/
  .tab-container
    display flex
    flex-direction row
    justify-content space-around
    align-items center
    width 100%
    background #fff
    height 108px
    .tab-item
      display flex
      flex-direction column
      .tab-icon
        font-size 44px /*px*/
        margin-bottom 10px
      .tab-text
        font-size 24px /*px*/
    .router-link-active
      .tab-icon, .tab-text
        color $color-theme
</style>
