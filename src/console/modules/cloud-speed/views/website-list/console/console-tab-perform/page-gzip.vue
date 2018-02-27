<template lang="html">
<!-- 页面压缩 -->
<el-card class="item-padding">
  <el-row :gutter="20">
    <el-col :span="3">
      <p class="item-name">页面压缩</p>
    </el-col>
    <el-col :span="15" class="description">
      <p>Gzip压缩网页资源，节约传输内容，提高访问速度，有效改善动态页面的加速支持</p>
    </el-col>
    <el-col :span="6">
      <div class="fr">
        <!-- <el-switch v-model="pageGzip.compressJs" @change="updatePageGzip()">
          </el-switch>JS
          <el-switch v-model="pageGzip.compressCss" @change="updatePageGzip()">
          </el-switch>CSS
          <el-switch v-model="pageGzip.compressHtml" @change="updatePageGzip()">
          </el-switch>HTML -->
        <el-checkbox v-model="pageGzip.compressJs" @change="updatePageGzip()">JS</el-checkbox>
        <el-checkbox v-model="pageGzip.compressCss" @change="updatePageGzip()">CSS</el-checkbox>
        <el-checkbox v-model="pageGzip.compressHtml" @change="updatePageGzip()">HTML</el-checkbox>
      </div>
    </el-col>
  </el-row>
</el-card>
</template>

<script>
export default {
  name: 'page-gzip',
  data() {
    return {
      pageGzip: {
        compressCss: false,
        compressHtml: false,
        compressJs: false
      }
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchPageGzip()
  },
  methods: {
    fetchPageGzip() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.page_gzip`
      this.fetchGet(url, {}).then(result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data && res.data.page_gzip) {
              this.pageGzip.compressJs = this.resToBoolean(res.data.page_gzip.compress_js)
              this.pageGzip.compressCss = this.resToBoolean(res.data.page_gzip.compress_css)
              this.pageGzip.compressHtml = this.resToBoolean(res.data.page_gzip.compress_html)
            }
          })
        }
      }, e => {})
    },
    updatePageGzip(e) {
      const params = {
        compress_js: this.booleanToOnOff(this.pageGzip.compressJs),
        compress_css: this.booleanToOnOff(this.pageGzip.compressCss),
        compress_html: this.booleanToOnOff(this.pageGzip.compressHtml)
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.page_gzip`
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
