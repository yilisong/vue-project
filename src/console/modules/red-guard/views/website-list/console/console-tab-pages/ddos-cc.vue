<template lang="html">
  <!-- 502/504页面定制 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">抗DDoS/防CC</p>
      </el-col>
      <el-col :span="21" class="description">
        <p>您已启用
          <a class="jumpLink" :href="cloudSpeedUrl">云加速</a>
          服务，如需调整CC防御等级请至
          <a class="jumpLink" :href="cloudSpeedUrl">云加速</a>
          配置，若您遇到针对性大规模高频次攻击，需要更高级的功能和更好的防护效果，请开启
          <a class="jumpLink" href="/console/taichi-ddos#/websiteProtectList">太极抗D</a>
          服务，专家定制规则，完美零误伤防御
        </p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>

export default {
  name: 'ddos-cc',
  data() {
    return {
      domainId: '',
      cloudSpeedUrl: ''
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
