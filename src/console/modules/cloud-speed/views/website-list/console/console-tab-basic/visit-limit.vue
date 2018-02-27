<template lang="html">
  <!-- 访问控制-黑名单 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3" class="block-fit">
        <p class="item-name">访问控制-黑名单</p>
      </el-col>
      <el-col :span="15" class="description">
        <p>设置禁止访问的IP或IP段、站内URL</p>
      </el-col>
      <el-col :span="6">
        <!-- <el-switch class="fr" v-model="visitLimit.status" @change="updateVisitLimit">
        </el-switch> -->
        <el-select v-model="visitLimit.status" @change="updateVisitLimit" class="fr" >
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="21">
        <Tip class="tip" :content="tipContent" mode="static"/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="21" class="top-line">
        <i-button @click="addvisitLimit">新增黑名单</i-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="21" class="table-content">
        <el-table :data="visitLimit.blackList" border style="width: 100%" v-loading="loading">
          <el-table-column prop="" label="类型">
            <template scope="scope">
                <el-select v-if="scope.row.isEditing" v-model="scope.row.value.type" placeholder="请选择" @change="changeBlackListType(scope)">
                  <el-option v-for="(item, index) in visitLimit.blackListType.options" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <span v-else>{{ scope.row.value.type | dict("rules.visitLimit") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="匹配内容">
            <template scope="scope">
              <div  v-if="scope.row.isEditing">
                <!-- <el-popover :value="errorTip" popper-class="popover-error" ref="popoverError" placement="top" width="200" trigger="manual" content="请输入正确内容!">
                </el-popover> -->
                <el-input :class="{'is-error':validArray[scope.$index].validContent}" v-model="scope.row.value.content" :placeholder="placeTip"  @blur="verifyContent(scope,'content')"></el-input>
              </div>
              <span v-else>{{ scope.row.value.content }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right" class-name="row-padding-right" lable-class-name="row-padding-right">
            <template scope="scope">
              <i-button v-if="scope.row.isEditing" type="text" size="small" @click="handleSaveBlackList(scope)">保存</i-button>
              <i-button v-else type="text" @click="handleEditBlackList(scope)">编辑</i-button>
              <i-button v-if="scope.row.isEditing" type="text" size="small" @click="handleCancelEdit(scope)">取消</i-button>
              <el-popover ref="ifDelItem" placement="top" width="100" trigger="click" v-model="popoverArray[scope.$index].flag">
                <p>确认删除当前行吗？</p>
                <div style="text-align: right; margin: 0">
                  <i-button size="mini" type="text" @click="handleCancelDel(scope.$index)">取消</i-button>
                  <i-button type="primary" size="mini" @click="handleConfDel(scope.$index,scope.row)">确定</i-button>
                </div>
              </el-popover>
              <i-button v-show="!scope.row.isEditing" type="text" v-popover:ifDelItem>删除</i-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import SourceSpeedResource from 'cloudSpeed/resource/SourceSpeedResource'
import InputSuffix from 'common/components/InputSuffix/InputSuffix'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import RULE from 'common/utils/verify'

export default {
  name: 'visit-limit',
  components: {
    InputSuffix,
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      errorTip: false,
      options: [
        {
          value: 'on',
          label: 'ON'
        },
        {
          value: 'off',
          label: 'OFF'
        }
      ],
      visitLimit: {
        init: true,
        status: '',
        blackList: [],
        blackListType: {
          value: 'url',
          options: [
            {
              value: 'ip',
              label: 'IP'
            },
            {
              value: 'url',
              label: '站内URL'
            }
          ]
        }
      },
      popoverArray: [],
      validArray: [],
      forwardBlackListItem: [],
      tipContent: [
        '黑名单将被禁止访问此网站',
        '支持CIDR格式,IP段可以用-隔开,如1.1.1.1-1.1.1.255',
        '规则上限20条'
      ],
      loading: false,
      placeTip: '请填写URL'
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchVisitLimit()
    this.fetchVisitLimitBlackList()
  },
  methods: {
    changeBlackListType(scope) {
      if (scope.row.value.type === 'ip') {
        this.placeTip = '请填写IP'
      }
      if (scope.row.value.type === 'url') {
        this.placeTip = '请填写URL'
      }
      scope.row.value.content = ''
      this.validArray[scope.$index].validContent = false
    },
    verifyContent(scope, tag) {
      const value = scope.row.value
      const content = value.content
      let isError = true
      switch (tag) {
        case 'content':
          if (value.type === 'url') {
            if (!RULE.noProtocolUrl.test(content)) {
              this.validArray[scope.$index].validContent = true
            } else {
              this.validArray[scope.$index].validContent = false
              isError = false
            }
            break
          }
          if (value.type === 'ip') {
            if (!RULE.ipRangeReg.test(content) && !RULE.cidrREG.test(content)) {
              this.validArray[scope.$index].validContent = true
            } else if (
              RULE.ipReg192.test(content) ||
              RULE.ipReg10.test(content) ||
              RULE.ipReg172.test(content)
            ) {
              this.validArray[scope.$index].validContent = true
            } else {
              this.validArray[scope.$index].validContent = false
              isError = false
            }
            break
          }
      }
      return isError
    },
    tabDelPopover(data) {
      const result = data
      result.forEach(v => {
        v.isEditing = false
        this.popoverArray.push({
          flag: false
        })
        this.validArray.push({
          validContent: false
        })
      })
      return result
    },
    handleCancelDel(index) {
      this.popoverArray[index].flag = false
      return
    },
    handleConfDel(index, row) {
      this.popoverArray[index].flag = false
      const url = `Web.Domain.DomainId.${this
        .domainId}.Settings.anti_cc.rules.${row.id}`
      this.fetchDel(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              this.windowMessage(res)
              this.fetchVisitLimitBlackList()
            })
          }
        },
        e => {}
      )
    },
    fetchVisitLimit() {
      const url = `Web.Domain.DomainId.${this
        .domainId}.Settings.visit_limit_blacklist`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (
                res &&
                res.status.code === 1 &&
                res.data &&
                res.data.visit_limit_blacklist
              ) {
                this.visitLimit.status = res.data.visit_limit_blacklist.status
              }
            })
          }
        },
        e => {}
      )
    },
    updateVisitLimit() {
      if (this.visitLimit.init) {
        this.visitLimit.init = false
        return
      }
      const params = {
        status: this.visitLimit.status
      }
      const url = `Web.Domain.DomainId.${this
        .domainId}.Settings.visit_limit_blacklist`
      this.fetchPut(url, params).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              this.windowMessage(res)
            })
          }
        },
        e => {}
      )
    },
    fetchVisitLimitBlackList() {
      this.loading = true
      const url = `Web.Domain.DomainId.${this
        .domainId}.Settings.visit_limit_blacklist.rules`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && res.status.code === 1 && res.data && res.data.list) {
                this.visitLimit.blackList = this.tabDelPopover(res.data.list)
                this.loading = false
              }
            })
          }
        },
        e => {}
      )
    },
    isEditing(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].isEditing) {
          return true
        }
      }
    },
    addvisitLimit() {
      const blackListEditing = this.isEditing(this.visitLimit.blackList)
      if (blackListEditing) {
        return
      }
      this.visitLimit.blackList.unshift({
        isEditing: true,
        value: {
          type: 'url',
          content: ''
        }
      })
      this.popoverArray.unshift({
        flag: false
      })
      this.validArray.unshift({
        validContent: false
      })
    },
    handleSaveBlackList(scope) {
      if (this.verifyContent(scope, 'content')) {
        this.$message({
          showClose: true,
          message: '请输入正确格式',
          type: 'error'
        })
        return
      }
      this.loading = true
      const row = scope.row
      row.isEditing = false
      const params = {
        type: row.value.type,
        content: row.value.content
      }
      if (row.id) {
        SourceSpeedResource.putVisitLimitBlacklist(
          this.domainId,
          params,
          row.id
        )
          .then(res => {
            this.operationSucceed()
            this.fetchVisitLimitBlackList()
          })
          .catch(res => {
            this.fetchVisitLimitBlackList()
          })
      } else {
        SourceSpeedResource.postVisitLimitBlacklist(this.domainId, params)
          .then(res => {
            this.operationSucceed()
            this.fetchVisitLimitBlackList()
          })
          .catch(res => {
            this.fetchVisitLimitBlackList()
          })
      }
    },
    handleEditBlackList(scope) {
      const blackListEditing = this.isEditing(this.visitLimit.blackList)
      if (blackListEditing) {
        return
      }
      const index = scope.$index
      const row = scope.row
      this.forwardBlackListItem[index] = {
        isEditing: false,
        type: row.value.type,
        content: row.value.content
      }
      scope.row.isEditing = true
    },
    handleCancelEdit(scope) {
      this.errorTip = false
      const currentIndex = scope.$index
      this.validArray[currentIndex].validContent = false
      const value = scope.row.value
      if (!scope.row.id) {
        this.visitLimit.blackList.splice(currentIndex, 1)
        return
      }
      if (this.forwardBlackListItem[currentIndex]) {
        value.type = this.forwardBlackListItem[currentIndex].type
        value.content = this.forwardBlackListItem[currentIndex].content
      }
      scope.row.isEditing = false
    }
  }
}
</script>

<style scoped>
/*@import '../../assets/styles/website-help.css';*/
@media screen and (min-width:1px) and (max-width:1401px) {
  .block-fit{
    position: relative;
    height: 14px;
    p{
      position: absolute;
      right: 0;
    }
  }
}
</style>
