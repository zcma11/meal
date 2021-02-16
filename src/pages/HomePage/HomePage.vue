<template>
    <section class="msite">
      <!--首页头部-->
      <Header :title="address">
        <template #search>
          <router-link class="header_search" to="/search">
            <i class="iconfont icon-icon-sousuo"></i>
          </router-link>
        </template>
        <template #login>
          <router-link :to="userInfo._id ? '/userinfo' : '/login'" class="header_login">
            <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
            <span class="header_login_text" v-else><i class="iconfont icon-icon-geren"></i></span>
          </router-link>
        </template>
      </Header>
      <!--首页导航-->
      <nav class="msite_nav">
        <swiper v-if="category.length" ref="mySwiper" :options="swiperOptions" class="swiper-container">
          <swiper-slide class="swiper-slide" v-for="(slide, index) in categoryArr" :key="index">
            <a href="javascript:;" class="link_to_food" v-for="(item, index) in slide" :key="index">
              <div class="food_container">
                <img :src="baseUrl + item.image_url" />
              </div>
              <span>{{item.title}}</span>
            </a>
          </swiper-slide>
          <template #pagination>
            <div class="swiper-pagination"></div>
          </template>
        </swiper>
        <img v-else src="./images/msite_back.svg" alt="">
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-interface shop_icon"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <ShopLists/>
      </div>
    </section>
</template>

<script>
import Header from '../../components/Header/Header'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ShopLists from '../../components/ShopLists/ShopLists'
import { mapState } from 'vuex'

export default {
  watch: {
    category () {
      this.$nextTick(() => {
        this.swiper.init()
      })
    }
  },
  computed: {
    ...mapState({
      address: state => state.address.name,
      category: 'category',
      userInfo: 'userInfo'
    }),
    categoryArr () {
      const { category } = this
      const arr = []
      category.forEach((item, index) => {
        const i = parseInt(index / 8)
        if (!arr[i]) arr[i] = []
        arr[i].push(item)
      })
      return arr
    },
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  components: {
    Header,
    Swiper,
    SwiperSlide,
    ShopLists
  },
  data () {
    return {
      baseUrl: 'http://fuss10.elemecdn.com',
      swiperOptions: {
        init: false,
        observer: true,
        loop: true,
        autoplay: {
          enable: true,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../assets/stylus/mixins.styl"
  .msite
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 3px
          color #999
        .shop_header_title
          margin-left 8px
          color #999
          font-size 14px
          line-height 20px
</style>
