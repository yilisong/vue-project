<template lang="html">
  <!-- 异步加载 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">异步加载</p>
      </el-col>
      <el-col :span="15" class="description">
        <p>使页面的渲染不再因为加载长时间运行的脚本而被阻断</p>
      </el-col>
      <el-col :span="6">
        <el-select :disabled="true" v-model="ajaxLoad.status" @change="updateAjaxLoad" class="fr" >
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'ajax-load',
  data() {
    return {
      options: [{
        value: 'on',
        label: 'ON'
      }, {
        value: 'off',
        label: 'OFF'
      }],
      ajaxLoad: {
        init: true,
        status: ''
      }
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchAjaxLoad()
  },
  methods: {
    // 异步加载
    fetchAjaxLoad() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.ajax_load`
      this.fetchGet(url, {}).then(result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data && res.data.ajax_load) {
              this.ajaxLoad.status = res.data.ajax_load.status
            }
          })
        }
      }, e => {})
    },
    updateAjaxLoad() {
      if (this.ajaxLoad.init) {
        this.ajaxLoad.init = false
        return
      }
      const params = {
        status: this.ajaxLoad.status
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.ajax_load`
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
