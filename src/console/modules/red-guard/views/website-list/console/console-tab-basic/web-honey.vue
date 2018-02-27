<template lang="html">
  <!-- 访问控制-黑名单 -->
  <el-card class="item-padding" >
    <div v-if="showContent">
      <el-row :gutter="20">
        <el-col :span="3">
          <p class="item-name">Web蜜罐</p>
        </el-col>
        <el-col :span="15" class="description">
          <p>依多年攻防实战经验，推出了针对高风险攻击者使用的工具及其攻击手法的诱捕技术，同时支持多种实施部署方案</p>
        </el-col>
        <el-col :span="6">
          <el-select v-model="status" @change="updateWebHoneyPot" class="fr" >
            <el-option :disabled="item.disabled" v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-if="level3" :gutter="20" class="description">
        <el-col :offset="3" :span="21">
          <p>当前服务不支持<span class="jumpLink no-pointer">自有定制蜜罐</span>，您可以<a class="jumpLink" @click="goToService">联系商务</a>开通此项功能。</p>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="21">
          <Tip class="tip" :content="tipContent" mode="static"/>
        </el-col>
      </el-row>
      <div v-if="status === 'custom'">
        <el-row :gutter="20">
          <el-col :offset="3" :span="21" class="top-line">
            <el-radio-group v-model="customType">
              <el-radio-button label="admin">后台诱导</el-radio-button>
              <el-radio-button label="threaten_equipment">威胁设备诱导</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="row">
          <el-col :span="3">
            <p class="item-name">蜜罐服务器</p>
          </el-col>
          <el-col :span="21">
            <el-popover :value="errorTip" popper-class="popover-error" ref="popoverError1" placement="top" width="200" trigger="manual" content="请输入正确内容!">
            </el-popover>
            <el-input :class="{'is-error':errorTip}" v-popover:popoverError1 class="url-input" v-model="server" placeholder="请输入服务器IP" @blur="updateWebHoneyPot"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="row">
          <el-col :span="3">
            <p class="item-name">入侵成功URL</p>
          </el-col>
          <el-col :span="21">
            <el-popover :value="errorTip" popper-class="popover-error" ref="popoverError" placement="top" width="200" trigger="manual" content="请输入正确内容!">
            </el-popover>
            <el-input :class="{'is-error':errorTip}" v-popover:popoverError class="url-input" v-model="successUrl" placeholder="/" @blur="updateWebHoneyPot"></el-input>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20" v-if="!Object.is(customType,'threaten_equipment') || Object.is(status,'default')">
        <el-col :span="3">
          <p class="item-name">诱导目录列表</p>
        </el-col>
        <el-col :span="21">
          <i-button @click="addRules">新增目录</i-button>
        </el-col>
        <el-col :offset="3" :span="21" class="table-content">
          <el-table :data="abductionUrlList" border style="width: 100%" v-loading="loading">
            <el-table-column prop="" label="目录">
              <template scope="scope">
                <div  v-if="scope.row.isEditing">
                  <el-input :class="{'is-error':validArray[scope.$index].validContent}" v-model="scope.row.value.menu" placeholder="以/开头"  @blur="verifyContent(scope,'menu')"></el-input>
                </div>
                <span v-else>{{ scope.row.value.menu }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="" label="添加时间">
              <template scope="scope">
                <span>{{ scope.row.value.time }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="" label="备注">
              <template scope="scope">
                <div  v-if="scope.row.isEditing">
                  <el-input v-model="scope.row.value.remark" placeholder="请输入内容"></el-input>
                </div>
                <span v-else>{{ scope.row.value.remark }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template scope="scope">
                <i-button v-if="scope.row.isEditing" type="text" size="small" @click="handleSaveRules(scope)">保存</i-button>
                <i-button v-else type="text" @click="handleEditRules(scope)">编辑</i-button>
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
    </div>
    <div v-else>
      <el-row :gutter="20">
        <el-col :span="3">
          <p class="item-name">Web蜜罐</p>
        </el-col>
        <el-col :span="21">
          <p>依多年攻防实战经验，推出了针对高风险攻击者使用的工具及其攻击手法的诱捕技术，同时支持多种实施部署方案。</p>
        </el-col>
        <el-col :offset="3" :span="21">
          <p>当前服务不支持，您可以<a class="jumpLink" @click="goToService">联系商务</a>开通此项功能。</p>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import SourceGuardResource from 'redGuard/resource/SourceGuardResource'
import InputSuffix from 'common/components/InputSuffix/InputSuffix'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import RULE from 'common/utils/verify'
import Help from 'common/utils/help'

export default {
  name: 'web-honey',
  components: {
    InputSuffix,
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      level3: false,
      showContent: false,
      domainId: '',
      customType: '',
      server: '',
      successUrl: '',
      errorTip: false,
      status: '',
      options: [
        {
          value: 'off',
          label: 'OFF'
        },
        {
          value: 'default',
          label: '红网通用后台诱导'
        }
      ],
      init: true,
      abductionUrlList: [],
      listType: {
        value: 'ip',
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
      },
      popoverArray: [],
      validArray: [],
      forwardRulesItem: [],
      tipContent: [
        '1.默认蜜罐为红网卫士提供的专用蜜罐',
        '2.如您已经搭建了蜜罐可以使用自有定制蜜罐，自有定制蜜罐支持后台诱导和威胁设备诱导两种诱导方式',
        '3.自有定制蜜罐后台诱导需要输入蜜罐服务器IP和表示入侵成功的URL；威胁设备诱导可将攻击设备直接诱导至蜜罐',
        '⚠️ ：请确保添加的诱导目录不是您的真实业务目录，否则会导致正常访客无法访问。'
      ],
      loading: false
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.initJurisdiction()
  },
  methods: {
    initJurisdiction() {
      const params = {
        domain_id: this.domainId
      }
      SourceGuardResource.getWebsiteInfo(params).then(res => {
        const mealFlag = res.data.data.meal_flag
        console.log('mealFlag', mealFlag)
        if (Object.is(mealFlag, 'HW003B') || Object.is(mealFlag, 'HW004B')) {
          if (Object.is(mealFlag, 'HW003B')) {
            this.level3 = true
            this.options.push({
              value: 'custom',
              label: '自有定制蜜罐',
              disabled: true
            })
          } else {
            this.options.push({
              value: 'custom',
              label: '自有定制蜜罐'
            })
          }
          this.showContent = true
          this.fetchWebHoneyPot()
          this.fetchWebHoneyPotRules()
        }
      })
    },
    goToService() {
      Help.linkService()
    },
    changeRulesType(scope) {
      scope.row.value.content = ''
      this.validArray[scope.$index].validContent = false
    },
    verifyContent(scope, tag) {
      const value = scope.row.value
      let isError = true
      switch (tag) {
        case 'menu':
          if (!RULE.noProtocolUrl.test(value.menu)) {
            this.validArray[scope.$index].validContent = true
          } else {
            this.validArray[scope.$index].validContent = false
            isError = false
          }
          break
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
      SourceGuardResource.delWebHoneyPotRules(
        this.domainId,
        row.id
      ).then(res => {
        this.windowMessage(res.data.status.message)
        this.fetchWebHoneyPotRules()
      })
    },
    fetchWebHoneyPot() {
      SourceGuardResource.getWebHoneyPot(this.domainId).then(res => {
        const webHoneyPot = res.data.data.web_honeypot
        if (webHoneyPot.status === 'off') {
          this.status = 'off'
        } else {
          this.status = webHoneyPot.type
        }
        this.customType = webHoneyPot.custom_type
        this.server = webHoneyPot.server
        this.successUrl = webHoneyPot.success_url
      })
    },
    fetchWebHoneyPotRules() {
      SourceGuardResource.getWebHoneyPotRules(this.domainId).then(res => {
        this.abductionUrlList = this.tabDelPopover(res.data.data.list)
        this.loading = false
      })
    },
    updateWebHoneyPot() {
      if (this.init) {
        this.init = false
        return
      }
      let params
      if (this.status !== 'off') {
        params = {
          status: 'on',
          type: this.status,
          custom_type: this.customType,
          server: this.server,
          success_url: this.successUrl
        }
      } else {
        params = {
          status: 'off'
        }
      }
      SourceGuardResource.putWebHoneyPot(this.domainId, params).then(res => {
        this.windowMessage(res.data.status.message)
      })
    },
    isEditing(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].isEditing) {
          return true
        }
      }
    },
    addRules() {
      const blackListEditing = this.isEditing(this.abductionUrlList)
      if (blackListEditing) {
        return
      }
      this.abductionUrlList.unshift({
        isEditing: true,
        value: {
          type: 'ip',
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
    handleSaveRules(scope) {
      if (this.verifyContent(scope, 'menu')) {
        return
      }
      this.loading = true
      const row = scope.row
      row.isEditing = false
      row.value.menu = Help.complement(row.value.menu)
      const params = {
        menu: row.value.menu,
        remark: row.value.remark
      }
      if (row.id) {
        SourceGuardResource.putWebHoneyPotRules(
          this.domainId,
          params,
          row.id
        ).then(res => {
          this.fetchWebHoneyPotRules()
          this.windowMessage(res.data.status.message)
        })
      } else {
        SourceGuardResource.postWebHoneyPotRules(
          this.domainId,
          params
        ).then(res => {
          this.fetchWebHoneyPotRules()
          this.windowMessage(res.data.status.message)
        })
      }
    },
    handleEditRules(scope) {
      const blackListEditing = this.isEditing(this.abductionUrlList)
      if (blackListEditing) {
        return
      }
      const index = scope.$index
      const row = scope.row
      this.forwardRulesItem[index] = {
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
        this.abductionUrlList.splice(currentIndex, 1)
        return
      }
      if (this.forwardRulesItem[currentIndex]) {
        value.type = this.forwardRulesItem[currentIndex].type
        value.content = this.forwardRulesItem[currentIndex].content
      }
      scope.row.isEditing = false
    }
  }
}
</script>

<style scoped>
.jumpLink {
  cursor: pointer;
}
.no-pointer {
  cursor: text;
}
.row {
  margin-bottom: 15px;
}
</style>
