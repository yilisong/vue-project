<template lang="html">
<div>
  <!-- 搜索引擎优化 -->
  <search-optimize class="config-bg"></search-optimize>
  <!-- HTTPS -->
  <https class="config-bg"></https>
  <!-- WebSocket -->
  <web-socket class="config-bg"></web-socket>
  <!-- 500页面定制 -->
  <page500 class="config-bg"></page500>
  <!-- 502/504页面定制 -->
  <page502 class="config-bg"></page502>
  <!-- 404页面定制 -->
  <page404 class="config-bg"></page404>
</div>
</template>

<script>
import '../../assets/styles/website-help.css'
import SearchOptimize from './search-optimize'
import Https from './https'
import WebSocket from './web-socket'
import Page500 from './page500'
import Page502 from './page502'
import Page404 from './page404'
export default {
  components: {
    SearchOptimize,
    Https,
    WebSocket,
    Page500,
    Page502,
    Page404
  }
}
</script>

<style scoped>
/*@import '../../assets/styles/website-help.css';*/
</style>
