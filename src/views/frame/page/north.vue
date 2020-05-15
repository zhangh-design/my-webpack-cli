<template>
  <div :class="$style.northHeader">
    <fast-double-wing-layout>
      <template v-slot:left>
        <div :class="$style.left" />
      </template>
      <template v-slot:middle>
        <ul :class="$style.middle">
          <li
            v-for="(item, index) in menuInfo"
            :key="item.id"
            :class="{ [$style.active]:isActive==index }"
            @click="isActive=index"
          >
            {{ item.name }}
          </li>
        </ul>
      </template>
      <template v-slot:right>
        <div :class="$style.right">
          <p>
            用户名：{{ userInfo.name }}
            <img
              style="width: 18px;height:18px;margin-left:2px;"
              src="@assets/img/frame/cafe.gif"
              alt=""
            >
          </p>
          <p
            class="el-icon-right"
            @click="onExitClick"
          >
            登出
          </p>
        </div>
      </template>
    </fast-double-wing-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FramePageNorth',
  computed: {
    ...mapGetters({
      userInfo: 'login/getUserInfo',
      menuInfo: 'menu/getMenuInfo'
    })
  },
  data () {
    return {
      isActive: 0
    }
  },
  created () {
    this['menu/getMenu']()
  },
  methods: {
    ...mapActions([
      'menu/getMenu',
      'login/exitAxtion'
    ]),
    onExitClick (event) {
      this.$confirm('是否需要退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this['login/exitAxtion']().then(() => {
          this.$router.replace({ name: 'login' })
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less" module>
@import "./css/north.less";
@assets: '~@assets/img/frame/';
.active{
  border-bottom: 2px solid #2395F1;
}
.left {
  width: 50px;
  background-image: url('@{assets}avatar.jpg');
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
}
.right{
  width: 120px;
  // background-color: aqua;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.right p:last-child{
  cursor: pointer;
  padding: 8px;
  font-size: 12px;
  color: #fff;
  border-radius: 3px;
  background-color: #73A4F8;
}
.middle{
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0px 5px 0px 5px;
}
.middle>li{
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  margin: 0px 10px 0px 10px;
  font-size: 16px;
  cursor: pointer;
  // background-color: turquoise;
}
.middle>li:hover{
  border-bottom: 2px solid #2395F1;
}
</style>
