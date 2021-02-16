<template>
  <div id="app">
    <keep-alive exclude="shopDetail">
      <router-view></router-view>
    </keep-alive>
    <FooterGuide v-show="this.$route.meta.ShowFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  mounted () {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getFoodCategory')
    this.$store.dispatch('getShopList')
    this.$store.dispatch('autoLogin')
  },
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
