<template lang="html">
  <!-- 备注信息 -->
  <el-dialog title="备注修改" :closeOnClickModal="true" v-model="websiteNoteVisible" size="small" :close-on-click-modal="true" @close="triggerWensiteNoteVisible(false)">
    <el-form element-loading-text="拼命加载中" :model="websiteNoteDialog.editForm" :rules="websiteNoteDialog.formRule" ref="websiteNoteDialogForm" label-width="100px">
      <el-form-item label="昵称" prop="nickname" :rules="websiteNoteDialog.formRule.nickname">
        <el-input v-model.trim="websiteNoteDialog.editForm.nickname" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属单位" prop="company" :rules="websiteNoteDialog.formRule.company">
        <el-input v-model.trim="websiteNoteDialog.editForm.company" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="管理员名称" prop="admin_name" :rules="websiteNoteDialog.formRule.admin_name">
        <el-input v-model.trim="websiteNoteDialog.editForm.adminName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel" :rules="websiteNoteDialog.formRule.tel">
        <el-input v-model.trim="websiteNoteDialog.editForm.tel" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱" prop="email" :rules="websiteNoteDialog.formRule.email">
        <el-input v-model.trim="websiteNoteDialog.editForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="网站TITLE" prop="title" :rules="websiteNoteDialog.formRule.title">
        <el-input v-model.trim="websiteNoteDialog.editForm.title" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="备案号" prop="recordCode" :rules="websiteNoteDialog.formRule.recordCode">
        <el-input v-model.trim="websiteNoteDialog.editForm.recordCode" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark" :rules="websiteNoteDialog.formRule.remark">
        <el-input v-model.trim="websiteNoteDialog.editForm.remark" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <i-button @click="triggerWensiteNoteVisible(false)">取 消</i-button>
      <i-button type="primary" @click="handleWebsiteNoteDialogSubmit" :loading="websiteNoteDialog.loading">修 改</i-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  data() {
    return {
      websiteNoteDialog: {
        loading: false,
        editForm: {},
        formRule: {
          nickName: [{
            required: true,
            message: '请输入啥啥啥.....',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }],
          company: [{
            required: true,
            message: '请输入啥啥啥.....',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }],
          adminName: [{
            required: true,
            message: '请输入啥啥啥.....',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }],
          tel: [{
            required: true,
            message: '请输入啥啥啥.....',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: '请输入啥啥啥.....',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }],
          title: [{
            required: true,
            message: '请输入啥啥啥.....',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }],
          recordCode: [{
            required: true,
            message: '请输入啥啥啥.....',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }],
          remark: [{
            required: true,
            message: '请输入啥啥啥.....',
            trigger: 'blur'
          }, {
            min: 2,
            max: 32,
            message: '长度在 2 到 32 个字符',
            trigger: 'blur'
          }]
        }
      }
    }
  },
  computed: {
    websiteNoteVisible() {
      // this.fetchWebsiteNoteInfo()
      return this.$store.state.dialog.websiteNote.visible
    },
    domainId() {
      return this.$store.state.website.domain.id
    }
  },
  methods: {
    ...mapActions([
      'triggerWensiteNoteVisible'
    ]),
    fetchWebsiteNoteInfo() {
      const params = {
        domain_id: this.domainId
      }
      this.fetchGet('CloudDns.Domain.DomainRemark.info', params).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && (res.status.code === 1) && res.data) {
                this.websiteNoteDialog.editForm = {
                  nickName: res.data.nickname,
                  company: res.data.company,
                  adminName: res.data.admin_name,
                  tel: res.data.tel,
                  email: res.data.email,
                  title: res.data.title,
                  recordCode: res.data.record_code,
                  remark: res.data.remark
                }
              }
            })
          }
        },
        e => {
        })
    },
    handleWebsiteNoteDialogClose() {
      this.websiteNoteDialog.loading = false
      this.$refs.websiteNoteDialogForm.resetFields()
    },
    handleWebsiteNoteDialogSubmit() {
      this.$refs.websiteNoteDialogForm.validate(valid => {
        if (valid) {
          this.websiteNoteDialog.submitting = true
          const params = this.websiteNoteDialog.editForm
          this.fetchPost('CloudDns.Domain.DomainRemark.save', params)
            .then(res => {
              if (res.ok) {
                res.json().then(data => {
                  if (data && data.status.code === 1) {
                    this.$message({
                      showClose: true,
                      message: '域名备注修改成功',
                      type: 'success'
                    })
                  } else {
                    this.$message({
                      showClose: true,
                      message: data.status.message,
                      type: 'error'
                    })
                  }
                })
                this.triggerWensiteNoteVisible(false)
                this.fetchDomainList(true)
              }
              this.websiteNoteDialog.submitting = false
            })
        } else {
          this.websiteNoteDialog.submitting = false
          return false
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
@import '../assets/styles/website-help.css';
..click-certify-content {
  margin-top: 20px;
}
</style>
