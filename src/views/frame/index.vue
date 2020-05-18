<template>
  <div class="frame">
    <fast-panel
      layout="fast-border-layout"
      :layout-config="layoutConfig"
      ref="fast-panel-ref"
    >
      <template v-slot:north>
        <north />
      </template>
      <template v-slot:center>
        <router-view />
      </template>
    </fast-panel>
  </div>
</template>

<script>
import North from './page/north.vue'

export default {
  components: { North },
  data () {
    this.layoutConfig = {
      border: false,
      northHeight: '50px'
    }
    return {

    }
  }
}
</script>

<style>
</style>
