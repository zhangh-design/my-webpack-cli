<template>
  <div :class="$style.northHeader">
    <div>图片1111</div>
    <div class="bbbbb">
      menu
    </div>
    <div>登出xtong</div>
    <p class="cccc">
      胜多负少第三方第三方
    </p>
  </div>
</template>

<script>
export default {
  name: 'FramePageNorth',
  mounted () {
    console.info('$style ', this.$style)
  }
}
</script>

<style lang="less" scoped>
@import "./css/north.less";
.bbbbb{
  color: @color;
}
</style>

<style lang="less" module>
// @import "@assets/css/less/variables.less";
@assets: '~@assets/img/frame/';
.north-header {
  display: flex;
  flex-direction: row;
}
.north-header div:first-child {
  color: @color;
  background-image: url('@{assets}avatar.jpg');
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
}
.north-header div:last-child {
  color: @color;
}
</style>
