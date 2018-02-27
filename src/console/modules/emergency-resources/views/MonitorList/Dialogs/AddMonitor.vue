<template lang="html">
  <el-dialog title="添加监控" class="addMonitor_dialog" :visible.sync="alarmConfigVisible" :before-close="closeAddMonitorDialog">
    <div class="body addMonitorDialog">
      <el-row :gutter="12" class="margin_tp0">
        <el-col :span="6">监控项目名称：</el-col>
        <el-col :span="18">
          <el-input class="search" placeholder="请输入监控项目名称,最长15个字符" v-model="name" size="small" :maxlength="15">
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6"><span class="redStar">*</span>监控IP：</el-col>
        <el-col :span="18">
          <el-input class="search" placeholder="请输入监控IP" v-model="project" size="small" @blur="projectTest">
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6"><span class="redStar">*</span>端口：</el-col>
        <el-col :span="18">
          <el-input class="search" placeholder="请输入端口，1~65535" v-model="port" size="small" @blur="portTest">
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6"><span class="redStar">*</span>监控协议：</el-col>
        <el-col :span="18">
          <el-radio-group v-model="protocol">
            <el-radio :label="0">HTTP</el-radio>
            <el-radio :label="1">HTTPS</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6"><span class="redStar">*</span>域名：</el-col>
        <el-col :span="18">
          <el-input class="search" placeholder="请输入域名信息" v-model="domain" size="small" @blur="domainTest">
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6"><span class="redStar">*</span>监控路径：</el-col>
        <el-col :span="18">
          <el-input class="search" placeholder="请输入监控路径，以'/'开头" v-model="path" size="small" @blur="pathTest">
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6"><span class="redStar">*</span>请求方法：</el-col>
        <el-col :span="18">
          <el-radio-group v-model="methodAjax">
          <el-radio :label="0">HEAD</el-radio>
          <el-radio :label="1">GET</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>      
      <el-row :gutter="12">
        <el-col :span="6"><span class="redStar">*</span>监控频率：</el-col>
        <el-col :span="18">
          <el-radio-group v-model="frequency">
            <el-radio :label="1">1分钟</el-radio>
            <el-radio :label="3">3分钟</el-radio>
            <el-radio :label="5">5分钟</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <i-button @click="closeAddMonitorDialog">取 消</i-button>
      <i-button type="primary" @click="saveAddMonitor">确 定</i-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import Rul from 'common/utils/verify'

export default {
  components: {
    Rul
  },
  computed: {
    alarmConfigVisible: {
      get() {
        return this.$store.state.dialog.addMonitor.visible
      },
      set: newValue => {}
    }
  },
  methods: {
    projectTest() {
      const value = this.project
      if (value === '') {
        this.$message({
          showClose: true,
          message: '监控IP不能为空',
          type: 'error'
        })
        return false
      } else if (!Rul.ipReg.test(value)) {
        this.$message({
          showClose: true,
          message: '监控IP格式不正确',
          type: 'error'
        })
        return false
      } else if (Rul.ipReg192.test(value) || Rul.ipReg10.test(value) || Rul.ipReg172.test(value)) {
        this.$message({
          showClose: true,
          message: '当前监控IP格式为私有IP，请重新输入',
          type: 'error'
        })
        return false
      } else if (value.substring(0,3) === '127') {
        this.$message({
          showClose: true,
          message: '当前监控IP为回送地址，请重新输入',
          type: 'error'
        })
      } else {
        return
      }
    },
    domainTest() {
      const value = this.domain
      if (value === '') {
        this.$message({
          showClose: true,
          message: '域名信息不能为空',
          type: 'error'
        })
        return false
      } else if (!Rul.domain.test(value)) {
        this.$message({
          showClose: true,
          message: '域名信息格式不正确',
          type: 'error'
        })
        return false
      } else {
        return
      }
    },
    pathTest() {
      const value = this.path
      if (value === '') {
        this.$message({
          showClose: true,
          message: '监控路径不能为空',
          type: 'error'
        })
        return false
      } else if (!Rul.noProtocolUrl.test(value)) {
        this.$message({
          showClose: true,
          message: '监控路径格式不正确,必须以"/"开头',
          type: 'error'
        })
        return false
      } else {
        return
      }
    },
    portTest() {
      const value = this.port
      if (value === '') {
        this.$message({
          showClose: true,
          message: '监控端口不能为空',
          type: 'error'
        })
        return false
      } else if (!Rul.expPort.test(value) || (value < 1) || (value > 65535)) {
        this.$message({
          showClose: true,
          message: '监控端口格式不正确,1~65535',
          type: 'error'
        })
        return false
      } else {
        return
      }
    },
    ...mapActions([
      'addMonitorSave',
      'triggerAddMonitorVisible'
    ]),
    saveAddMonitor() {
      /*增加验证信息*/
      //监控项目
      const project = this.project
      if (project === '') {
        this.$message({
          showClose: true,
          message: '监控IP不能为空',
          type: 'error'
        })
        return false
      } else if (!Rul.ipReg.test(project)) {
        this.$message({
          showClose: true,
          message: '监控IP格式不正确',
          type: 'error'
        })
        return false
      } else if (Rul.ipReg192.test(project) || Rul.ipReg10.test(project) 
        || Rul.ipReg172.test(project)) {
        this.$message({
          showClose: true,
          message: '当前监控IP格式为私有IP，请重新输入',
          type: 'error'
        })
        return false
      } else if (project.substring(0,3) === '127') {
        this.$message({
          showClose: true,
          message: '当前监控IP为回送地址，请重新输入',
          type: 'error'
        })
        return false
      } 
      // 端口
      const port = this.port
      if (port === '') {
        this.$message({
          showClose: true,
          message: '监控端口不能为空',
          type: 'error'
        })
        return false
      } else if (!Rul.expPort.test(port) || (port < 1) || (port > 65535)) {
        this.$message({
          showClose: true,
          message: '监控端口格式不正确,1~65535',
          type: 'error'
        })
        return false
      }
      //域名
      const domain = this.domain
      if (domain === '') {
        this.$message({
          showClose: true,
          message: '域名信息不能为空',
          type: 'error'
        })
        return false
      } else if (!Rul.domain.test(domain)) {
        this.$message({
          showClose: true,
          message: '域名信息格式不正确',
          type: 'error'
        })
        return false
      }
      //路径
      const path = this.path
      if (path === '') {
        this.$message({
          showClose: true,
          message: '监控路径不能为空',
          type: 'error'
        })
        return false
      } else if (!Rul.noProtocolUrl.test(path)) {
        this.$message({
          showClose: true,
          message: '监控路径格式不正确,必须以"/"开头',
          type: 'error'
        })
        return false
      }
      
      /**/
      let protocol
      if (this.protocol === 0) {
        protocol = 'HTTP'
      } else {
        protocol = 'HTTPS'
      }
      let methodAjax
      if (this.methodAjax === 0) {
        methodAjax = 'HEAD'
      } else {
        methodAjax = 'GET'
      }
      const data = {
        name: this.name,
        value: this.project,
        domain: this.domain,
        protocol,
        request_method: methodAjax,
        path: this.path,
        port: this.port,
        frequency: this.frequency
      }
     
      const pageSize = this.$store.state.monitor.pageSize
      const params = {
        data,
        page: {
          page: 1,
          per_page: pageSize
        }
      }
      this.addMonitorSave(params)
      setTimeout(() => {
        const statusCode = this.$store.state.monitor.statusCode
        if (statusCode === 1) {
          this.initializationMonitor()
          this.triggerAddMonitorVisible(false)
        }
      },1000)
    },
    closeAddMonitorDialog() {
      this.initializationMonitor()
      this.triggerAddMonitorVisible(false)
    },
    initializationMonitor() {
      this.name = ''
      this.domain = ''
      this.project = ''
      this.path = ''
      this.port = ''
      this.frequency = 3
      this.protocol = 0
      this.methodAjax = 0
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      name: '',/*项目名称*/
      domain: '',/*域名*/
      frequency: 3,/*监控频率*/
      protocol: 0,/*监控协议*/
      methodAjax: 0,/*请求方法*/
      project: '',/*项目*/
      path: '',/*路径*/
      port: ''/*端口*/
    }
  }
}
</script>

<style lang="css" scoped>
  .redStar {
    color: red;
  }
  .addMonitorDialog .el-row{
    margin-top: 20px;
  }
  .addMonitorDialog .el-row .el-col-6 {
    text-align: right;
  }
  .margin_tp0 {
    margin-top: 0!important;
  }
  .addMonitor_dialog .el-input, .addMonitor_dialog .el-input__inner{
    width: 80%;
  }
</style>
<style>
  .addMonitor_dialog .el-dialog--small {
    width: 40%!important;
  }
</style>
