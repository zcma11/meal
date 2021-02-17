<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" @click="moveToCategory(index)" :class="{current: index===currentIndex}" v-for="(category, index) in goods[id]" :key="index">
          <span class="text bottom-border-1px">
            <img class="icon" v-if="category.icon" src="https://fuss10.elemecdn.com/0/6a/05b267f338acfeb8bd682d16e836dpng.png">
            {{category.category}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" >
      <ul ref="foodsList">
        <li class="food-list-hook" v-for="(category, index) in goods[id]" :key="index">
          <h1 class="title">{{category.category}}</h1>
          <ul>
            <li @click="saveAndShowFocusFood(food)" class="food-item bottom-border-1px" v-for="(food, i) in category.food" :key="i">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售 {{food.sellCount}} 份</span>
                  <span>好评率 {{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :id="id" :food="food"/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Food :id="id" :food="food" ref="foodCard"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import CartControl from '../../../components/CartControl/CartControl'
import Food from '../../../components/Food/Food'
export default {
  components: {
    CartControl,
    Food
  },
  mounted () {
    const id = this.id * 1
    const scrollInit = () => {
      this.$nextTick(() => {
        this._initScroll()
        this._initTops()
      })
    }
    if (!this.$store.state.goods[id]) {
      this.$store.dispatch('getShopGoods', { id, scrollInit })
    } else {
      this.$store.dispatch('getShopGoods', { id: 'no', scrollInit })
    }
  },
  methods: {
    saveAndShowFocusFood (food) {
      this.food = food
      this.$refs.foodCard.show = true
    },
    moveToCategory (i) {
      const y = this.tops[i]
      this.scrollY = y
      this.mainScroll.scrollTo(0, -y, 300)
    },
    _initScroll () {
      this.listScroll = new BScroll('.menu-wrapper', {
        click: true
      })
      this.mainScroll = new BScroll('.foods-wrapper', {
        click: true,
        probeType: 2
      })
      this.mainScroll.on('scroll', ({ x, y }) => {
        this.scrollY = -y
      })
      this.mainScroll.on('scrollEnd', ({ x, y }) => {
        this.scrollY = -y
      })
    },
    _initTops () {
      const tops = [0]
      const lis = this.$refs.foodsList.querySelectorAll('.food-list-hook')
      let top = 0
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      this.tops = tops
    }
  },
  data () {
    return {
      scrollY: 0,
      tops: [],
      showFood: false, // 显示食物详情
      food: {} // 点击是食物
    }
  },
  computed: {
    ...mapState(['goods']),
    currentIndex () {
      const y = this.scrollY
      const tops = this.tops
      let currentY = 0
      currentY = tops.findIndex((item, index) => y >= item && y < tops[index + 1])
      if (y < 0) currentY = 0
      return currentY
    },
    id () {
      return this.$route.query.id
    }
  }
}
</script>

<style lang="stylus">
  @import "../../../assets/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
