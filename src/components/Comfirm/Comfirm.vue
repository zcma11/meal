<template>
  <div>
    <div class="container" v-show="isShow">
      <div class="comfirm-box">
        <div class="content">
          <div class="title">提示</div>
          <div class="text">{{text}}</div>
        </div>
        <div class="comfirm">
          <div @click="close(false)"><span>取消</span></div>
          <div @click="close(true)"><span>确定</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
  },
  props: {
    text: String
  },
  methods: {
    close (flag) {
      flag ? this.$emit('ensure') : this.$emit('cancel')
      this.isShow = false
    },
    ask () {
      this.isShow = true
    }
  }
}
</script>

<style lang="stylus" scoped>
$vw_base = 375
$vh_base = 667
  .container
    position absolute
    left 0
    top 0
    z-index: 200;
    width 100%
    height 100%
    background: rgba(0, 0, 0, .3)
    >.comfirm-box
      width 80%
      height 20%
      border-radius 5px
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      margin auto
      overflow hidden
      font-size 2.4vh
      >.content
        width 100%
        height 70%
        background-color #fff
        display flex
        flex-flow column
        // flex-shrink 0
        justify-content space-around
        align-items center
        >.title
          // height 30%
          color: #000
          font-weight both
          line-height 2.4vh
        >.text
          height 30%
          color #ccc
          line-height 4.2vh
      >.comfirm
        width 100%
        height 30%
        background-color #fff
        color #000
        display flex
        >div
          width 50%
          height 100%
          font-size 14 / $vw_base * 100vw
          box-sizing border-box
          border-top 1px solid #ccc
          display flex
          justify-content center
          align-items center
        div:nth-of-type(1)
          border-right 0.1px solid #ccc
        div:nth-of-type(2)
          border-left 0.1px solid #ccc
          color #5EB4F9
</style>
