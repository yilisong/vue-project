<template lang="html">
<div class="">

  <el-dialog :title="ipInfo" :visible.sync="isShow" size="tiny" :before-close="handleClose" @open="updateData">
    <el-form :model="taskContent" :rules="rules" ref="taskContent" label-width="100px" :visible.sync="isShow" :before-close="handleClose" class="form-box-size">
      <el-form-item label="监控项目名称" prop="name">
        <el-input type="text" v-model="taskContent.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="监控IP" prop="value">
        <el-input v-model="taskContent.value" auto-complete="off" :disabled=true type="text"></el-input>
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model="taskContent.port"></el-input>
      </el-form-item>
      <el-form-item label="监控协议" prop="protocol">
        <el-radio-group v-model="taskContent.protocol">
          <el-radio label="HTTP">HTTP</el-radio>
          <el-radio label="HTTPS">HTTPS</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="域名" prop="domain">
        <el-input v-model="taskContent.domain"></el-input>
      </el-form-item>
      <el-form-item label="监控路径" prop="path">
        <el-input type=text v-model="taskContent.path"></el-input>
      </el-form-item>
      <el-form-item label="请求方法" prop="request_method">
        <el-radio-group v-model="taskContent.request_method">
          <el-radio label="HEAD">HEAD</el-radio>
          <el-radio label="GET">GET</el-radio>
        </el-radio-group>
      </el-form-item>      
      <el-form-item label="监控频率" prop="frequency">
        <el-radio-group v-model="taskContent.frequency">
          <el-radio :label="'1'">1分钟</el-radio>
          <el-radio :label="'3'">3分钟</el-radio>
          <el-radio :label="'5'">5分钟</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <i-button @click="handleClose">取消</i-button>
        <i-button type="primary" @click="submitForm('taskContent')">保存</i-button>
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
        return this.$store.state.dialog.taskConfig.visible
      },
      set: newValue => {}
    },
    ipInfo: {
      get() {
        return '任务配置' + '(' + this.ipValue + ')'
      }
    }
  },
  data() {
    function validateName(rule, value, callback) {
      callback()
    }

    function validateDomain(rule, value, callback) {
      if (RULE.domain.test(value) || value === '') {
        callback()
      } else {
        return callback(new Error('域名格式错误'))
      }
    }

    function validatePath(rule, value, callback) {
      if (RULE.noProtocolUrl.test(value) || value === '') {
        callback()
      } else {
        return callback(new Error('监控路径格式错误'))
      }
    }

    function validatePort(rule, value, callback) {
      if ((value <= 65535 && value >= 1) || value === '') {
        callback()
      } else {
        return callback(new Error('监控端口格式错误,1~65535'))
      }
    }
    return {
      taskContent: {
        id: 0,
        name: '',
        value: '',
        protocol: '',
        request_method: '',
        domain: '',
        path: '',
        port: 80,
        frequency: ''
      },
      rules: {
        name: [{
            validator: validateName,
            trigger: 'blur'
          },
          {
            min: 0,
            max: 15,
            message: '长度小于15个字符',
            trigger: 'blur'
          }
        ],
        value: [{
          validator: validateName,
          trigger: 'blur'
        }],
        protocol: [{
          validator: validateName,
          trigger: 'blur'
        }],
        request_method: [{
          validator: validateName,
          trigger: 'blur'
        }],
        domain: [{
          validator: validateDomain,
          trigger: 'blur'
        }],
        path: [{
          validator: validatePath,
          trigger: 'blur'
        }],
        port: [{
          validator: validatePort,
          trigger: 'blur'
        }],
        frequency: [{
          validator: validateName,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    ...mapActions([
      'triggerTaskConfigVisible' //联动设置窗口

    ]),
    updateData() {
      this.taskContent.value = this.ipValue
      SourceMonitorResource.getTaskInfo({
        id: this.taskId
      }).then(response => {
        if (response.data.status.code === 1) {
          for (const i in response.data.data) {
            if (this.taskContent.hasOwnProperty(i)) {
              this.taskContent[i] = response.data.data[i]
            }
          }
        }
      })
    },
    handleClose() {
      this.triggerTaskConfigVisible(false)
      this.$refs.taskContent.resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.taskContent.id = this.taskId
          SourceMonitorResource.saveTask(this.taskContent)
            .then(response => {
              if (response.data.status.code === 1) {
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'success'
                })
                this.handleClose()
              }
            })
        } else {
          return false
        }
      })
    }
  },
  props: {
    ipValue: {
      required: true
    },
    taskId: {
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
.form-box-size {
  width: 340px;
}
</style>
