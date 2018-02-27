<template lang="html">
<div class="">
  <el-dialog :title="linkageTitle" :visible.sync="isShow" :before-close="handleClose" @open="updateData" size="small">
    <div class="">
      <el-steps :space="522" :active="active">
        <el-step title="设置联动记录"></el-step>
        <el-step title="宕机处理设置"></el-step>
      </el-steps>
    </div>
    <hr class="dialog-split">
    <div class="second-part">
      <Tip :content="state" className="default" ref="tip" />
      <div class="">
        <div class="" v-show="unsetting">
          <h4>联动DNS记录值设置</h4>
          <el-table :data="gridData" ref="multipleTable" @selection-change="getRecords">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column property="domain" label="域名" width="150"></el-table-column>
            <el-table-column property="record_value" label="服务IP" width="200"></el-table-column>
            <el-table-column property="record_type" label="记录类型"></el-table-column>
            <el-table-column property="record_view_desc" label="线路"></el-table-column>
            <template slot="empty">
              <div class="">
                <p>还没有与IP{{currentIP}}相关联的DNS解析记录值，前往<a href="/console/cloud-resolving#/domainList" target="_blank">云解析</a>添加</p>
              </div>
            </template>
          </el-table>
          <div class="">
            <h4>套餐</h4>
            <el-select v-model="saveConfig.package_id" @change="changePackage">
              <el-option v-for="item in linkagePackage" :key="item.id" :label="item.code" :value="item.id" :disabled="item.disabled">
              </el-option>
            </el-select>
            <p v-show="packageShow">*套餐 {{packageInfo.code}} 到期时间 {{packageInfo.expiry_time}}<span class="outTip" v-if="Number(packageInfo.is_expiry)===1">（已到期）</span>,共{{packageInfo.total_number}}个联动任务， 已用{{packageInfo.used_count}}个，剩余{{packageSpare}}个
            </p>
          </div>

          <i-button style="margin-top: 12px;" @click="next" :disabled="totalNext">下一步</i-button>
        </div>
        <div class="" v-show="!unsetting">
          <h4>宕机联动设置</h4>
          <el-radio-group v-model="saveConfig.down_rule" @change="switchSpare">
            <el-radio :label="'1'">暂停管理记录</el-radio>
            <el-radio :label="'2'">切换至备用IP</el-radio>
          </el-radio-group>
          <el-table :data="spareIPs" v-show="spareIP" v-bind:class="{tableShow:spareIP}">
            <el-table-column prop="ip" label="IP" min-width="500">
            </el-table-column>
            <el-table-column prop="" label="操作" width="55">
              <template scope="scope">
                  <i class="el-icon-delete" @click="handleDelete(scope.row.ip)"></i>
                </template>
            </el-table-column>
            <template slot="append">
                <div v-show="appendSpare" id="appendSpare">
                  <div class="test-box">
                    <el-form ref="ipValidateForm" :rules="rules" :model="ipForm">
                      <el-form-item prop="addSpareIPContent">
                        <el-input type="text"  auto-complete="off" v-model="ipForm.addSpareIPContent" id="test"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
              <div class="button-box">
                <i-button type="text" size="small" @click="cancelContent">取消</i-button><i-button type="text" size="small" @click="saveSpareIp">保存</i-button>
              </div>
              </div>
                  <div class="">
                      <i-button type="text" @click="handleSpare(true)" class="add-button">+</i-button>
                  </div>
              </template>
          </el-table>
          <h4>宕机恢复处理</h4>
          <el-select v-model="saveConfig.resume_rule">
            <el-option v-for="item in handleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <i-button style="margin-top: 12px;" @click="prev">上一步</i-button>
          <i-button style="margin-top: 12px;" @click="complete" :disabled="btnDiasbled">完成</i-button>
        </div>

      </div>

    </div>

  </el-dialog>
</div>
</template>

<script>
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import SourceMonitorResource from '../../../resource/SourceMonitorResource'
import {
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'
import RULE from 'common/utils/verify'
export default {
  // ...mapGetters([
  //         'getLinkageStatus'
  //     ]),
  watch: {
    spareIP(newValue) {
    }
  },
  computed: {
    btnDiasbled: {
      get() {
        return this.spareIPs.length === 0 && this.saveConfig.down_rule === '2'
      }
    },
    totalNext: {
      get() {
        return this.nextStop || this.saveConfig.record_list.length === 0
      }
    },
    isShow: {
      get() {
        return this.$store.state.dialog.linkageSetting.visible
      },
      set: newValue => {
      }
    },
    packageSpare() {
      return Number(this.packageInfo.total_number) - Number(this.packageInfo.used_count)
    }
  },
  data() {
    function validateIp(rule, value, callback) {
      if (RULE.ipReg.test(value) && !RULE.ipReg192.test(value) || value === '') {
        callback()
      } else {
        return callback(new Error('ip格式错误'))
      }
    }
    return {
      linkageTitle: '联动配置',
      isExpired: true,
      diabledBtn: false,
      saveConfig: {
        task_id: '',
        package_id: '',
        record_list: [],
        spare_ips: [],
        down_rule: '1',
        resume_rule: ''
      },
      rules: {
        addSpareIPContent: [{
          required: true,
          message: '请输入IP',
          trigger: 'blur'
        }, {
          validator: validateIp,
          trigger: 'blur'
        }]
      },
      nextStop: false,
      linkageId: '',
      packageShow: false,
      appendSpare: false,
      spareIP: false,
      currentIP: '',
      unsetting: true,
      handleValue: 0,
      active: 0,
      ip: 0,
      tipState: '123456789',
      linkagePackage: [],
      packageInfo: {},
      // status:this.$store.state.dialog.linkageSetting.visible,
      multipleTable: [],
      spareIPs: [],
      ipForm: {
        addSpareIPContent: ''
      },
      handleOptions: [{
        value: '0',
        label: '不处理'
      }, {
        value: '1',
        label: '还原'
      }],
      gridData: [],
      state: ['可对云解析服务中用到该IP的域名进行联动配置，配置后可在被监控的服务器出现访问超时时，联动云解析直接暂停相关联记录或者切换到备用服务器上，保证业务稳定']
    }
  },
  methods: {
    updateData() {
      if (this.$store.state.dialog.linkageSetting.visible) {
        // this.id = this.taskData.id
        this.currentIP = this.taskData.value
        this.linkageTitle = '联动配置' + '(' + this.currentIP + ')'
        this.linkageId = this.taskData.linkage_info.id
        this.saveConfig.task_id = this.taskData.id
        SourceMonitorResource.getLinkageRecords({
          task_id: this.saveConfig.task_id
        }).then(response => {
          if (response.data.status.code === 1 && response.data.data.list &&
            response.data.data.list.length !== 0) {
            this.nextStop = !(this.linkagePackage.length !== 0)
            this.gridData = response.data.data.list
            this.gridData.forEach((item, index) => {
              if (item.checked === true) {
                this.$nextTick(() => {
                  this.$refs.multipleTable.toggleRowSelection(item)
                })
              }
            })
          } else {

          }
        })
        SourceMonitorResource.getLinkageInfo({
          linkage_id: this.linkageId || 0
        }).then(response => {
          if (response.data.status.code === 1) {
            if (response.data.data.linkage_packages &&
              response.data.data.linkage_packages.length !== 0) {
              this.nextStop = !(this.gridData.length !== 0)
              for (const i in response.data.data) {
                if (this.saveConfig.hasOwnProperty(i)) {
                  this.saveConfig[i] = response.data.data[i]
                }
              }
              this.linkagePackage = response.data.data.linkage_packages
              let packageId = ''
              this.linkagePackage.forEach((item, index) => {
                if (item.used === true)
                  packageId = item.id
                if (item.total_number - item.used_count === 0)
                  this.linkagePackage[index].disabled = true
              })
              this.saveConfig.package_id = packageId || this.linkagePackage[0].id
              if (response.data.data.spare_ips && response.data.data.spare_ips[0] !== '') {
                response.data.data.spare_ips.forEach(item => {
                  this.spareIPs.push({
                    ip: item
                  })
                })
              }
            } else {}
          }
        })
      }
    },
    ...mapActions([
      'triggerLinkageSettingVisible' //联动设置窗口

    ]),
    prev() {
      this.unsetting = true
      if (this.active-- < 0) this.active = 0
    },
    next() {
      this.unsetting = false
      if (this.active++ > 2) this.active = 0
    },
    handleClose() {
      this.triggerLinkageSettingVisible(false)
      this.linkagePackage = []
      this.multipleTable = []
      this.gridData = []
      this.spareIPs = []
      this.active = 0
      this.unsetting = true
      this.clearInfo(this.saveConfig)
      this.packageShow = false
      this.appendSpare = false
      this.$refs.ipValidateForm.resetFields()
    },
    emptyValue() {
      const test = document.getElementById('test')
      test.getElementsByTagName('input')[0].value = ''
    },
    handleSpare(status) {
      this.appendSpare = status
      const testId = document.getElementById('appendSpare')
      testId.style.display = 'block'
      this.emptyValue()
    },
    handleDelete(content) {
      this.spareIPs.forEach((item, index) => {
        if (content === item.ip) {
          this.spareIPs.splice(index, 1)
        }
      })
    },
    changePackage(type) {
      this.packageShow = true
      if (this.linkagePackage) {
        this.linkagePackage.forEach(item => {
          if (type === item.id) {
            this.packageInfo = item
          }
        })
      }
    },
    switchSpare(label) {
      this.spareIP = (label === '2')
    },
    cancelContent() {
      this.$refs.ipValidateForm.resetFields()
      this.ipForm.addSpareIPContent = ''
      const testId = document.getElementById('appendSpare')
      testId.style.display = 'none'
    },
    clearInfo(data) {
      for (const i in data) {
        data[i] = typeof(data[i]) === 'string' ? '' : []
        if (i === 'down_rule')
          data[i] = '1'
      }
    },
    saveSpareIp() {
      this.$refs.ipValidateForm.validate(valid => {
        if (valid) {
          if (this.ipForm.addSpareIPContent && this.currentIP !== this.ipForm.addSpareIPContent) {
            this.handleDelete(this.ipForm.addSpareIPContent)
            this.spareIPs.push({
              ip: this.ipForm.addSpareIPContent
            })
            this.cancelContent()
          } else {
            this.$message({
              showClose: true,
              message: 'ip不能为空或不能是被监控项目的ip',
              type: 'error'
            })
          }
        }
      })
    },
    getRecords(selection, row) {
      this.saveConfig.record_list = []
      selection.forEach((item, index) => {
        const current = {}
        current.record_id = item.record_id
        current.record_value = item.record_value
        current.record_type = item.record_type
        current.record_view = item.record_view
        this.saveConfig.record_list.push(current)
      })
    },
    complete() {
      if (this.spareIPs.length !== 0 && this.saveConfig.down_rule === '2') {
        this.saveConfig.spare_ips = []
        this.spareIPs.forEach(item => {
          this.saveConfig.spare_ips.push(item.ip)
        })
      } else {
        delete this.saveConfig.spare_ips
      }
      SourceMonitorResource.saveLinkageSetting(this.saveConfig)
        .then(response => {
          if (response.data.status.code === 1) {
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            })
            this.active = 1
            this.handleClose()
          }
        })
    }
  },
  mounted() {

  },
  components: {
    Tip
  },
  directives: {
    tip: TipDirective
  },
  props: {
    taskData: {
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
.dialog-split {
  background: #efefef;
  margin: auto -19px;
}

.second-part {
  padding-top: 20px;
}

a {
  color: #2d90e6;
}

.spare-show {
  display: block;
}

.add-button {
  width: 20px;
  margin: 5px auto;
  font-size: 18px;
  display: block;
}

.test-box,
.button-box {
  display: inline-block;
}

.test-box {
  margin-top: 10px;
  width: 75%;
}

.tableShow {
  visibility: visible;
}

.outTip {
  color: red;
  font-size: 12px;
}
</style>
