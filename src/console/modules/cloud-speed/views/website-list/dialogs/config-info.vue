<!-- 添加网站弹框 -->
<template lang="html">
  <!-- 记录配置 -->
  <el-dialog title="记录配置" :visible.sync="websiteConfigVisible" size="large" :close-on-click-modal="true" @open="initConfig" @close="resetConfig">
    <el-form :model="websiteConfig" ref="websiteConfig" :rules="websiteRules" label-width="100px" label-position="left" v-loading="websiteConfigLoading" element-loading-text="拼命加载中...">
      <el-form-item label="取源协议" prop="get_source_protocol">
        <el-radio-group v-model="websiteConfig.get_source_protocol">
          <el-radio label="follow">协议跟随</el-radio>
          <el-radio label="http">HTTP</el-radio>
          <el-radio label="https">HTTPS</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="es-form-item" label="取源HOST" prop="back_source_host">
        <el-radio-group v-model="websiteConfig.back_source_host">
          <el-radio label="default">默认</el-radio>
          <el-radio label="diy">自定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="es-form-item" prop="diy_host" v-show="websiteConfig.back_source_host === 'diy'">
        <el-input class="followedDiy" placeholder="www.yundun.com" v-model="websiteConfig.diy_host" ></el-input>
      </el-form-item>
      <el-form-item label="负载均衡模式" prop="load_balance_method">
        <el-radio-group v-model="websiteConfig.load_balance_method">
          <el-radio label="round_robin">轮询</el-radio>
          <el-radio label="ip_hash">IP哈希</el-radio>
          <el-radio label="cookie">COOKIE粘住</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="回源设置" prop="back_source_type">
        <el-radio-group v-model="websiteConfig.back_source_type">
          <el-radio label="ip">回源到IP</el-radio>
          <el-radio label="domain">回源到域名</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="线路配置" prop="source_ips">
        <template v-if="websiteConfig.back_source_type === 'ip'">
          <i-button class="add-item" icon="plus" type="primary" @click="addWebsiteItem"></i-button>
          <el-table :data="tempIPs" stripe style="width: 100%">
            <el-table-column class-name="row-padding" align="center" label="源IP" min-width="110">
              <template scope="scope">
                <el-input @blur="showError(scope,'value')" :class="{ 'is-error': !validIPs[scope.$index].value }" v-model="scope.row.value" placeholder="0.0.0.0"></el-input>
              </template>
            </el-table-column>
            <el-table-column class-name="row-padding" align="center" label="端口" min-width="80">
              <template scope="scope">
                <el-input @blur="showError(scope,'port')" :class="{ 'is-error': !validIPs[scope.$index].port }" v-model="scope.row.port"></el-input>
              </template>
            </el-table-column>
            <el-table-column class-name="row-padding" align="center" label="线路" min-width="120">
              <template scope="scope">
                <el-select class="reset-el-select-view" v-model="scope.row.view">
                  <el-option v-for="(item, index) in configView.options" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column class-name="row-padding" align="center" label="优先级" min-width="80">
              <template scope="scope">
                <el-select class="reset-el-select-priority" v-model="scope.row.priority">
                  <el-option v-for="(item, index) in priorityOptions" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column class-name="row-padding" align="center" label="操作" width="90">
              <template scope="scope">
                <el-popover ref="ifDelWebsite" placement="top" width="100" trigger="click" v-model="popoverArray[scope.$index].flag">
                  <p>确认删除当前行的源IP吗？</p>
                  <div style="text-align: right; margin: 0">
                    <i-button size="mini" type="text" @click="handleCancel(scope.$index)">取消</i-button>
                    <i-button type="primary" size="mini" @click="handleConf(scope.$index)">确定</i-button>
                  </div>
                </el-popover>
                <i-button type="text" icon="delete" v-popover:ifDelWebsite></i-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else>
          <el-table :data="tempDomains" stripe style="width: 100%">
            <el-table-column class-name="row-padding" align="center" label="域名" min-width="110">
              <template scope="scope">
                <el-input @blur="showError(scope,'domain')" :class="{ 'is-error': !validDomain.domain }" v-model="scope.row.value" placeholder="如www.yundun.com"></el-input>
              </template>
            </el-table-column>
            <el-table-column class-name="row-padding" align="center" label="端口" min-width="80">
              <template scope="scope">
                <el-input @blur="showError(scope,'dport')" :class="{ 'is-error': !validDomain.port }" v-model="scope.row.port" ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <i-button @click="websiteConfigVisible = false">取 消</i-button>
      <i-button type="primary" @click="handleSubmit('websiteConfig')" :loading="addLoading">保 存</i-button>
    </div>
  </el-dialog>
</template>

<script>
import verify from 'common/utils/verify'
import { mapActions } from 'vuex'

export default {
  data() {
    const validateDiyHost = (rule, value, callback) => {
      if (this.websiteConfig.back_source_host === 'diy') {
        if (!Boolean(value)) {
          callback(new Error('请填写自定义的回源HOST'))
        } else if (!verify.domain.test(value)) {
          callback(new Error('网站格式不正确'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      websiteConfigVisible: false,
      count: 0,
      websiteConfig: {
        domain_id: '',
        type: 'A',
        get_source_protocol: 'http',
        back_source_host: 'default',
        diy_host: '',
        load_balance_method: 'round_robin',
        back_source_type: '',
        source_ips: []
      },
      tempIPs: [{
        type: 'A',
        view: 'primary',
        value: '',
        port: 80,
        priority: 1
      }],
      tempDomains: [{
        type: 'CNAME',
        view: 'primary',
        value: '',
        port: 80,
        priority: 1
      }],
      websiteRules: {
        diy_host: [
          { validator: validateDiyHost,trigger: 'blur' }
        ]
      },
      addLoading: false,
      configView: {
        value: 'primary',
        options: [{
          value: 'primary',
          label: '主线路'
        }, {
          value: 'backup',
          label: '备线路'
        }]
      },
      priorityOptions: [
        { label:'1',value: 1 },
        { label:'2',value: 2 },
        { label:'3',value: 3 },
        { label:'4',value: 4 },
        { label:'5',value: 5 },
        { label:'6',value: 6 },
        { label:'7',value: 7 },
        { label:'8',value: 8 },
        { label:'9',value: 9 },
        { label:'10',value: 10 }
      ],
      // websiteForm v-loading
      websiteConfigLoading: true,
      // popover
      popoverArray: [{ flag: false }],
      // validate ips
      validIPs: [{
        value: true,
        port: true
      }],
      // validate domain
      validDomain: {
        domain: true,
        port: true
      }
    }
  },
  created() {
    this.$store.watch(
      state => state.dialog.configInfo.visible,
      visible => {
        this.websiteConfigVisible = visible
      }
    )
  },
  computed: {
    domainId() {
      return this.$store.state.website.domain.id
    }
  },
  methods: {
    ...mapActions([
      'triggerConfigInfoVisible',
      'getWebsiteConfigInfo',
      'updateWebsiteConfig'
    ]),
    fetchWebsiteConfigInfo() {
      const params = {
        domain_id: this.domainId
      }
      this.getWebsiteConfigInfo(params).then(response => {
        const data = response.data.data
        this.websiteConfig.domain_id = data.domain_id
        this.websiteConfig.get_source_protocol = data.domain_proxy_get_source.get_source_protocol
        this.websiteConfig.back_source_host = data.domain_proxy_get_source.back_source_host
        this.websiteConfig.back_source_type = data.domain_proxy_get_source.back_source_type
        this.websiteConfig.diy_host = data.domain_proxy_get_source.diy_host
        this.websiteConfig.load_balance_method = data.load_balance.load_balance_method
        if (this.websiteConfig.back_source_type === 'domain') {
          this.tempDomains = data.source_ips
          this.validDomain = {
            domain: true,
            port: true
          }
        } else if (this.websiteConfig.back_source_type === 'ip') {
          this.tempIPs = data.source_ips
          this.tempIPs.forEach(() => {
            this.popoverArray.unshift()
            this.popoverArray.push({ flag: false })
            this.validIPs.unshift()
            this.validIPs.push({
              value: true,
              port: true
            })
          })
        } else {
          return
        }
        this.count = 1
        this.websiteConfigLoading = false
      })
    },
    initConfig() {
      this.fetchWebsiteConfigInfo()
    },
    resetConfig() {
      this.validIPs = [{
        value: true,
        port: true
      }]
      this.tempIPs = [{
        type: 'A',
        view: 'primary',
        value: '',
        port: 80,
        priority: 1
      }],
      this.tempDomains = [{
        type: 'CNAME',
        view: 'primary',
        value: '',
        port: 80,
        priority: 1
      }],
      this.websiteConfigLoading = true
      this.triggerConfigInfoVisible(false)
      this.websiteConfig.back_source_type = ''
    },
    addWebsiteItem() {
      this.tempIPs.push({
        type: 'A',
        view: 'primary',
        value: '',
        port: 80,
        priority: 1
      })
      this.popoverArray.push({ flag: false })
      this.validIPs.push({
        value: true,
        port: true
      })
    },
    // for popover
    handleCancel(index) {
      this.popoverArray[index].flag = false
      return
    },
    handleConf(index) {
      this.popoverArray[index].flag = false
      this.tempIPs.splice(index, 1)
      this.popoverArray.splice(index, 1)
      this.validIPs.splice(index,1)
    },
    handleSubmit(formName) {
      if (this.websiteConfig.back_source_type === 'ip') {
        const primaryExist = this.tempIPs.some((item,i,arr) =>
          item.view === 'primary'
        )
        if (!primaryExist) {
          this.$message({
            type: 'error',
            message: '请至少添加一条主线路'
          })
          return
        }
        this.tempIPs.forEach((item,i,arr) => {
          const value = item.value
          if (value && verify.ipReg.test(value) &&
          !verify.ipReg192.test(value) &&
          !verify.ipReg10.test(value) &&
          !verify.ipReg172.test(value)) {
            this.validIPs[i].value = true
          } else {
            this.validIPs[i].value = false
          }
          const port = Number(item.port)
          if (port && (port % 1 === 0) && port > -1 && port < 65536) {
            this.validIPs[i].port = true
          } else {
            this.validIPs[i].port = false
          }
        })
        const isChecked = this.validIPs.every(item => item.value || item.port)
        if (!isChecked) {
          this.$message({
            type: 'error',
            message: '你提交的信息有误，请核对后再提交。'
          })
          return
        }
        this.websiteConfig.source_ips = this.tempIPs
      } else {
        this.tempDomains.forEach((item, index, arr) => {
          const value = item.value.replace(/\.$/, '').toLowerCase()
          if (value && !verify.ipReg.test(value) && verify.domain.test(value) && /[^-]$/.test(value)) {
            this.validDomain.domain = true
          } else {
            this.validDomain.domain = false
          }
          const port  = Number(item.port)
          if (port && (port % 1 === 0) && port > -1 && port < 65536) {
            this.validDomain.port = true
          } else {
            this.validDomain.port = false
          }
        })
        const isChecked = this.validDomain.domain && this.validDomain.port
        if (!isChecked) {
          this.$message({
            type: 'error',
            message: '你提交的信息有误，请核对后再提交。'
          })
          return
        }
        this.websiteConfig.source_ips = this.tempDomains
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateConfig()
        } else {
          this.$message({
            type: 'info',
            message: '你提交的信息有误，请核对后再提交。'
          })
          return false
        }
      })
    },
    updateConfig() {
      this.addLoading = true
      this.updateWebsiteConfig(this.websiteConfig).then(() => {
        this.websiteConfigVisible = false
        this.addLoading = false
        this.triggerConfigInfoVisible(false)
        this.$store.commit({
          type: 'WEBSITE_ADDED',
          websiteAdded: true
        })
      }).catch(() => {
        this.addLoading = false
      })
    },
    showError(scope,tag) {
      let value = scope.row[tag]
      switch (tag) {
        case 'value':
          if (value && verify.ipReg.test(value) &&
          !verify.ipReg192.test(value) &&
          !verify.ipReg10.test(value) &&
          !verify.ipReg172.test(value)) {
            this.validIPs[scope.$index].value = true
          } else {
            this.validIPs[scope.$index].value = false
          }
          break
        case 'port':
          if (value && (value % 1 === 0) && value > -1 && value < 65536) {
            this.validIPs[scope.$index].port = true
          } else {
            this.validIPs[scope.$index].port = false
          }
          break
        case 'domain':
          value = scope.row.value.replace(/\.$/, '').toLowerCase()
          if (value && !verify.ipReg.test(value) && verify.domain.test(value) && /[^-]$/.test(value)) {
            this.validDomain.domain = true
          } else {
            this.validDomain.domain = false
          }
          break
        case 'dport':
          value = scope.row.port
          if (!(value && (value % 1 === 0) && value > -1 && value < 65536)) {
            this.validDomain.port = false
          } else {
            this.validDomain.port = true
          }
          break
        default:
          return
      }
    }
  }
}
</script>

<style lang="css" scoped>
.add-item {
  height: 39px;
  width: 39px;
  margin-right: -4px;
  border-radius: 0;
}
.add-item + .el-table {
  display: inline-block;
  width: calc(100% - 40px) !important;
  border-left: 0;
  border-top: 0;
  vertical-align: top;
}
.el-radio-group .el-radio {
  min-width: 80px;
}
.followedDiy {
  width: auto;
}
</style>

<style>
.is-error > .el-input__inner {
  border-color: #ff4949;
}
.reset-el-select-view > .el-input {
  min-width: 90px;
}
.reset-el-select-priority > .el-input {
  min-width: 60px;
}
.es-form-item {
  display: inline-block;
}
.es-form-item + .es-form-item{
  margin-left: -90px;
}
</style>
