<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{shop.rating}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家 {{info[id].rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="info[id].serviceScore" :size="36" /> <span class="score">{{info[id].serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="info[id].foodScore" :size="36" /> <span class="score">{{info[id].foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info[id].deliveryTime}} 分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block" :class="{ active: type === 0}" @click="readFilter(0)">
            全部<span class="count">{{allComments.length}}</span>
          </span>
          <span class="block positive" :class="{ active: type === 1}" @click="readFilter(1)">
            满意<span class="count">{{satisfied.length}}</span>
          </span>
          <span class="block negative" :class="{ active: type === 2}" @click="readFilter(2)">
            不满意<span class="count">{{dissatisfied.length}}</span>
          </span>
        </div>
        <div class="switch" :class="{ on: commentTextNotNull}" @click="readFilter">
          <span class="iconfont icon-duigou"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(comment, index) in filterComment" :key="index">
            <div class="avatar">
              <img
                width="28"
                height="28"
                :src="comment.avatar"
              />
            </div>
            <div class="content">
              <h1 class="name">{{comment.username}}</h1>
              <div class="star-wrapper">
                <Star class="star" :score="comment.score" :size="24" />
                <span class="delivery">{{comment.deliveryTime}}</span>
              </div>
              <p class="text">{{comment.text}}</p>
              <div class="recommend" v-if="comment.recommend.length">
                <span class="iconfont" :class="comment.rateType ? 'icon-icon-thumb_up' : 'icon-icon-thumb_down'"></span>
                <span class="item" v-for="(recommend, index) in comment.recommend" :key="index">{{recommend}}</span>
              </div>
              <div class="time">{{comment.rateTime | date-format}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '../../../components/Star/Star'
import BScorll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      type: 0, // 0: 全部 1: 满意 2: 不满意
      commentTextNotNull: false // 是否过滤text为空的
    }
  },
  watch: {
    allComments () {
      this.filterComment = this.allComments
    }
  },
  computed: {
    ...mapState(['comment', 'info']),
    filterComment () {
      const { type } = this
      let result

      if (type === 0) result = this.allComments
      else if (type === 1) {
        result = this.satisfied
      } else if (type === 2) {
        result = this.dissatisfied
      }

      return this.commentTextNotNull ? result.filter(comment => comment.text !== '') : result
    },
    allComments () {
      const comments = this.comment[this.id] || []
      return comments
    },
    satisfied () {
      const comments = this.comment[this.id] || []
      const result = comments.filter(comment => comment.rateType === 0)
      return result
    },
    dissatisfied () {
      const comments = this.comment[this.id] || []
      const result = comments.filter(comment => comment.rateType === 1)
      return result
    },
    id () {
      return this.$route.query.id
    }
  },
  props: {
    shop: Object
  },
  mounted () {
    const scrollInit = () => {
      this.$nextTick(() => {
        this._initScroll()
      })
    }
    this.$store.dispatch('getShopComment', { id: this.id, scrollInit })
  },
  methods: {
    _initScroll () {
      this.appraiseScroll = new BScorll('.ratings', { click: true })
    },

    readFilter (type) {
      if (this.type === type) { return }
      // 修改状态
      if (typeof type === 'number') {
        this.type = type
      } else {
        this.commentTextNotNull = !this.commentTextNotNull
      }
      // 更新滑动
      this.$nextTick(() => {
        this.appraiseScroll.refresh()
      })
    }
  },
  components: {
    Star
  }
}
</script>

<style lang="stylus">
  @import "../../../assets/stylus/mixins.styl"

  .ratings
    position: absolute
    top: 195px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
    .ratingselect
      .rating-type
        padding: 18px 0
        margin: 0 18px
        top-border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        .block
          display: inline-block
          padding: 8px 12px
          margin-right: 8px
          line-height: 16px
          border-radius: 1px
          font-size: 12px
          color: rgb(77, 85, 93)
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: $green
            color: #fff
          .count
            margin-left: 2px
            font-size: 8px
      .switch
        padding: 12px 18px
        line-height: 24px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        color: rgb(147, 153, 159)
        font-size: 0
        &.on
          .icon-duigou
            color: $green
        .icon-duigou
          display: inline-block
          vertical-align: top
          margin-right: 4px
          font-size: 24px
        .text
          display: inline-block
          vertical-align: top
          font-size: 12px
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-icon-thumb_up, .icon-icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-icon-thumb_up
              color: $yellow
            .icon-icon-thumb_down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>
