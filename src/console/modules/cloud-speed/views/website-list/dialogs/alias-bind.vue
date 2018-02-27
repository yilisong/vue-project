<!-- 添加网站弹框 -->
<template lang="html">
  <el-dialog title="别名绑定" :closeOnClickModal="true" v-model="aliasBindVisible" size="small" :close-on-click-modal="true" @close="handleAliasBindDialogClose">
    <div class="alias-bind-tips">
      <p>1.添加的别名需要人工审核</p>
      <p>2.只需填入主域名</p>
      <p>3.什么是别名绑定</p>
    </div>
    <el-form :model="aliasBindDialog.editForm" :rules="aliasBindDialog.formRule" ref="aliasBindDialogForm" label-width="100px">
      <el-form-item label="添加别名" prop="alias_name" :rules="aliasBindDialog.formRule.aliasDomain">
        <el-input class="input-alias" v-model.trim="aliasBindDialog.editForm.aliasDomain" auto-complete="off"></el-input>
        <i-button class="fr" type="primary" @click="handleAliasBindDialogSubmit" :loading="aliasBindDialog.loading">添加别名</i-button>
      </el-form-item>
      <el-table :data="websiteAliasList" element-loading-text="拼命加载中" style="width: 100%">
        <el-table-column prop="alias_domain" label="别名名称" width="180">
        </el-table-column>
        <el-table-column prop="" label="状态" width="180">
          <template scope="scope">
            <span v-if="scope.row.status === '0'">
              <i class="process-dot"></i>
              {{scope.row.status_desc}}
            </span>
            <span v-if="scope.row.status === '1'">
              <i class="succceed-dot"></i>
              {{scope.row.status_desc}}
            </span>
            <span v-if="scope.row.status === '2'">
              <i class="fail-dot"></i>
              {{scope.row.status_desc}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <i-button type="text" size="small" @click="handleButtonAliasDelete(scope.row.id)">删除</i-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div slot="footer">
      <i-button @click="triggerAliasBindVisible(false)">关闭</i-button>
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
      websiteAliasList: [],
      aliasBindDialog: {
        editForm: {},
        formRule: {
          aliasDomain: [{
            message: '请输入别名名称',
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
    aliasBindVisible() {
      // this.fetchWebsiteAliasList(this.domainId)
      return this.$store.state.dialog.aliasBind.visible
    },
    domainId() {
      return this.$store.state.website.domain.id
    }
  },
  methods: {
    ...mapActions([
      'triggerAliasBindVisible'
    ]),
    fetchWebsiteAliasList() {
      this.websiteAliasList = []
      const params = {
        domain_id: this.domainId
      }
      this.fetchGet('Web.Domain.alias.list', params).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && (res.status.code === 1) && res.data && res.data.list) {
                this.websiteAliasList = res.data.list
              }
            })
          }
        },
        e => {})
    },
    handleAliasBindDialogClose() {
      this.$refs.aliasBindDialogForm.resetFields()
    },
    handleAliasBindDialogSubmit() {
      this.$refs.aliasBindDialogForm.validate(valid => {
        if (valid) {
          const params = {
            domain_id: this.domainId,
            alias_domain: this.aliasBindDialog.editForm.aliasDomain
          }
          this.fetchPost('Web.Domain.alias.add', params).then(res => {
            if (res.ok) {
              res.json().then(data => {
                if (data && data.status.code === 1) {
                  this.$message({
                    showClose: true,
                    message: '别名添加成功',
                    type: 'success'
                  })
                  this.aliasBindDialog.editForm.aliasDomain = ''
                } else {
                  this.$message({
                    showClose: true,
                    message: data.status.message,
                    type: 'error'
                  })
                }
              })
              this.fetchWebsiteAliasList(true)
            }
          })
        } else {
          return false
        }
      })
    },
    handleButtonAliasDelete(aliasId) {
      const params = {
        domain_id: this.domainId,
        alias_id: aliasId
      }
      this.fetchDel('Web.Domain.alias.del', params).then(res => {
        if (res.ok) {
          res.json().then(data => {
            this.windowMessage(data, '别名删除成功')
          })
          this.fetchWebsiteAliasList(true)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
@import '../assets/styles/website-help.css';
.alias-bind-tips {
  border: 1px solid $baseColor;
  padding: 16px;
  background-color: #eaf4fc;
  margin-bottom: 20px;
}
.input-alias {
  width: 80%;
}
</style>
