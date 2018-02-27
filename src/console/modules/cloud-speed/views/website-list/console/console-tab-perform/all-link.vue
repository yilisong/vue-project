<template lang="html">
<!-- 全链路优化 -->
<el-card class="item-padding">
  <el-row :gutter="20">
    <el-col :span="3">
      <p class="item-name">全链路优化</p>
    </el-col>
    <el-col :span="15" class="description">
      <p>通过大数据网络感知智能调度、TCP优化、路由优化、保障访客--CDN网络--源站最佳链路</p>
    </el-col>
    <el-col :span="6">
      <el-select :disabled="true" v-model="allViewOptimization.status" @change="updateAllViewOptimization" class="fr">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
</el-card>
</template>

<script>
export default {
  name: 'all-link',
  data() {
    return {
      options: [{
        value: 'on',
        label: 'ON'
      }, {
        value: 'off',
        label: 'OFF'
      }],
      allViewOptimization: {
        init: true,
        status: ''
      }
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchAllViewOptimization()
  },
  methods: {
    fetchAllViewOptimization() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.all_view_optimization`
      this.fetchGet(url, {}).then(result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data && res.data.all_view_optimization) {
              this.allViewOptimization.status = res.data.all_view_optimization.status
            }
          })
        }
      }, e => {})
    },
    updateAllViewOptimization() {
      if (this.allViewOptimization.init) {
        this.allViewOptimization.init = false
        return
      }
      const params = {
        status: this.allViewOptimization.status
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.all_view_optimization`
      this.fetchPut(url, params).then(result => {
        if (result.ok) {
          result.json().then(res => {
            this.windowMessage(res)
          })
        }
      }, e => {})
    }
  }
}
</script>

<style scoped>

</style>
