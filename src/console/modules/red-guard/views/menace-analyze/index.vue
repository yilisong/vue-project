<template  lang="html">
<console-page-layout title="威胁分析">
  <el-tabs v-model="activeTabName" @tab-click="handleClick" v-show="tabShow">
    <el-tab-pane label="常规攻击分析" name="NormalAttack">
    </el-tab-pane>
    <el-tab-pane label="高级威胁分析" name="AdvancedThreat">
    </el-tab-pane>
    <el-tab-pane label="黑客追溯分析" name="HackerAnalysis">
    </el-tab-pane>
    <el-tab-pane label="可视化推演" name="viewable">
    </el-tab-pane>
  </el-tabs>
  <div class="content-bg">
    <router-view></router-view>
  </div>
</console-page-layout>
</template>
<script>
import CommonResource from 'common/resource/CommonResource'
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import Rul from 'common/utils/verify'
import NormalAttack from './tab/NormalAttack'
import AdvancedThreat from './tab/AdvancedThreat'
import HackerAnalysis from './tab/HackerAnalysis'

export default {
  components: {
    ConsolePageLayout,
    Rul,
    NormalAttack,
    AdvancedThreat,
    HackerAnalysis
  },
  data() {
    return {
      wafUrl: '',
      activeTabName: this.$route.fullPath.split('/')[2],
      wholesite: '',
      specialurl: '',
      site_val: '',
      wholesiteLoading: true,
      tabShow: true,
      currentTab: 'NormalAttack'
    }
  },
  mounted() {
    if (this.$route.fullPath.split('/')[2].indexOf('hackerProfile') !== -1) {
      this.tabShow = false
    } else {
      this.tabShow = true
    }
    CommonResource.getReportToken({
      report_type: 'waf'
    }).then(response => {
      const data = response.data.data
      this.wafUrl = `http://ssa.yundun.com/waf?id=${data.member_id}&token=${data.token}`
      console.log('waf_token', response)
    })
  },
  watch: {
    $route(to, from) {
      const toDepth = to.fullPath.split('/')
      this.activeTabName = `${toDepth[2]}`
      if (toDepth[2].indexOf('hackerProfile') !== -1) {
        this.tabShow = false
      } else {
        this.tabShow = true
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      const type = `${tab.name}`
      if (type === 'viewable') {
        window.open(this.wafUrl)
        this.$router.push('/menaceAnalyze/' + this.currentTab)
      } else {
        this.$router.push(`/menaceAnalyze/${tab.name}`)
        this.currentTab = type
      }
    }
  }
}
</script>
<style  lang="css" scoped>
.cacheTitle {
  border: 1px solid #2c91e6;
  background: #e9f5fc;
  padding-left: 20px;
  color: #696969;
}

.textareaStyle {
  margin-top: 35px;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, .18), 0 0 6px 0 rgba(0, 0, 0, .13);
}

.textarea_style {
  resize: none;
  border: none;
  color: #696969;
}

.cacheBtn {
  margin-top: 30px;
}

.cacheBtn .btnRefresh {
  width: 135px;
}

.content-bg {
  background: #F9F9F9;
  padding: 10px;
}
</style>
