<template>
  <div :class="$style.northHeader">
    <fast-double-wing-layout>
      <template v-slot:left>
        <div :class="$style.left" />
      </template>
      <template v-slot:middle>
        <div>中间区域</div>
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
          <p class="el-icon-right">
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
      userInfo: 'login/getUserInfo'
    })
  },
  data () {
    return {}
  },
  created () {
    /* this.$api['menu/getMenu']({ restful: { id: this.userInfo.id } }).then(resData => {
      console.info('aaaaaaa ', resData)
    }) */
    this['menu/getMenu']()
  },
  methods: {
    ...mapActions([
      'menu/getMenu'
    ])
  }
}
</script>

<style lang="less" module>
@import "./css/north.less";
@assets: '~@assets/img/frame/';
.left {
  width: 70px;
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
</style>
