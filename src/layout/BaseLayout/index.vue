<template lang="pug">
  el-container.base--container
    el-header.base--header(height="56px")
      global-header
    el-container.base--content
</template>

<script>
import GlobalHeader from '../GlobalHeader'
export default {
  name: 'BaseLayout',
  components: {
    GlobalHeader
  }
}
</script>

<style lang="less" scoped>
.base {
  &--container {
  }
  &--header {
    line-height: 56px;
    padding: 0;
  }
}
</style>
