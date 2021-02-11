<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{ on: useMsg }" @click="useMsg = true">短信登录</a>
          <a href="javascript:;" :class="{ on: !useMsg }" @click="useMsg = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{ on: useMsg }">
            <section class="login_message">
              <input v-model="phone" type="tel" maxlength="11" placeholder="手机号">
              <button @click.prevent="getMsg" :disabled="!phoneCheck" :class="{rightPhone: phoneCheck && canSend}" class="get_verification">{{canSend ? '获取验证码' : `已发送( ${countDown} )`}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !useMsg }">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" :class="{off: !showPwd, on: showPwd}" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img ref="captchaPic" @click="getCaptcha" class="get_verification" src="http://localhost:4000/captcha" alt="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="formCheck">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="goback">
        <i class="iconfont icon-icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip @close="closeTip" :text="text"/>
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import { reqMessage, reqLoginByPwd, reqLoginByMsg } from '../../api'
import { SET_USER_INFO } from '../../store/mutations-type'
import { mapState } from 'vuex'
export default {
  components: {
    AlertTip
  },
  computed: {
    ...mapState(['user']),
    phoneCheck () {
      const reg = /^1\d{10}$/
      return reg.test(this.phone)
    }
  },
  data () {
    return {
      useMsg: true, // 短信登陆
      phone: '', // 手机号
      code: '', // 短信验证码
      countDown: 10,
      canSend: true,
      showPwd: false,
      timer: '',
      name: '', // 用户名
      pwd: '', // 密码
      captcha: '', // 验证码
      text: '' // 空就不显示tip
    }
  },
  methods: {
    closeTip () {
      this.text = ''
    },
    async formCheck () {
      const { useMsg } = this
      let result

      if (useMsg) {
        const { phoneCheck, code } = this
        if (!phoneCheck) {
          this.text = '手机号不正确'
        } else if (!/^\d{6}$/.test(code)) {
          this.text = '验证码不正确'
        } else {
          result = await reqLoginByMsg(this.phone, code)
        }
      } else {
        const { name, pwd, captcha } = this
        if (name === '') {
          this.text = '用户名不能为空'
        } else if (pwd === '') {
          this.text = '密码不能为空'
        } else if (captcha === '') {
          this.text = '验证码不能为空'
        } else {
          result = await reqLoginByPwd(name, pwd, captcha)
        }
      }

      if (this.text === '') {
        if (result.code === 0) {
          // 成功
          clearInterval(this.timer)
          const userInfo = result.data
          this.$store.commit(SET_USER_INFO, { userInfo })
          this.$router.replace('/profile')
        } else {
          // 失败
          this.text = result.msg
          this.getCaptcha()
        }
      }
    },
    goback () {
      this.$router.back()
    },
    getMsg () {
      if (!this.canSend) return
      reqMessage(this.phone)
      this.canSend = false
      this.timer = setInterval(() => {
        this.countDown--
        if (this.countDown < 1) {
          clearInterval(this.timer)
          this.countDown = 10
          this.canSend = true
        }
      }, 1000)
    },
    getCaptcha () {
      this.$refs.captchaPic.src = 'http://localhost:4000/captcha?timer=' + Date.now()
    }
  }
}
</script>

<style lang="stylus">
@import "../../assets/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
              .rightPhone
                color #000
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  &.right
                    transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
