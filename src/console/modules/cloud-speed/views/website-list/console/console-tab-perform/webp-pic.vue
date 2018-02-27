<template lang="html">
<!-- WebP图片优化 -->
<el-card class="item-padding">
  <el-row :gutter="20">
    <el-col :span="3">
      <p class="item-name">WebP图片优化</p>
    </el-col>
    <el-col :span="15" class="description">
      <p>在支持WebP格式图片的浏览器访问网站时，云加速会智能将图片转换为WebP格式，有效降低图片传输大小，提升访问速度</p>
    </el-col>
    <el-col :span="6">
      <!-- <el-switch class="fr" v-model="webP.status" @change="updateWebP">
        </el-switch> -->
      <el-select v-model="webP.status" @change="updateWebP" class="fr">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
</el-card>
</template>

<script>
export default {
  name: 'web-pic',
  data() {
    return {
      options: [{
        value: 'on',
        label: 'ON'
      }, {
        value: 'off',
        label: 'OFF'
      }],
      webP: {
        init: true,
        status: ''
      }
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchWebP()
  },
  methods: {
    fetchWebP() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.WebP`
      this.fetchGet(url, {}).then(result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data && res.data.WebP) {
              this.webP.status =
                res.data.WebP.status
            }
          })
        }
      }, e => {})
    },
    updateWebP() {
      if (this.webP.init) {
        this.webP.init = false
        return
      }
      const params = {
        status: this.webP.status
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.WebP`
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
