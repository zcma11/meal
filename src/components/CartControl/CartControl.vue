<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-iconremoveoutline" v-if="food.count" @click.stop="updateCart(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-jia" @click.stop="updateCart(true)"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object,
    id: String
  },
  methods: {
    updateCart (isAdd) {
      this.$store.dispatch('updateCart', { id: this.id, isAdd, food: this.food })
    }
  }
}
</script>

<style lang="stylus">
  @import "../../assets/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    text-align right
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-iconremoveoutline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 20px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-jia
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 20px
      color $green
</style>
