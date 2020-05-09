<template>
  <div id="particles-js">
    <div class="login">
      <div class="login-top">
        登录
      </div>
      <div class="login-center clearfix">
        <div class="login-center-img">
          <img src="@assets/img/login/name.png">
        </div>
        <div class="login-center-input">
          <input
            type="text"
            name=""
            value=""
            placeholder="请输入您的用户名"
            onfocus="this.placeholder=''"
            onblur="this.placeholder='请输入您的用户名'"
          >
          <div class="login-center-input-text">
            用户名
          </div>
        </div>
      </div>
      <div class="login-center clearfix">
        <div class="login-center-img">
          <img src="@assets/img/login/password.png">
        </div>
        <div class="login-center-input">
          <input
            type="password"
            name=""
            value=""
            placeholder="请输入您的密码"
            onfocus="this.placeholder=''"
            onblur="this.placeholder='请输入您的密码'"
          >
          <div class="login-center-input-text">
            密码
          </div>
        </div>
      </div>
      <div
        class="login-button"
        @click="onClick"
      >
        登录
      </div>
    </div>
    <div class="sk-rotating-plane" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {

    }
  },
  created () {
    console.info(mapActions)
  },
  methods: {
    ...mapActions([
      'login/loginAction'
    ]),
    onClick () {
      this['login/loginAction']({ name: 'zhangh', pswd: '123' })
    }
  }
}
</script>

<style lang="less">
@import "./index.css";
</style>
