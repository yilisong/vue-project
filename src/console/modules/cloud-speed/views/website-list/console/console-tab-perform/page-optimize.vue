<template lang="html">
<!-- 页面压缩 -->
<el-card class="item-padding">
  <el-row :gutter="20">
    <el-col :span="3">
      <p class="item-name">页面优化</p>
    </el-col>
    <el-col :span="15" class="description">
      <p>自动裁掉脚本文件中不必要的字符，动态减小网页文件尺寸的技术。优化后在保证网页显示不变的同时，节约传输内容，提高访问速度</p>
    </el-col>
    <el-col :span="6">
      <!-- <el-switch class="fr" v-model="pageOptimization.status" @change="updatePageOptimization()">
      </el-switch> -->
      <el-select :disabled="true" v-model="pageOptimization.status" @change="updatePageOptimization" class="fr" >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
</el-card>
</template>

<script>
export default {
  name: 'page-optimize',
  data() {
    return {
      options: [{
        value: 'on',
        label: 'ON'
      }, {
        value: 'off',
        label: 'OFF'
      }],
      pageOptimization: {
        init: true,
        status: ''
      }
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchPageOptimization()
  },
  methods: {
    // 页面优化
    fetchPageOptimization() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.page_optimization`
      this.fetchGet(url, {}).then(result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data && res.data.page_optimization) {
              this.pageOptimization.status = res.data.page_optimization.status
            }
          })
        }
      }, e => {})
    },
    updatePageOptimization(val) {
      if (this.pageOptimization.init) {
        this.pageOptimization.init = false
        return
      }
      if (val) {
        const params = {
          status: val
        }
        const url = `Web.Domain.DomainId.${this.domainId}.Settings.page_optimization`
        this.fetchPut(url, params).then(result => {
          if (result.ok) {
            result.json().then(res => {
              this.windowMessage(res)
              this.fetchPageOptimization()
            })
          }
        }, e => {})
      }
    }

  }
}
</script>

<style scoped>
.fr{
  float: right;
}
</style>
