<template lang="html">
<div>
  <preformance-optimize class="config-bg"></preformance-optimize>
  <DDoSCC  class="config-bg"/>
  <waf-intercept class="config-bg"></waf-intercept>
</div>
</template>

<script>
import '../../assets/styles/website-help.css'
import 'common/assets/styles/helper-class.css'
import WafIntercept from './waf-intercept'
import PreformanceOptimize from './preformance-optimize'
import DDoSCC from './ddos-cc'

export default {
  components: {
    WafIntercept,
    PreformanceOptimize,
    DDoSCC
  }
}
</script>

<style scoped>

</style>
