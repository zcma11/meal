<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="this.$route.meta.ShowFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import { reqFoodCategory } from './api/index'
export default {
  async mounted () {
    const re = await reqFoodCategory()
    console.log(re)
  },
  components: {
    FooterGuide
  },
  data () {
    return {}
  }
}
</script>

<style lang="stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
