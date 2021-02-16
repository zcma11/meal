<template>
  <div>
    <ShopDetailHeader :id="id" :shop="shop"/>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="`/shopdetail/${id}/goods`" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="`/shopdetail/${id}/appraise`" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="`/shopdetail/${id}/info`" replace>商家</router-link>
      </div>
    </div>
    <router-view></router-view>
    <ShopCart :id="id" :fee="shop.float_delivery_fee" :baseFare="shop.float_minimum_order_amount"/>
  </div>
</template>

<script>
import ShopDetailHeader from '../../components/ShopDetailHeader/ShopDetailHeader'
import ShopCart from '../../components/ShopCart/ShopCart'
export default {
  name: 'shopDetail',
  props: ['id'],
  data () {
    return {
      shop: {}
    }
  },
  mounted () {
    // mock
    const shops = this.$store.state.shops
    const idNum = this.id * 1
    const id = this.id // string
    const result = Object.keys(this.$store.state.info).filter(item => item === id)
    if (result.length === 0) {
      this.$store.dispatch('getShopInfo', { id })
    }
    shops.forEach(item => {
      if (item.id === idNum) {
        this.shop = item
      }
    })
  },
  components: {
    ShopDetailHeader,
    ShopCart
  }
}
</script>

<style lang="stylus">
   @import "../../assets/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
