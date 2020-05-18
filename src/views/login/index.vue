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
            v-model.trim="name"
            v-focus="'focused'"
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
            v-model.trim="paswd"
            placeholder="请输入您的密码"
            onfocus="this.placeholder=''"
            onblur="this.placeholder='请输入您的密码'"
            @keyup.enter="onClick"
          >
          <div class="login-center-input-text">
            密码
          </div>
        </div>
      </div>
      <div class="login-button">
        <fast-button
          type="primary"
          :loading="loading"
          @click.enter="onClick"
        >
          {{ loading?'登录中':'登录' }}
        </fast-button>
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
      name: '',
      paswd: '',
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'login/loginAction'
    ]),
    onClick () {
      this.loading = true
      this['login/loginAction']({ name: this.name, pswd: this.paswd }).then(() => {
        this.$message({ message: '验证成功', type: 'success', duration: 1000 })
        this.$router.push({ path: '/' })
      }).catch((error) => {
        console.error(error)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less">
@import "./index.css";
</style>
