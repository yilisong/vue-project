<template lang="html">
<website-layout>
  <div class="register-box">
    <div class="info-box">
      <h4 class="title">密码找回</h4>
      <el-form :model="ruleForm" :rules="rules" :show-message=false ref="ruleForm" class="register-form">
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" class="website-common-input" @focus="holder.username=false" @blur="judgeContent('username')"></el-input>
          <tipbox v-bind:message="tip.msg.user" v-bind:isError="tip.isError" v-bind:isShow="tip.isShow.user"></tipbox>
          <span class="tip-block" v-show="holder.username">手机或邮箱</span>
        </el-form-item>
        <el-form-item prop="captcha" class="splitline-box">
          <el-input type="text" v-model="ruleForm.captcha" auto-complete="off" class="website-common-input" @focus="holder.captcha=false" @blur="judgeContent('captcha')">
            <el-button slot="append" @click="sendCode($event)">发送验证码</el-button>
          </el-input>
          <tipbox v-bind:message="tip.msg.cap" v-bind:isError="tip.isError" v-bind:isShow="tip.isShow.cap"></tipbox>
          <span class="tip-block" v-show="holder.captcha">发送验证码</span>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword" auto-complete="off" class="website-common-input" @focus="focusPass" @blur="blurPass"></el-input>
          <tipbox v-bind:message="message" v-bind:isError="isError" v-bind:isShow="isShow"></tipbox>
          <tipbox v-bind:message="tip.msg.pass" v-bind:isError="tip.isError" v-bind:isShow="tip.isShow.pass"></tipbox>
          <span class="tip-block" v-show="holder.newPassword">密码</span>
        </el-form-item>
        <el-form-item prop="repeatNewPassword">
          <el-input type="password" v-model="ruleForm.repeatNewPassword" auto-complete="off" class="website-common-input" @focus="holder.repeatNewPassword=false" @blur="judgeContent('repeatNewPassword')"></el-input>
          <tipbox v-bind:message="tip.msg.checkPass" v-bind:isError="tip.isError" v-bind:isShow="tip.isShow.checkPass"></tipbox>
          <span class="tip-block" v-show="holder.repeatNewPassword">确认密码</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="register-btn">确认</el-button>
          <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</website-layout>
</template>

<script>
import websiteLayout from 'common/components/layout/website-layout'
import tipbox from '../../components/tipbox'
import {
  BASE_URL
} from 'common/config/interceptor'
import {
  addTimer,
  validate,
  asciiValidate,
  addDisable,
  returnOrigin,
  JSONP
} from 'common/assets/js/normal'
import {
  judgeSend,
  dataSwitch
} from '../../static/js/normal'
import SourceWebResource from '../../static/js/SourceWebResource'
export default {
  data() {
    // var validateEmail = (rule, value, callback) =>
    const that = this
    // function validateUser(rule, value, callback) {
    //   if (value) {
    //     if (!(value === '1234')) {
    //       that.tip.msg.user = '格式错误哦'
    //       that.test('user', that.tip.isShow)
    //       callback(new Error())
    //     }
    //   } else {
    //     that.tip.isShow.email = false
    //   }
    //   callback()
    // }
    function validateUsername(rule, value, callback) {
      if (value === '' || validate.phone.test(value) === true || validate.email.test(value) === true) {
        callback()
        that.tip.isShow.user = false
      } else {
        // callback(new Error('请输入正确的手机或邮箱格式'))
        that.tip.isShow.user = true
        that.tip.msg.user = '请输入正确的邮箱或手机格式'
        dataSwitch('user', that.tip.isShow)
        callback(new Error())
      }
    }


    //密码部分
    function validatePass(rule, value, callback) {
      const psdLevel = asciiValidate(value)
      const containSpace = value.indexOf(' ')
      const valLen = value.length
      if (value) {
        if (that.ruleForm.newPassword !== '') {
          that.$refs.ruleForm.validateField('repeatNewPassword')
        }
        if (!(psdLevel >= 2 && psdLevel <= 4) || containSpace !== -1 || valLen < 6 || valLen > 20) {
          that.tip.msg.pass = '请输入正确的密码格式'
          dataSwitch('pass', that.tip.isShow)
          callback(new Error())
        } else {
          that.tip.isShow.pass = false
        }
      } else {
        that.isShow = false
        that.tip.isShow.pass = false
      }
      callback()
    }

    function validatePass2(rule, value, callback) {
      if (value === '') {
        callback()
        that.tip.isShow.checkPass = false
      } else if (value !== that.ruleForm.newPassword) {
        that.tip.msg.checkPass = '两次密码输入不一致'
        dataSwitch('checkPass', that.tip.isShow)
        callback(new Error())
      } else {
        that.tip.isShow.checkPass = false
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        captcha: '',
        newPassword: '',
        repeatNewPassword: ''
      },
      holder: {
        username: true,
        captcha: true,
        newPassword: true,
        repeatNewPassword: true
      },
      info: {
        username: '用户名',
        captcha: '验证码',
        newPassword: '密码',
        repeatNewPassword: '确认密码'
      },
      rules: {
        username: [{
          validator: validateUsername,
          trigger: 'blur'
        }],
        newPassword: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        repeatNewPassword: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      },
      tip: {
        msg: {
          user: '',
          pass: '',
          cap: '',
          checkPass: ''
        },
        isShow: {
          user: false,
          cap: false,
          pass: false,
          checkPass: false
        },
        isError: true
      },
      message: '长度6——20位，含大写字母，小写字母、数字及标点中的两种',
      isError: false,
      isShow: false
    }
  },
  mounted() {
    SourceWebResource.getUserInfo().then(response => {
      if (response.status === 200) {
        if (!(
            response.data.http_status_code &&
            response.data.http_status_code === 204
          ))
          window.location = returnOrigin()
      }
    }).catch(error => {
      JSONP.getJSON(
        BASE_URL + '/sso/V4/attach', {
          callback: '?'
        },
        res => {}
      )
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (judgeSend(this.ruleForm, this.info) === true) {
            SourceWebResource.findPass(this.ruleForm)
              .then(response => {
                if (response.data.status.code === 1) {
                  this.$message({
                    message: response.data.status.message,
                    type: 'success',
                    duration: 2000,
                    onClose() {
                      window.location = returnOrigin() + '/login'
                    }
                  })
                } else {
                  this.$message.error(response.data.status.message)
                }
              })
              .catch(error => {
                if (error.response.status === 500 && error.response.data.error === 'No token') {
                  SourceWebResource.getToken()
                } else {
                  this.$message.error(error.response.data.error)
                }
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    sendCode(e) {
      const tar = e.target || e.srcElement
      this.tip.isShow.cap = false
      if (this.ruleForm.username === '') {
        this.tip.msg.cap = '手机或邮箱格式错误'
        this.tip.isShow.cap = true
      } else {
        SourceWebResource.findCap({
            username: this.ruleForm.username
          })
          .then(response => {
            if (response.data.status.code === 1) {
              addDisable(tar)
              addTimer(tar, 60)
            } else {
              this.tip.msg.cap = response.data.status.message
              this.tip.isShow.cap = true
            }
          })
      }
    },
    judgeContent(type) {
      for (const i in this.holder)
        this.holder[i] = this.ruleForm[i] === ''
    },
    focusPass() {
      this.tip.isShow.pass === false ? this.isShow = true : this.isShow = false
      this.holder.newPassword = false
    },
    blurPass() {
      this.isShow = false
      this.judgeContent('password')
    }
  },
  components: {
    websiteLayout,
    tipbox
  }
}
</script>

<style lang="css">
@import '../../static/css/common.css';
</style><style lang="css" scoped>.register-box a {
  color: #2d90e6;
}

.register-box {
  width: 1200px;
  margin: 0 auto;
}

.info-box {
  width: 350px;
  margin: 120px auto;
}

.info-box .title {
  font-size: 18px;
  font-weight: 100;
  color: #333;
  margin-bottom: 52px;
}

.splitline-box::after {
  content: "";
  display: block;
  width: 600px;
  margin: 27px 0;
  height: 1px;
  background: linear-gradient(to right, #fff, #e2e2e2, #ccc, #e2e2e2, #fff);
  margin-left: -117px;
}

.register-box .register-btn {
  padding: 10px 45px;
}

.register-box .state-position {
  margin-top: -13px;
}

.register-box .jump-login {
  margin-left: 52px;
}

.tip-block {
  position: absolute;
  top: 1px;
  left: 12px;
  color: #97a8be;
}

</style><style lang="css">.register-form .el-form-item {
  margin-bottom: 12px;
}

.register-box .el-form-item__content {
  min-width: 1000px;
  max-width: 1200px;
}

.register-box .el-input {
  width: 343px;
}
</style>
