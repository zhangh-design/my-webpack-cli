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
        <div>右侧</div>
      </template>
    </fast-double-wing-layout>
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
@assets: '~@assets/img/frame/';
.left {
  width: 70px;
  background-image: url('@{assets}avatar.jpg');
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
