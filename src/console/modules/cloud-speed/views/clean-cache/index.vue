<template  lang="html">
<console-page-layout title="清理缓存">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="整站刷新" name="first">
      <div>
        <div class="cacheTitle">
          <p>1.请输入需要刷新的域名如：www.demo.com，多个域名请用回车分隔。</p>
          <p>2.非本账号下的域名将被忽略。</p>
          <p>3.单次最多支持20条</p>
        </div>
        <div class="textareaStyle">
          <el-input class="textarea_style" type="textarea" :rows="8" placeholder="整站刷新" v-model="wholesite" v-loading="wholesiteLoading" element-loading-text="拼命加载中"></el-input>
        </div>
        <div  class="cacheBtn">
          <i-button class="btnRefresh" type="primary" @click="handerTabUrlRefresh">刷新</i-button>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="指定URL刷新" name="second">
      <div>
        <div class="cacheTitle">
          <p>1.请输入需要刷新的URL，以http(s)://开头，如:http://www.demo.com/img.png，多个URL请用回车分隔。</p>
          <p>2.非本账号下的URL将被忽略。</p>
          <p>3.单次最多支持20条</p>
        </div>
        <div class="textareaStyle">
          <el-input class="textarea_style" type="textarea" :rows="8"  placeholder="指定URL刷新……" v-model="specialurl"></el-input>
        </div>
        <div class="cacheBtn">
          <i-button class="btnRefresh" type="primary" @click="handerTabUrlRefresh">刷新</i-button>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</console-page-layout>
</template>
<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import Rul from 'common/utils/verify'

  export default {
    components: {
      ConsolePageLayout,
      Rul
    },
    data() {
      return {
        activeName: 'first',
        wholesite: '',
        specialurl: '',
        site_val: '',
        wholesiteLoading: true
      }
    },
    created() {
      this.fetchLogList()
    },
    methods: {
      handleClick(tab, event) {
      },
      handerTabUrlRefresh() {
        const params = {
          specialurl : this.specialurl.split('\n'),
          wholesite : this.wholesite.split('\n')
        }
        const wholesiteReg = Rul.domain
        const specialurlReg = Rul.defaultUrl
        const specialurlLength = params.specialurl.length
        const wholesiteLength = params.wholesite.length
        if (wholesiteLength > 20) {
          this.$message({
            showClose: true,
            message: '整站刷新下的域名单次最多支持20条',
            type: 'error'
          })
          return false
        }
        if (specialurlLength > 20) {
          this.$message({
            showClose: true,
            message: '指定URL刷新下的域名单次最多支持20条',
            type: 'error'
          })
          return false
        }
        /*整站刷新 格式验证*/
        let wholesiteArrTest
        for (let i = 0; i < wholesiteLength; i++) {
          if (!wholesiteReg.test(params.wholesite[i]) && (params.wholesite[i] !== '')) {
            this.$message({
              showClose: true,
              message: '整站刷新下的域名格式有误',
              type: 'error'
            })
            return false
          }
          /*去重*/
          wholesiteArrTest = params.wholesite[i]
          for (let j = i + 1; j < wholesiteLength; j++) {
            if (wholesiteArrTest === params.wholesite[j]) {
              this.$message({
                showClose: true,
                message: '整站刷新下的域名有重复',
                type: 'error'
              })
              return false
            }
          }
        }
        /*指定URL刷新 格式验证*/
        let specialurlArrTest
        for (let i = 0; i < specialurlLength; i++) {
          if (!specialurlReg.test(params.specialurl[i]) && (params.specialurl[i] !== '')) {
            this.$message({
              showClose: true,
              message: '指定URL刷新下的域名格式有误',
              type: 'error'
            })
            return false
          }
          /*去重*/
          specialurlArrTest = params.specialurl[i]
          for (let j = i + 1; j < specialurlLength; j++) {
            if (specialurlArrTest === params.specialurl[j]) {
              this.$message({
                showClose: true,
                message: '指定URL刷新下的域名有重复',
                type: 'error'
              })
              return false
            }
          }
        }
        this.fetchPut('Web.Domain.DashBoard.saveCache', params).then(result => {
          if (result.ok) {
            result.json().then(res => {
              this.windowMessage(res)
            })
          }
        }, e => {})
      },
      fetchLogList() {
        const params = {}
        this.fetchGet('Web.Domain.DashBoard.getCache', params).then(result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && (res.status.code === 1) && res.data) {
                this.wholesiteLoading = false
                const wholesiteTest = res.data.wholesite
                const specialurlTest = res.data.specialurl
                const specialurlstr = specialurlTest.toString()
                const wholesitestr = wholesiteTest.toString()
                const wholesiteStrn = wholesitestr.replace(/,/g,'\n')
                const specialurlStrn = specialurlstr.replace(/,/g,'\n')
                this.wholesite = wholesiteStrn
                this.specialurl = specialurlStrn
              }
            })
          }
        }, e => {})
      }
    }
  }

</script>
<style  lang="css" scoped>
.cacheTitle{
  border: 1px solid #2c91e6;
  background: #e9f5fc;
  padding-left: 20px;
  color: #696969;
}
.textareaStyle{
  margin-top: 35px;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, .18), 0 0 6px 0 rgba(0, 0, 0, .13);
}
.textarea_style {
  resize: none;
  border: none;
  color: #696969;
}
.cacheBtn{
  margin-top: 30px;
}
.cacheBtn .btnRefresh{
  width: 135px;
}
</style>
