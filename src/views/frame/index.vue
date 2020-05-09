<template>
  <div class="frame">
    <fast-panel
      layout="fast-border-layout"
      :layout-config="layoutConfig"
      ref="fast-panel-ref"
    >
      <template v-slot:north>
        <div style="background-color: #4989F4;">
          north面板
        </div>
      </template>
      <template v-slot:west>
        <div style="background-color: #DC5145;">
          west面板
        </div>
      </template>
      <template v-slot:center>
        <div style="background-color: #179656;">
          center面板
        </div>
      </template>
      <template v-slot:east>
        <div style="background-color: #DC5145;">
          east面板
        </div>
      </template>
      <template v-slot:south>
        <div style="background-color: #FECC42;">
          south面板
        </div>
      </template>
    </fast-panel>
  </div>
</template>

<script>
export default {
  data () {
    this.layoutConfig = {
      border: true,
      northHeight: '100px',
      southHeight: '100px'
      // westWidth: '100px',
      // eastWidth: '50px'
    }
    return {

    }
  }
}
</script>

<style>
</style>
