<template lang="html">
  <!-- 502/504页面定制 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">性能优化</p>
      </el-col>
      <el-col :span="21" class="description">
        <p>您已启用
          <a class="jumpLink" :href="cloudSpeedUrl">云加速</a>
          服务，如需配置CDN高级缓存，页面压缩，页面优化等性能优化功能，请至
          <a class="jumpLink" :href="cloudSpeedUrl">云加速</a>
          配置，
          <a class="jumpLink" :href="cloudSpeedUrl">点击前往配置</a>。
        </p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'preformance-optimize',
  data() {
    return {
      cloudSpeedUrl: '',
      domainId: ''
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.cloudSpeedUrl = `/console/cloud-speed#/websiteList/console/${this.domainId}/perform`
  },
  methods: {}
}
</script>

<style scoped>

</style>
