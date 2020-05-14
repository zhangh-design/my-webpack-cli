<template>
  <div :class="$style.northHeader">
    <div>图片1111</div>
    <div>menu</div>
    <div>登出xtong</div>
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

<style lang="less" module>
.north-header{
  display: flex;
  flex-direction: row;
}
</style>
