<template lang="html">
  <el-dialog title="替身镜像配置" :closeOnClickModal="true" v-model="showDeployMirrorVisible" :close-on-click-modal="false" :show-close="false" @close="triggerDeployMirrorVisible(false)">
    <div class="addMirrorInfo">
      <div>1.起始抓取页面：替身将从您指定的页面开始抓取内容，如果您使用了非80端口，建议您将非80端口的内容主页添加在起始抓取页面中。</div>
      <div>2.黑名单URL:替身不缓存该URL，用户请求此URL的时候可正常到源取数据。</div>
      <div>3.不支持添加泛域名如：*.demo.com，一次输入域名上限20条。</div>
      <div>4.您的域名接入YUNDUN云解析之后，将会获得更好的备份效果。</div>
    </div>
    <el-row :gutter="12" class="first_row">
      <el-col :span="3" class="add_title">备份内容配置：</el-col>
      <el-col :span="8">
        <el-radio-group v-model="backupContent" :data-id="showBackupContent">
          <el-radio :label="0">首页</el-radio>
          <el-radio :label="1">全站</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="13"></el-col>
    </el-row>
    <el-row :gutter="12" class="first_row">
      <el-col :span="3" class="add_title">每日定时更新：</el-col>
      <el-col :span="21">
        <el-switch v-model="regularUpdate" on-color="#8aca36" off-color="#c2c2c2" on-value="1" off-value="0" :data-id="showRegularUpdate"></el-switch>
        <span class="marginLeft2">采用独家智能算法，每日定时抓取页面内容</span>
      </el-tooltip>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="first_row">
      <el-col :span="3" class="add_title">起始抓取页面：</el-col>
      <el-col :span="20" class="addMirrorTable">
        <el-table :data="initialList" element-loading-text="拼命加载中" fit style="width: 100%" height="150" :data-id="showInitialList">
          <el-table-column width="270" prop="url" label="URL(请输入以http://开头的URL)"  align="left">
            <template scope="scope">
              <el-input type="text" v-model="scope.row.url" :readonly="scope.row.disabled" :class="scope.row.borderNone" @blur="testUrl(scope.row.url)"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="100" prop="" label="端口"  align="left">
            <template scope="scope">
              <el-input type="text" v-model="scope.row.port" :readonly="scope.row.disabled" :class="scope.row.borderNone" @blur="testPort(scope.row.port)"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="80" prop="" label="操作"  align="right">
            <template scope="scope">
              <el-popover ref="ifDelWebsite" placement="top" width="100" trigger="click" v-model="popoverInitialArray[scope.$index].flag">
                <p>确认删除当前行的域名吗？</p>
                <div style="text-align: right; margin: 0">
                  <i-button size="mini" type="text" @click="handleInitialCancel(scope.$index)">取消</i-button>
                  <i-button type="primary" size="mini" @click="handleInitialConf(scope.$index)">确定</i-button>
                </div>
              </el-popover>
              <i-button type="text" icon="delete" v-popover:ifDelWebsite></i-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="1">
        <i-button type="primary" size="small" @click="addInitialPage">+</i-button>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="first_row">
      <el-col :span="3" class="add_title">黑名单URL：</el-col>
      <el-col :span="20" class="addMirrorTable">
        <el-table :data="blackList" element-loading-text="拼命加载中" fit style="width: 100%" height="250" :data-id="showBackupInfoList">
          <el-table-column prop="url" label="URL(请输入以http://开头的URL)"  align="left">
            <template scope="scope">
              <el-input type="text" v-model="scope.row.url" :readonly="scope.row.disabled" :class="scope.row.borderNone" @blur="testUrl(scope.row.url)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作"  align="right">
            <template scope="scope">
              <el-popover ref="ifDelWebsite" placement="top" width="100" trigger="click" v-model="popoverArray[scope.$index].flag">
                <p>确认删除当前行的域名吗？</p>
                <div style="text-align: right; margin: 0">
                  <i-button size="mini" type="text" @click="handleCancel(scope.$index)">取消</i-button>
                  <i-button type="primary" size="mini" @click="handleConf(scope.$index)">确定</i-button>
                </div>
              </el-popover>
              <i-button type="text" icon="delete" v-popover:ifDelWebsite></i-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="1">
        <i-button type="primary" size="small" @click="addDeployMirror">+</i-button>
      </el-col>
    </el-row>
    <div slot="footer">
      <i-button @click="closeDeployMirror" size="small">取 消</i-button>
      <i-button type="primary" @click="saveDeployMirror" size="small">确 定</i-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import Rul from 'common/utils/verify'
import SourceMirror from '../../../resource/SourceMirror'

export default {
  components: {
  },
  data() {
    return {
      popoverArray: [],
      popoverInitialArray: [],
      regularUpdate: '',
      backupContent: 1,
      blackList: [],
      initialList: []
    }
  },
  computed: {
    showDeployMirrorVisible() {
      return this.$store.state.dialog.deployMirror.visible
    },
    showMirrorDomain() {
      return this.$store.state.domain.package.doubleMirrorDomain
    },
    showMirrorDomainId() {
      return this.$store.state.domain.package.doubleMirrorDomainId
    },
    showBackupInfoList() {
      const blackList = this.$store.state.doubleMirror.backupInfoList
      blackList.forEach((v, i) => {
        this.popoverArray.push({ flag: false })
      }) 
      return this.blackList = blackList
    },
    showInitialList() {
      const initialList = this.$store.state.doubleMirror.initialInfoList
      initialList.forEach((v, i) => {
        this.popoverInitialArray.push({ flag: false })
      })
      return this.initialList = initialList
    },
    showBackupContent() {
      return this.backupContent = this.$store.state.doubleMirror.backupContent
    },
    showRegularUpdate() {
      return this.regularUpdate = this.$store.state.doubleMirror.regularUpdate
    }
  },
  created() {
  },
  methods: {
    closeDeployMirror() {
      this.blackList = []
      this.initialList = []
      this.triggerDeployMirrorVisible(false)
    },
    testUrl(val) {
      if (val === '') {
        this.$message({
          showClose: true,
          message: 'URL不能为空',
          type: 'error'
        })
        return false
      } else if (!Rul.defaultUrl.test(val)) {
        this.$message({
          showClose: true,
          message: 'URL格式不正确',
          type: 'error'
        })
        return false
      } else if (!Rul.httpUrl.test(val)) {
        this.$message({
          showClose: true,
          message: '暂不支持HTTPS协议',
          type: 'error'
        })
        return false
      } else {
        return
      }  
    },
    testPort(val) {
      if (val === '') {
        this.$message({
          showClose: true,
          message: ' 端口不能为空',
          type: 'error'
        })
        return false
      } else if (!Rul.expPort.test(val) || (val > 65535) || (val < 0)) {
        this.$message({
          showClose: true,
          message: '端口格式不正确',
          type: 'error'
        })
        return false
      } else {
        return
      }  
    },
    async saveDeployMirror() {
      const initialUrl = []
      const initialPort = []
      for (let i = 0; i < this.initialList.length; i++) {
        if ((this.initialList[i].url === '') && (this.initialList[i].port === '')) {
          this.$message({
            showClose: true,
            message: 'URL和端口不能为空',
            type: 'error'
          })
          return false
        } else if ((!Rul.defaultUrl.test(this.initialList[i].url)) && (!Rul.expPort.test(this.initialList[i].port) || (this.initialList[i].port > 65535) || (this.initialList[i].port < 0))) {
          this.$message({
            showClose: true,
            message: 'URL或者端口格式不正确',
            type: 'error'
          })
          return false
        } else {
          initialUrl.push(this.initialList[i].url)
          initialPort.push(this.initialList[i].port)
        }
      }
      const url = []
      for (let i = 0; i < this.blackList.length; i++) {
        if (this.blackList[i].url === '') {
          this.$message({
            showClose: true,
            message: 'URL不能为空',
            type: 'error'
          })
          return false
        } else if (!Rul.defaultUrl.test(this.blackList[i].url)) {
          this.$message({
            showClose: true,
            message: 'URL格式不正确',
            type: 'error'
          })
          return false
        } else if (!Rul.httpUrl.test(this.blackList[i].url)) {
          this.$message({
            showClose: true,
            message: '暂不支持HTTPS协议',
            type: 'error'
          })
          return false
        } else {
          url.push(this.blackList[i].url)
        }
      }
      const data = {
        domain: this.showMirrorDomain,
        id: this.showMirrorDomainId,
        black_urls: url,
        backup_content: this.backupContent,
        regular_update: this.regularUpdate,
        initial_fetch_urls: initialUrl,
        initial_fetch_ports: initialPort
      }
      const pageSize = this.$store.state.doubleMirror.pageSize
      const params = {
        data,
        page: {
          page: 1,
          per_page: pageSize
        }
      }
      this.deployDoubleMirror(params)
      await this.testshow()
    },
    testshow() {
      const statusCode = this.$store.state.doubleMirror.statusCode
      console.log('statusCode', statusCode)
      if (statusCode === 1) {
        this.triggerDeployMirrorVisible(false)
      }
    },
    // delete 弹框
    handleCancel(index) {
      this.popoverArray[index].flag = false
      return
    },
    handleConf(index) {
      this.popoverArray[index].flag = false
      this.deleteDeployDoubleMirrorList(index)
    },
    handleInitialCancel(index) {
      this.popoverInitialArray[index].flag = false
      return
    },
    handleInitialConf(index) {
      this.popoverInitialArray[index].flag = false
      this.deleteInitialMirrorList(index)
    },
    addDeployMirror() {
      if (this.blackList.length > 19) {
        this.$message({
          showClose: true,
          message: '已达上限,无法添加',
          type: 'error'
        })
        return false
      }
      this.addDeployDoubleMirrorList()
    },
    addInitialPage() {
      if (this.initialList.length > 19) {
        this.$message({
          showClose: true,
          message: '已达上限,无法添加',
          type: 'error'
        })
        return false
      }
      this.addInitialMirrorList()
    },
    ...mapActions([
      'deleteDeployDoubleMirrorList',/*delete*/
      'addDeployDoubleMirrorList',/*add*/
      'addInitialMirrorList',/*add initial page*/
      'deleteInitialMirrorList',/*delete initial page*/
      'deployDoubleMirror',/*save*/
      'triggerDeployMirrorVisible'/*配置弹框*/
    ])
  }
}
</script>

<style lang="css" scoped>
  .addMirrorInfo {
    border: 1px solid #abd3f5;
    padding: 10px 10px;
    background-color: #f5fafd;
  }
</style>
<style>
  .el-dialog__body {
    padding: 20px 20px!important;
    color: #48576a;
    font-size: 14px;
    border-bottom: 2px solid #eaeaea;
  }
  .borderNone input {
    border: none;
  }
  .addMirrorTable .el-table {
    border: none;
  }
  .addMirrorTable .el-table tr:hover, .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff;
  }
  .marginLeft2 {
    margin-left: 20px;
  }
</style>
