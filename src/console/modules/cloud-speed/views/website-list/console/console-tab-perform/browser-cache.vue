<template lang="html">
<!-- 浏览器缓存 -->
<el-card class="item-padding">
  <el-row :gutter="20">
    <el-col :span="3" class="special-block">
      <p class="item-name">浏览器缓存优化</p>
    </el-col>
    <el-col :span="15" class="description">
      <p>通过移除请求头中 Entity Tags优化前端性能</p>
    </el-col>
    <el-col :span="6">
      <!-- <el-switch class="fr" v-model="browserCache.status" @change="updateBrowserCache()">
        </el-switch> -->
      <el-select v-model="browserCache.status" @change="updateBrowserCache()" class="fr">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
</el-card>
</template>

<script>
export default {
  name: 'browser-cache',
  data() {
    return {
      options: [{
        value: 'on',
        label: 'ON'
      }, {
        value: 'off',
        label: 'OFF'
      }],
      browserCache: {
        init: true,
        status: ''
      }
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchBrowserCache()
  },
  methods: {
    fetchBrowserCache() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.browser_cache`
      this.fetchGet(url, {}).then(result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data && res.data.browser_cache) {
              this.browserCache.status = res.data.browser_cache.status
            }
          })
        }
      }, e => {})
    },
    updateBrowserCache() {
      if (this.browserCache.init) {
        this.browserCache.init = false
        return
      }
      const params = {
        status: this.browserCache.status
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.browser_cache`
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
@media screen and (min-width:1199px) and (max-width:1401px) {
  .special-block {
    position: relative;
    height: 14px;
    p {
      position: absolute;
      right: 0;
    }
  }
}
</style>
