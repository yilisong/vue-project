<template lang="html">
<div class="">
  <el-dialog :title="ipInfo" :visible.sync="isShow" size="tiny" :before-close="handleClose" @open="updateData">
    <el-form :model="alarmSetting" :rules="rules" ref="alarmSetting" label-width="100px">
      <el-form-item label="告警方式" prop="type">
        <el-checkbox-group v-model="alarmSetting.alert_type">
          <el-checkbox label="1">邮件</el-checkbox>
          <el-checkbox label="2">短信</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="连续报警设置" prop="control">
        <el-select v-model="alarmSetting.alert_control">
          <el-option v-for="item in options" :key="item.checked" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
        <p style="display: inline-block;vertical-align: sub;">小时内多次宕机只通知一次</p>
      </el-form-item>
      <el-form-item label="恢复通知" prop="resume">
        <el-checkbox v-model="alarmSetting.resume_alert" true-label="1" false-label="0"></el-checkbox>
      </el-form-item>

      <el-form-item label="消息接收人" prop="member">
        <!-- <el-input v-model.number="alarmSetting.alert_member"></el-input> -->
        <el-select v-model="alarmSetting.alert_receivers" multiple filterable allow-create>
          <el-option v-for="item in optionsMember" :key="item.checked" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
        <p>没有想要的联系人，前往<a href="/console/message-center#/PersonManage" target="_blank">消息中心</a>添加</p>
      </el-form-item>
      <el-form-item label="高级功能">
        <el-checkbox v-model="alarmSetting.alert_callback" true-label="1" false-label="0"></el-checkbox>
      </el-form-item>
      <el-form-item label="" prop="alert_callback_url" v-show="this.alarmSetting.alert_callback === '1'">
        <el-input type=text v-model="alarmSetting.alert_callback_url" placeholder="请输入回调URL" class="input-box-size"></el-input>
      </el-form-item>
      <p class="tip-position" v-show="this.alarmSetting.alert_callback === '1'">宕机或恢复信息将提交到您指定的回调URL上</p>
      <el-form-item label="" prop="alert_callback_secret" v-show="this.alarmSetting.alert_callback === '1'">
        <el-input type=text v-model="alarmSetting.alert_callback_secret" placeholder="请输入回调秘钥" class="input-box-size"></el-input>
      </el-form-item>
      <p class="tip-position" v-show="this.alarmSetting.alert_callback === '1'">用于确定回调通知是由YUNDUN发出，而不是黑客发出</p>
      <el-form-item>
        <i-button @click="handleClose">取消</i-button>
        <i-button type="primary" @click="submitForm('alarmSetting')">保存</i-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import SourceMonitorResource from '../../../resource/SourceMonitorResource'
import RULE from 'common/utils/verify'
import {
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'
export default {
  computed: {
    isShow: {
      get() {
        return this.$store.state.dialog.alarmSetting.visible
      },
      set: newValue => {}
    },
    ipInfo:{
      get() {
        return '报警设置' + '(' + this.ipValue + ')'
      }
    }
  },
  data() {
    function validateName(rule, value, callback) {
      callback()
    }

    function validatePath(rule, value, callback) {
      if (RULE.defenseReferDomain.test(value) || value === '') {
        callback()
      } else {
        return callback(new Error('url格式,长度1-255'))
      }
    }

    function validateKey(rule, value, callback) {
      if (RULE.key.test(value) || value === '') {
        callback()
      } else {
        return callback(new Error('数字和字母组成,长度6-20'))
      }
    }
    return {
      options: [],
      optionsMember: [],
      alarmSetting: {
        task_id: '',
        alert_type: ['1'],
        alert_control: '',
        resume_alert: '0',
        alert_receivers: '',
        alert_group: '',
        alert_callback: '0',
        alert_callback_url: '',
        alert_callback_secret: ''
      },
      rules: {
        type: [{
          validator: validateName,
          trigger: 'blur'
        }],
        control: [{
          validator: validateName,
          trigger: 'blur'
        }],
        resume: [{
          validator: validateName,
          trigger: 'blur'
        }],
        member: [{
          validator: validateName,
          trigger: 'blur'
        }],
        alert_callback_url: [{
          validator: validatePath,
          trigger: 'blur'
        }],
        alert_callback_secret: [{
          validator: validateKey,
          trigger: 'blur'
        }]
      }
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions([
      'triggerAlarmSettingVisible' //联动设置窗口

    ]),
    clearData(data) {
      for (const i in data) {
        if (i === 'alert_type') {
          data[i] = ['1']
        } else if (i === 'resume_alert') {
          data[i] = '0'
        } else if (i === 'alert_callback') {
          data[i] = '0'
        } else if (i === 'alert_receivers') {
          data[i] = []
        } else {
          data[i] = ''
        }
      }
    },
    updateData() {
      if (this.$store.state.dialog.alarmSetting.visible) {
        this.clearData(this.alarmSetting)
        this.options = []
        this.optionsMember = []
        this.alarmSetting.task_id = this.taskId
        SourceMonitorResource.getAlertSetting({
          task_id: this.taskId
        }).then(response => {
          if (response.data.status.code === 1) {
            if (response.data.data.control_list) {
              this.options = response.data.data.control_list
            }

            if (response.data.data.receivers_list) {
              this.optionsMember = response.data.data.receivers_list
              response.data.data.receivers_list.forEach(item => {
                if (item.checked === true) {
                  this.alarmSetting.alert_receivers.push(item.value)
                }
              })
            }
          }
          for (const i in response.data.data) {
            if (this.alarmSetting.hasOwnProperty(i) || i === 'callback_url' || i === 'callback_secret')
              if (i === 'alert_type') {
                this.alarmSetting[i] = []
                Number(response.data.data[i]) === 3 ? this.alarmSetting[i].push('1', '2') :
                  this.alarmSetting[i].push(response.data.data[i])
              } else if (i === 'callback_url' || i === 'callback_secret') {
              if (i === 'callback_url') {
                this.alarmSetting.alert_callback_url = response.data.data[i]
              } else {
                this.alarmSetting.alert_callback_secret = response.data.data[i]
              }
            } else {
              this.alarmSetting[i] = response.data.data[i]
            }
          }
        })
      }
    },
    clearInfo(data) {
      for (const i in data)
        data[i] = typeof(data[i]) === 'string' ? '' : []
    },
    handleClose(data) {
      this.triggerAlarmSettingVisible(false)
      this.$refs.alarmSetting.resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.alarmSetting.alert_type.length === 1) {
            this.alarmSetting.alert_type = Number(this.alarmSetting.alert_type[0]) === 0 ?
              0 : this.alarmSetting.alert_type[0]
          } else if (this.alarmSetting.alert_type.length === 2) {
            this.alarmSetting.alert_type = Number(this.alarmSetting.alert_type[0]) === 0 ?
              this.alarmSetting.alert_type[1] : 3
          } else {
            this.alarmSetting.alert_type = this.alarmSetting.alert_type.length === 0 ?
              0 : 3
          }

          if (Number(this.alarmSetting.alert_callback) === 0 || this.alarmSetting.alert_callback === '') {
            delete this.alarmSetting.alert_callback_secret
            delete this.alarmSetting.alert_callback_url
          } else {
            if (this.alarmSetting.alert_callback === '' || this.alarmSetting.alert_callback_url === '') {
              return this.$message({
                showClose: true,
                message: '请输入回调URL或回调密钥',
                type: 'error'
              })
            }
          }
          SourceMonitorResource.saveAlertSetting(this.alarmSetting)
            .then(response => {
              if (response.data.status.code === 1) {
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'success'
                })
                this.handleClose(this.alarmSetting)
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  props: {
    taskId: {
      required: true
    },
    ipValue:{
    }
  }
}
</script>

<style lang="css" scoped>
a {
  color: #2d90e6;
}

.tip-position {
  margin-left: 100px;
}

.input-box-size {
  width: 226px;
}
</style>
