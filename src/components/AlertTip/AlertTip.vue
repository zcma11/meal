<template>
  <div class="container" v-show="text">
    <div class="tip-box">
      <div class="content">
        <div class="icon">
          <span></span>
          <span></span>
        </div>
        <div class="text">{{text}}</div>
      </div>
      <div class="comfirm" @click="close"><span>确定</span></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus">
@import "../../assets/stylus/mixins.styl"

  @keyframes show
    0
    35%
      transform scale(.8)
    70%
      transform scale(1.1)
    100%

  .container
    position absolute
    left 0
    top 0
    z-index: 200;
    width 100%
    height 100%
    background: rgba(0, 0, 0, .3)
    >.tip-box
      width 80%
      height 25%
      border-radius 5px
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      margin auto
      overflow hidden
      font-size 2.4vh
      animation show .1s
      >.content
        width 100%
        height 80%
        background-color #fff
        display flex
        flex-flow column
        justify-content space-around
        align-items center
        >.icon
          width 8vh
          height 8vh
          border-radius 50%
          border 0.3vh solid #f8cb86
          display flex
          flex-flow column
          justify-content center
          align-items center
          span:nth-of-type(1)
            width: 0.3vh
            height: 4.5vh
            background-color: #f8cb86
          span:nth-of-type(2)
            width: 0.6vh
            height: 0.6vh
            border: 0.15vh
            border-radius: 50%
            margin-top: 0.3vh
            background-color #f8cb86
      >.comfirm
        width 100%
        height 20%
        background-color $green
        color #fff
        display flex
        justify-content center
        align-items center
</style>
