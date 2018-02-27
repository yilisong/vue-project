<template lang="html">
<div>
  <!-- 云WAF -->
<cloud-waf class="config-bg"></cloud-waf>
  <!-- 安全替身 -->
<safety-substitute class="config-bg"></safety-substitute>
  <!-- 防篡改 -->
<prevent-tamper class="config-bg"></prevent-tamper>
  <!-- 内容替换 -->
<content-replace class="config-bg"></content-replace>
  <!-- 关键资源锁 -->
<!-- <resource-lock></resource-lock> -->
  <!-- Web蜜罐 -->
<web-honey class="config-bg"></web-honey>
</div>
</template>

<script>
import '../../assets/styles/website-help.css'
import 'common/assets/styles/helper-class.css'
import CloudWaf from './cloud-waf'
import ContentReplace from './content-replace'
import ResourceLock from './resource-lock'
import SafetySubstitute from './safety-substitute'
import PreventTamper from './prevent-tamper'
import WebHoney from './web-honey'
import { mapActions } from 'vuex'

export default {
  components: {
    CloudWaf,
    ContentReplace,
    ResourceLock,
    SafetySubstitute,
    PreventTamper,
    WebHoney
  },
  methods: {
    ...mapActions([
      'changeWebsite'
    ])
  }
}
</script>
<style scoped>
@import '../../assets/styles/website-help.css';
.el-table .cell,
.el-table__body-wrapper,
.el-table,
.el-card {
  overflow: visible;
}
</style>
