<template lang="html">
<div>
  <!-- CDN高级缓存 -->
  <cdn-cache class="config-bg"></cdn-cache>
  <!-- 页面压缩 -->
  <page-gzip class="config-bg"></page-gzip>
  <!-- 页面优化 -->
  <page-optimize class="config-bg"></page-optimize>
  <!-- 异步加载 -->
  <ajax-load class="config-bg"></ajax-load>
  <!-- 全链路优化 -->
  <all-link class="config-bg"></all-link>
  <!-- WebP图片优化 -->
  <!-- <webp-pic></webp-pic> -->
  <!-- 移动端跳转 -->
  <mobile-jump class="config-bg"></mobile-jump>
  <!-- 永远在线 -->
  <always-online class="config-bg"></always-online>
  <!-- 浏览器缓存 -->
  <browser-cache class="config-bg"></browser-cache>
  <!-- 页面自动动静分离 -->
  <!-- <page-separation></page-separation> -->
</div>
</template>

<script>
import '../../assets/styles/website-help.css'
import CdnCache from './cdn-cache'
import PageGzip from './page-gzip'
import PageOptimize from './page-optimize'
import AjaxLoad from './ajax-load'
import AllLink from './all-link'
import WebpPic from './webp-pic'
import MobileJump from './mobile-jump'
import AlwaysOnline from './always-online'
import BrowserCache from './browser-cache'
import PageSeparation from './page-separation'

export default {
  components: {
    CdnCache,
    PageGzip,
    PageOptimize,
    AjaxLoad,
    AllLink,
    WebpPic,
    MobileJump,
    AlwaysOnline,
    BrowserCache,
    PageSeparation
  },
  mounted() {
    const website = {
      id: this.$route.params.id
    }
    this.$store.dispatch('changeWebsite', website)
  }
}
</script>

<style scoped>
</style>
