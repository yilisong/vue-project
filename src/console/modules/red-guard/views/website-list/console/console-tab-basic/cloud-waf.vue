<template lang="html">
  <!-- 防CC/访客鉴别 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">云WAF</p>
      </el-col>
      <el-col :span="15" class="description">
        <p>基于大数据人工智能攻击识别引擎，可防御SQL注入、XSS攻击、恶意扫描等各种漏洞攻击。同时通过访客行为和安全大数据分析，深层次拦截WebShell</p>
      </el-col>
      <el-col :span="6">
        <el-select class="fr" v-model="type" @change="updateWaf" placeholder="请选择">
          <el-option v-for="(item, index) in typeOption" :key="index" :label="item.label" :value="item.value">
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
      <el-col :span="3">
        <p class="item-name">等级选择</p>
      </el-col>
      <el-col :span="21">
        <el-radio-group v-model="wafLevel" @change="updateWaf">
          <el-radio label="general">普通</el-radio>
          <el-radio label="strict">严格</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="21" class="top-line">
        <i-button @click="addAnticcWhiteList">新增白名单</i-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="21" class="table-content">
        <el-table :data="whiteList" border style="width: 100%" v-loading="loading">
          <el-table-column prop="" label="类型">
            <template scope="scope">
                <el-select @change="cleanContent(scope)" v-if="scope.row.isEditing" v-model="scope.row.value.type" placeholder="请选择">
                  <el-option v-for="(item, index) in whiteListType.options" :key="index" :label="item.label"   :value="item.value">
                  </el-option>
                </el-select>
                <span v-else>{{ scope.row.value.type | dict("rules.class") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="匹配内容">
            <template scope="scope">
              <div v-if="scope.row.isEditing">
                <el-input :class="{'is-error':validArray[scope.$index].validContent}" v-model="scope.row.value.content" :placeholder="placeTip" @blur="verifyContent(scope,'content')"></el-input>
              </div>
              <div v-else>
                <span>{{ scope.row.value.content }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="备注">
            <template scope="scope">
              <el-input v-if="scope.row.isEditing" v-model="scope.row.value.remark" placeholder="请输入内容"></el-input>
              <span v-else>{{ scope.row.value.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right" width="100">
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
  </el-card>
</template>

<script>
import SourceGuardResource from 'redGuard/resource/SourceGuardResource'
import InputSuffix from 'common/components/InputSuffix/InputSuffix'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import RULE from 'common/utils/verify'

export default {
  name: 'cloud-waf',
  components: {
    InputSuffix,
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      domainId: '',
      errorTip: false,
      init: 1,
      status: 'off',
      type: '',
      typeOption: [{
          value: 'off',
          label: 'OFF'
        },
        {
          value: 'active',
          label: '观察模式'
        },
        {
          value: 'block',
          label: '拦截模式'
        },
        {
          value: 'ban',
          label: '封禁模式'
        }
      ],
      wafLevel: '',
      whiteList: [],
      whiteListType: {
        value: 'url',
        options: [{
            value: 'ip',
            label: 'IP'
          },
          {
            value: 'url',
            label: 'URL'
          }
        ]
      },
      popoverArray: [],
      validArray: [],
      forwardWhiteListItem: [],
      tipContent: [
        '1.模式分为观察模式、拦截模式和封禁模式',
        '观察模式：实时检测分析攻击，但不对攻击进行拦截',
        '拦截模式：发现有攻击时，YUNDUN进行实时拦截',
        '封禁模式：发现有攻击时，YUNDUN进行实时拦截，同时会将触发一定规则的攻击IP加入黑名单中',
        '2.等级分为普通和严格',
        '普通：较为宽松，基本无误防',
        '严格：严格检查，综合多方面因子，可能导致误防',
        '3.IP段可以用 - 隔开，如：1.1.1.1-1.1.1.255，支持 CIDR格式',
        '4.类型为URL时内容以“/”开头'
      ],
      loading: false,
      placeTip: '以／开头'
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchWaf()
    this.fetchWafWhiteList()
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
      switch (scope.row.value.type) {
        case 'ip':
          this.placeTip = '请填写IP'
          break
        case 'url':
          this.placeTip = '以／开头'
          break
        default:
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
    fetchWaf() {
      SourceGuardResource.getWafConfig(this.domainId).then(res => {
        const data = res.data.data.cloud_waf
        if (data.status === 'off') {
          this.type = 'off'
        } else {
          this.type = data.waf_mode
        }
        this.wafLevel = data.waf_level
      })
    },
    updateWaf() {
      if (this.init < 3) {
        this.init++
          return
      }
      let params
      if (this.type === 'off') {
        params = {
          status: this.type
        }
      } else {
        params = {
          status: 'on',
          waf_mode: this.type,
          waf_level: this.wafLevel
        }
      }
      SourceGuardResource.putWafConfig(this.domainId, params).then(res => {
        this.windowMessage(res.data.status.message)
      })
    },
    fetchWafWhiteList() {
      this.loading = true
      SourceGuardResource.getWafRules(this.domainId).then(res => {
        const list = res.data.data.list
        this.whiteList = this.tabDelPopover(list)
        this.loading = false
      })
    },
    isEditing(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].isEditing) {
          return true
        }
      }
    },
    addAnticcWhiteList() {
      const whiteListEditing = this.isEditing(this.whiteList)
      if (whiteListEditing) {
        return
      }
      this.whiteList.unshift({
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
    handleButtonCcSave(scope) {
      const row = scope.row
      if (this.verifyContent(scope, 'content')) {
        return
      }
      this.loading = true
      row.isEditing = false
      const params = {
        type: row.value.type,
        content: row.value.content,
        remark: row.value.remark
      }
      if (row.id) {
        SourceGuardResource.putWafRules(this.domainId, params, row.id).then(res => {
          this.loading = false
          this.windowMessage(res.data.status.message)
          this.fetchWafWhiteList()
        }).catch(res => {
          this.fetchWafWhiteList()
        })
      } else {
        SourceGuardResource.addWafRules(this.domainId, params).then(res => {
          this.loading = false
          this.windowMessage(res.data.status.message)
          this.fetchWafWhiteList()
        }).catch(res => {
          this.fetchWafWhiteList()
        })
      }
    },
    handleCancelDel(index) {
      this.popoverArray[index].flag = false
      return
    },
    handleConfDel(index, row) {
      this.popoverArray[index].flag = false
      this.loading = true
      SourceGuardResource.delWafRules(this.domainId, row.id).then(res => {
        this.windowMessage(res.data.status.message)
        this.fetchWafWhiteList()
      })
    },
    handleEditRule(scope) {
      const whiteListEditing = this.isEditing(this.whiteList)
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
      this.validArray[currentIndex].validContent = false
      const value = scope.row.value
      if (!scope.row.id) {
        this.whiteList.splice(currentIndex, 1)
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
</style>
