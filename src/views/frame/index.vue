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
        <center />
      </template>
      <template v-slot:west>
        <west />
      </template>
    </fast-panel>
  </div>
</template>

<script>
import North from './page/north.vue'
import Center from './page/center.vue'
import West from './page/west.vue'

export default {
  components: { North, Center, West },
  data () {
    this.layoutConfig = {
      border: false,
      northHeight: '50px',
      westWidth: '160px'
    }
    return {

    }
  }
}
</script>

<style>
</style>
