<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import a from './views/a.js'
console.info('aaaaaa111 ', a)
export default {
  name: 'App'
}
</script>

<style lang="less">
@import "./assets/css/reset.css";
@import "./assets/css/base.less";
</style>
