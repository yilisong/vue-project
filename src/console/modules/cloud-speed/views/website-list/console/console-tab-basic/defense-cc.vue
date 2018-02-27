<template lang="html">
  <!-- 防CC/访客鉴别 -->
  <el-card class="item-padding">
    <div v-if="useTaichi">
      <el-row :gutter="20">
        <el-col :span="3">
          <p class="item-name">防CC/访客鉴别</p>
        </el-col>
        <el-col :span="15" class="description">
          <p>有效防止CC攻击。YUNDUN全局默认对搜索引擎放行。</p>
          <p>您已开启太极抗D服务，具体防护配置请前往<a v-bind:href="taichiDdosUrl" class="a-link">太极抗D</a>控制台。</p>
          <p>若您需要专业的业务系统防刷、反爬虫、反欺诈等业务安全功能。请{{ changeText }}<a href="/console/red-guard#/safetyOverview" class="a-link">红网卫士</a>服务。</p>
        </el-col>
      </el-row>
    </div>
    <div v-else>
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">防CC/访客鉴别</p>
      </el-col>
      <el-col :span="15" class="description">
        <p>有效防止CC攻击。YUNDUN全局默认对搜索引擎放行。</p>
        <p>云加速版仅提供通用CC防护策略，若您遇到针对性大规模高频次攻击，需要更高级的功能和更好的防护效果，请开启<a href="/console/taichi-ddos#/websiteProtectList" class="a-link">太极抗D</a>服务，专家定制规则，完美零误伤防御</p>
        <p>若您需要专业的业务系统防刷、反爬虫、反欺诈等业务安全功能。请{{ changeText }}<a href="/console/red-guard#/" class="a-link">红网卫士</a>服务。</p>
      </el-col>
      <el-col :span="6">
        <el-select class="fr" v-model="antiCc.type" @change="updateAntiCc" placeholder="请选择">
          <el-option v-for="(item, index) in antiCc.typeOption" :key="index" :label="item.label" :value="item.value">
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
        <i-button @click="addAnticcWhiteList">新增白名单</i-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="21" class="table-content">
        <el-table :data="antiCc.whiteList" border style="width: 100%" v-loading="loading">
          <el-table-column prop="" label="类型" width="150">
            <template scope="scope">
                <el-select @change="cleanContent(scope)" v-if="scope.row.isEditing" v-model="scope.row.value.type" placeholder="请选择">
                  <el-option v-for="(item, index) in antiCc.whiteListType.options" :key="index" :label="item.label"   :value="item.value">
                  </el-option>
                </el-select>
                <span v-else>{{ scope.row.value.type | dict("rules.class") }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="row-padding" prop="" label="匹配内容" min-width="200">
            <template scope="scope">
              <div v-if="scope.row.isEditing">
                <!-- <el-popover :value="errorTip" popper-class="popover-error" ref="popoverError" placement="top" width="200" trigger="manual" content="请输入正确内容!">
                </el-popover> -->
                <el-input :class="{'is-error':validArray[scope.$index].validContent}" v-if="scope.row.value.type !== 'suffix'" v-model="scope.row.value.content" :placeholder="placeTip" @blur="verifyContent(scope,'content')"></el-input>
                <input-suffix v-else :inputSuffixList="scope.row.value.content" v-on:resSuffixList="updateSuffix" ></input-suffix>
              </div>
              <div v-else>
                <span v-if="scope.row.value.type !== 'suffix'">{{ scope.row.value.content }}</span>
                <span v-else>{{ scope.row.value.content }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column class-name="row-padding" prop="" label="备注">
            <template scope="scope">
              <el-input v-if="scope.row.isEditing" v-model="scope.row.value.remark" placeholder="请输入内容"></el-input>
              <span v-else>{{ scope.row.value.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="row-padding-right" lable-class-name="row-padding-right" label="操作" align="right" width="90">
            <template scope="scope">
              <i-button v-if="scope.row.isEditing" type="text" size="small" @click="handleButtonCcSave(scope)">保存</i-button>
              <i-button v-else type="text" @click="handleEditRule(scope)">编辑</i-button>
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
  </el-card>
</template>

<script>
import SourceSpeedResource from 'cloudSpeed/resource/SourceSpeedResource'
import SourceSpeedCommonResource from 'cloudSpeed/resource/SourceSpeedCommonResource'
import InputSuffix from 'common/components/InputSuffix/InputSuffix'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import RULE from 'common/utils/verify'

export default {
  name: 'defense-ddos',
  components: {
    InputSuffix,
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      changeText: '开启',
      errorTip: false,
      antiCc: {
        init: true,
        status: '',
        type: '',
        typeOption: [
          {
            value: 'off',
            label: 'OFF'
          },
          {
            value: 'default',
            label: '默认'
          },
          {
            value: 'normal',
            label: '普通'
          },
          {
            value: 'strict',
            label: '严格'
          },
          {
            value: 'captcha',
            label: '验证码'
          }
        ],
        whiteList: [],
        whiteListType: {
          value: 'ip',
          options: [
            {
              value: 'suffix',
              label: '后缀名'
            },
            {
              value: 'ip',
              label: 'IP'
            },
            {
              value: 'url',
              label: 'URL'
            }
          ]
        },
        emitResList: ''
      },
      popoverArray: [],
      validArray: [],
      forwardWhiteListItem: [],
      tipContent: [
        '默认：系统只对灾难性攻击行为为用户进行安全拦截',
        '普通：系统会智能识别出可疑请求，并且自动选择合适的验证方式（建议正在遭受到CC攻击时开启）',
        '严格：建议仅在正在受到CC攻击且防御不佳时开启',
        '验证码：100%防御，对用户体验有一定影响',
        'IP段可以用 - 隔开，如：1.1.1.1-1.1.1.255，支持 CIDR格式',
        '白名单中的内容YUNDUN不做防御，直接放行',
        '规则上限20条'
      ],
      loading: false,
      useTaichi: false,
      taichiDdosUrl: '',
      placeTip: '以／开头'
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.taichiDdosUrl = `/console/taichi-ddos#/websiteProtectList/console/${this
      .domainId}`
    const params = {
      domain: this.domainId
    }
    SourceSpeedCommonResource.queryDomainInfo(params).then(res => {
      const data = res.data.data
      if (data.hwws_status === '1') {
        this.changeText = '使用'
      }
      if (data.tjkd_protected_status === '1') {
        this.useTaichi = true
      } else {
        this.fetchAntiCc()
        this.fetchAntiCcWhiteList()
      }
    })
  },
  methods: {
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
    cleanContent(scope) {
      if (scope.row.value.type === 'ip') {
        this.placeTip = '请填写IP'
      }
      if (scope.row.value.type === 'url') {
        this.placeTip = '以／开头'
      }
      scope.row.value.content = ''
      this.validArray[scope.$index].validContent = false
    },
    tabDelPopover(data) {
      const result = data.white_list
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
    fetchAntiCc() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.anti_cc`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (
                res &&
                res.status.code === 1 &&
                res.data &&
                res.data.anti_cc
              ) {
                if (res.data.anti_cc.status === 'off') {
                  this.antiCc.type = 'off'
                } else {
                  this.antiCc.type = res.data.anti_cc.type
                }
              }
            })
          }
        },
        e => {}
      )
    },
    updateAntiCc() {
      if (this.antiCc.init) {
        this.antiCc.init = false
        return
      }
      let params
      if (this.antiCc.type === 'off') {
        params = {
          status: this.antiCc.type
        }
      } else {
        params = {
          status: 'on',
          type: this.antiCc.type
        }
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.anti_cc`
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
    fetchAntiCcWhiteList() {
      this.loading = true
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.anti_cc.rules`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && res.status.code === 1 && res.data && res.data.list) {
                this.antiCc.whiteList = this.tabDelPopover(res.data.list)
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
    addAnticcWhiteList() {
      const whiteListEditing = this.isEditing(this.antiCc.whiteList)
      if (whiteListEditing) {
        return
      }
      this.antiCc.whiteList.unshift({
        isEditing: true,
        value: {
          type: 'url',
          content: '',
          remark: ''
        }
      })
      this.popoverArray.unshift({
        flag: false
      })
      this.validArray.unshift({
        validContent: false
      })
    },
    updateSuffix(resList) {
      this.emitResList = resList
    },
    handleButtonCcSave(scope) {
      const row = scope.row
      if (row.value.type !== 'suffix') {
        if (this.verifyContent(scope, 'content')) {
          this.$message({
            showClose: true,
            message: '请输入正确格式',
            type: 'error'
          })
          return
        }
      }
      this.loading = true
      row.isEditing = false
      let params
      if (row.value.type === 'suffix') {
        params = {
          type: row.value.type,
          content: this.emitResList,
          remark: row.value.remark
        }
      } else {
        params = {
          type: row.value.type,
          content: row.value.content,
          remark: row.value.remark
        }
      }
      if (row.id) {
        SourceSpeedResource.putAntiCcRules(this.domainId, params, row.id)
          .then(res => {
            this.operationSucceed()
            this.fetchAntiCcWhiteList()
          })
          .catch(res => {
            this.fetchAntiCcWhiteList()
          })
      } else {
        SourceSpeedResource.postAntiCcRules(this.domainId, params)
          .then(res => {
            this.operationSucceed()
            this.fetchAntiCcWhiteList()
          })
          .catch(res => {
            this.fetchAntiCcWhiteList()
          })
      }
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
              this.fetchAntiCcWhiteList()
            })
          }
        },
        e => {}
      )
    },
    handleEditRule(scope) {
      const whiteListEditing = this.isEditing(this.antiCc.whiteList)
      if (whiteListEditing) {
        return
      }
      const index = scope.$index
      const row = scope.row
      this.forwardWhiteListItem[index] = {
        isEditing: false,
        type: row.value.type,
        content: row.value.content,
        remark: row.value.remark
      }
      scope.row.isEditing = true
    },
    handleCancelEdit(scope) {
      const currentIndex = scope.$index
      const value = scope.row.value
      this.validArray[currentIndex].validContent = false
      if (!scope.row.id) {
        this.antiCc.whiteList.splice(currentIndex, 1)
        return
      }
      if (this.forwardWhiteListItem[currentIndex]) {
        value.type = this.forwardWhiteListItem[currentIndex].type
        value.content = this.forwardWhiteListItem[currentIndex].content
        value.remark = this.forwardWhiteListItem[currentIndex].remark
      }
      scope.row.isEditing = false
    }
  }
}
</script>

<style scoped>
/*@import '../../assets/styles/website-help.css';*/
</style>
