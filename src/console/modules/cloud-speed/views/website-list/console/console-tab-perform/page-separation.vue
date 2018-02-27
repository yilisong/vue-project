<template lang="html">
  <!-- 页面自动动静分离 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">页面自动动静分离</p>
      </el-col>
      <el-col :span="15" class="description">
        <p>分离网站中动态和静态资源</p>
      </el-col>
      <el-col :span="6">
        <div class="fr">
          <span class="help">帮助</span>
          <el-switch class="fr" v-model="pageAutoDynamicStaticSeparation.status" @change="updatePageAutoDynamicStaticSeparation">
          </el-switch>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="3" class="top-line">选取后缀名</el-col>
      <el-col :span="18" class="top-line">
        <div class="fr">
          <suffix-select v-on:changeSuffixList="updateSuffixList" class="inline-block" :suffixList="pageAutoDynamicStaticSeparation.suffix"></suffix-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="7">静态资源域名</el-col>
      <el-col :span="14">
        <div class="fr">
          <el-input class="url-input" v-model="pageAutoDynamicStaticSeparation.staticDomain" placeholder="请输入内容"></el-input>
          <i-button type="primary" @click="updatePageAutoDynamicStaticSeparation">添加</i-button>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import InputEdit from 'common/components/InputEdit/input-edit'
import SuffixSelect from 'common/components/InputSuffix/SuffixSelect'
export default {
  name: 'page-separation',
  components: {
    InputEdit,
    SuffixSelect
  },
  data() {
    return {
      pageAutoDynamicStaticSeparation: {
        status: '',
        staticDomain: '',
        suffix: ''
      }
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchPageAutoDynamicStaticSeparation()
  },
  methods: {
    fetchPageAutoDynamicStaticSeparation() {
      const url =
        `Web.Domain.DomainId.${this.domainId}.Settings.page_auto_dynamic_static_separation`
      this.fetchGet(url, {}).then(result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data &&
              res.data.page_auto_dynamic_static_separation) {
              this.pageAutoDynamicStaticSeparation.status =
                this.resToBoolean(res.data.page_auto_dynamic_static_separation.status)
              if (res.data.page_auto_dynamic_static_separation.static_domain) {
                this.pageAutoDynamicStaticSeparation.staticDomain =
                  res.data.page_auto_dynamic_static_separation.static_domain
              }
              if (res.data.page_auto_dynamic_static_separation.suffix) {
                this.pageAutoDynamicStaticSeparation.suffix =
                  res.data.page_auto_dynamic_static_separation.suffix
              }
            }
          })
        }
      }, e => {})
    },
    updatePageAutoDynamicStaticSeparation() {
      const params = {
        status: this.booleanToOnOff(this.pageAutoDynamicStaticSeparation.status),
        suffix: this.pageAutoDynamicStaticSeparation.suffix,
        static_domain: this.pageAutoDynamicStaticSeparation.staticDomain
      }
      const url =
        `Web.Domain.DomainId.${this.domainId}.Settings.page_auto_dynamic_static_separation`
      this.fetchPut(url, params).then(result => {
        if (result.ok) {
          result.json().then(res => {
            this.windowMessage(res)
          })
        }
      }, e => {})
    },
    updateSuffixList(checkString) {
      this.pageAutoDynamicStaticSeparation.suffix = checkString
    }
  }
}
</script>

<style scoped>
</style>
