<template lang="html">
<!-- CDN高级缓存 -->
<el-card class="item-padding">
  <el-row :gutter="20">
    <el-col :span="3">
      <p class="item-name">CDN高级缓存</p>
    </el-col>
    <el-col :span="15" class="description">
      <p>YUNDUN优质CDN网络，智能缓存网站内容极大提高网站访问速度</p>
    </el-col>
    <el-col :span="6">
      <el-select v-model="cdnAdvanceCache.status" @change="updateCdnAdvanceCache" class="fr">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :offset="3" :span="21">
      <Tip class="tip" :content="tipContent" mode="static" />
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :offset="3" :span="21" class="top-line">
      <el-radio-group v-model="selectCacheType" @change="changeCacheType">
        <el-radio-button label="yes">缓存</el-radio-button>
        <el-radio-button label="no">不缓存</el-radio-button>
        <i class="yun-icon yun-prior"></i>
      </el-radio-group>
      <i-button class="add-rules" @click="addCdnAdvanceCacheRules">新增</i-button>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :offset="3" :span="21" class="table-content" width="120" v-show="selectCacheType === 'yes'">
      <el-table :data="cdnAdvanceCache.cacheRules" border style="width: 100%" v-loading="loading">
        <el-table-column prop="" label="缓存类型" min-width="110">
          <template scope="scope">
                <el-select @change="cleanContent(scope)" v-if="scope.row.isEditing" v-model="scope.row.value.type" placeholder="请选择">
                  <el-option v-for="(item, index) in cdnAdvanceCache.rulesType.options" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <span v-else>{{ scope.row.value.type | dict("rules.class") }}</span>
            </template>
        </el-table-column>
        <el-table-column class-name="row-padding" prop="" label="匹配内容" min-width="230">
          <template scope="scope">
              <div v-if="scope.row.isEditing">
                <!-- <el-popover :value="errorTip" popper-class="popover-error" ref="popoverError" placement="top-start" width="200" trigger="manual" content="请输入正确内容!">
                </el-popover> -->
                <input-suffix v-if="scope.row.value.type === 'suffix'" :inputSuffixList="scope.row.value.content" v-on:resSuffixList="updateSuffix" ></input-suffix>
                <el-input :class="{'is-error':validArray[scope.$index].validContent}" v-else v-model="scope.row.value.content" placeholder="以/开头" @blur="verifyContent(scope,'content')"></el-input>
              </div>
              <span v-else>{{ scope.row.value.content }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="" label="缓存方式" min-width="75" align="center">
          <template scope="scope">
                <span>{{ scope.row.value.cache_type | dict("rules.cache") }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="" label="缓存时间" width="170">
          <template scope="scope">
              <el-input :class="{'is-error':validArray[scope.$index].validTime}" v-if="scope.row.isEditing" class="input-time" v-model="scope.row.value.cache_time" placeholder="请输入内容"  @blur="verifyContent(scope,'time')"></el-input>
              <span v-else>{{ scope.row.value.cache_time }}</span>
              <el-select v-if="scope.row.isEditing" class="select-unit" v-model="scope.row.value.cache_time_unit" placeholder="请选择">
                <el-option v-for="(item, index) in cdnAdvanceCache.cacheTimeUnit.options" :key="index" :label="item.label"   :value="item.value">
                </el-option>
              </el-select>
              <span v-else>{{ scope.row.value.cache_time_unit | dict("rules.cacheTime") }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="" align="center" label="优先级（由上往下)" min-width="140">
          <template scope="scope">
              <span class="yun-icon yun-sort-up" @click="ruleUp(scope)"></span>
              <span class="yun-icon yun-sort-down" @click="ruleDown(scope)"></span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="90" align="right" class-name="row-padding-right" lable-class-name="row-padding-right">
          <template scope="scope">
              <i-button v-if="scope.row.isEditing" type="text" size="small" @click="handleCdnCacheRuleSave(scope)">保存</i-button>
              <i-button v-else type="text" @click="handleEditRule(scope)">编辑</i-button>
              <i-button v-if="scope.row.isEditing" type="text" size="small" @click="handleCancelEdit(scope)">取消</i-button>
              <el-popover ref="ifDelCacheItem" placement="top" width="100" trigger="click" v-model="popoverCacheArray[scope.$index].flag">
                <p>确认删除当前行吗？</p>
                <div style="text-align: right; margin: 0">
                  <i-button size="mini" type="text" @click="handleCancelDel(scope.$index)">取消</i-button>
                  <i-button type="primary" size="mini" @click="handleConfDel(scope.$index,scope.row)">确定</i-button>
                </div>
              </el-popover>
              <i-button v-show="!scope.row.isEditing" type="text" v-popover:ifDelCacheItem>删除</i-button>
            </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :offset="3" :span="21" class="table-content" width="120" v-show="selectCacheType === 'no'">
      <el-table :data="cdnAdvanceCache.noCacheRules" border style="width: 100%" v-loading="loading">
        <el-table-column prop="" label="缓存类型" min-width="120">
          <template scope="scope">
                <el-select @change="cleanContent(scope)" v-if="scope.row.isEditing" v-model="scope.row.value.type" placeholder="请选择">
                  <el-option v-for="(item, index) in cdnAdvanceCache.rulesType.options" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <span v-else>{{ scope.row.value.type | dict("rules.class") }}</span>
            </template>
        </el-table-column>
        <el-table-column class-name="row-padding" prop="" label="匹配内容" min-width="270">
          <template scope="scope">
              <div v-if="scope.row.isEditing">
                <!-- <el-popover :value="errorTip" popper-class="popover-error" ref="popoverError" placement="top" width="200" trigger="manual" content="请输入正确内容!">
                </el-popover> -->
                <input-suffix v-if="scope.row.value.type === 'suffix'" :inputSuffixList="scope.row.value.content" v-on:resSuffixList="updateSuffix" ></input-suffix>
                <el-input :class="{'is-error':validArray[scope.$index].validContent}" v-else v-model="scope.row.value.content" placeholder="请输入内容" @blur="verifyContent(scope,'content')"></el-input>
              </div>
              <span v-else>{{ scope.row.value.content }}</span>
            </template>
        </el-table-column>
        <el-table-column class-name="cache-time" prop="" label="缓存方式" min-width="220">
          <template scope="scope">
            <span>{{ scope.row.value.cache_type | dict("rules.cache") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="90" align="right" class-name="row-padding-right" lable-class-name="row-padding-right">
            <template scope="scope">
                <i-button v-if="scope.row.isEditing" type="text" size="small" @click="handleCdnCacheRuleSave(scope)">保存</i-button>
                <i-button v-else type="text" @click="handleEditRule(scope)">编辑</i-button>
              <i-button v-if="scope.row.isEditing" type="text" size="small" @click="handleCancelEdit(scope)">取消</i-button>
              <el-popover ref="ifDelNoCacheItem" placement="top" width="100" trigger="click" v-model="popoverArray[scope.$index].flag">
                <p>确认删除当前行吗？</p>
                <div style="text-align: right; margin: 0">
                  <i-button size="mini" type="text" @click="handleCancelDel(scope.$index)">取消</i-button>
                  <i-button type="primary" size="mini" @click="handleConfDel(scope.$index,scope.row)">确定</i-button>
                </div>
              </el-popover>
              <i-button v-show="!scope.row.isEditing" type="text" v-popover:ifDelNoCacheItem>删除</i-button>
            </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row :gutter="20"  class="not-ignore">
    <el-col :offset="3" :span="21" class="top-line">
      <el-checkbox v-model="notIgnore" @change="handleIgnoreOption">不忽略请求头中Cache-Control和Pragma</el-checkbox>
    </el-col>
  </el-row>
</el-card>
</template>

<script>
import ConsoleTabPerformResource from 'cloudSpeed/resource/ConsoleTabPerformResource'
import InputSuffix from 'common/components/InputSuffix/InputSuffix'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import RULE from 'common/utils/verify'

export default {
  name: 'cdn-chache',
  components: {
    InputSuffix,
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      notIgnore: true,
      options: [{
          value: 'on',
          label: 'ON'
        },
        {
          value: 'off',
          label: 'OFF'
        }
      ],
      cdnAdvanceCache: {
        init: true,
        status: '',
        cacheRules: [],
        noCacheRules: [],
        rulesType: {
          value: 'suffix',
          options: [{
              value: 'suffix',
              label: '后缀名'
            },
            {
              value: 'equal',
              label: '精确匹配'
            },
            {
              value: 'dir',
              label: '目录'
            }
          ]
        },
        cacheType: {
          value: 'no'
        },
        cacheTimeUnit: {
          value: 'hour',
          options: [{
              value: 'minute',
              label: '分钟'
            },
            {
              value: 'hour',
              label: '小时'
            },
            {
              value: 'day',
              label: '天'
            },
            {
              value: 'month',
              label: '月'
            }
          ]
        }
      },
      selectCacheType: 'yes',
      popoverArray: [],
      popoverCacheArray: [],
      validArray: [],
      forwardCacheItem: [],
      tipContent: [
        '1.缓存类型为后缀名时可用“|”隔开',
        '2.缓存类型为目录或者精确匹配时以“／”开头',
        '3.支持自行调控优先级，不缓存记录优先级高于缓存记录',
        '4.开启缓存功能后，系统默认忽略请求头中Cache-Control和Pragma两个头部不走缓存信息，只要CDN节点有缓存就不会到源取数据，任然返回CDN缓存内容',
        '5.缓存时间最长一年，规则上限20条'
      ],
      loading: false
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchCdnAdvanceCache()
    this.fetchCdnAdvanceCacheRules()
  },
  methods: {
    verifyContent(scope, tag) {
      const value = scope.row.value
      let isError = true
      switch (tag) {
        case 'content':
          if (value.type === 'dir' || value.type === 'equal') {
            if (!RULE.noProtocolUrl.test(value.content)) {
              this.validArray[scope.$index].validContent = true
            } else {
              this.validArray[scope.$index].validContent = false
              isError = false
            }
            break
          }
        case 'time':
          if (!RULE.cacheTimeNumber.test(value.cache_time)) {
            this.validArray[scope.$index].validTime = true
          } else {
            this.validArray[scope.$index].validTime = false
            isError = false
          }
          break
      }
      return isError
    },
    cleanContent(scope) {
      scope.row.value.content = ''
      this.validArray[scope.$index].validContent = false
      this.validArray[scope.$index].validTime = false
    },
    tabDelPopover(data) {
      const result = data
      result.forEach(v => {
        v.isEditing = false
        this.popoverArray.push({
          flag: false
        })
        this.validArray.push({
          validContent: false,
          validTime: false
        })
      })
      return result
    },
    tabDelCachePopover(data) {
      const result = data
      result.forEach(v => {
        v.isEditing = false
        this.popoverCacheArray.push({
          flag: false
        })
        this.validArray.push({
          validContent: false,
          validTime: false
        })
      })
      return result
    },
    // CDN高级缓存
    fetchCdnAdvanceCache() {
      const url = `Web.Domain.DomainId.${this
        .domainId}.Settings.cdn_advance_cache`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (
                res &&
                res.status.code === 1 &&
                res.data &&
                res.data.cdn_advance_cache
              ) {
                this.cdnAdvanceCache.status = res.data.cdn_advance_cache.status
                this.notIgnore = this.resToBoolean(res.data.cdn_advance_cache.ctrl_f5_refresh)
                console.log('this.notIgnore....', this.notIgnore)
              }
            })
          }
        },
        e => {}
      )
    },
    updateCdnAdvanceCache() {
      if (this.cdnAdvanceCache.init) {
        this.cdnAdvanceCache.init = false
        return
      }
      const params = {
        status: this.cdnAdvanceCache.status
      }
      const url = `Web.Domain.DomainId.${this
        .domainId}.Settings.cdn_advance_cache`
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
    fetchCdnAdvanceCacheRules() {
      this.loading = true
      const url = `Web.Domain.DomainId.${this
        .domainId}.Settings.cdn_advance_cache.rules`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && res.status.code === 1 && res.data && res.data.list) {
                this.cdnAdvanceCache.cacheRules = this.tabDelCachePopover(
                  res.data.list.cache_list
                )
                this.cdnAdvanceCache.noCacheRules = this.tabDelPopover(
                  res.data.list.nocache_list
                )
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
    addCdnAdvanceCacheRules() {
      const cacheEditing = this.isEditing(this.cdnAdvanceCache.cacheRules)
      const noCacheEditing = this.isEditing(this.cdnAdvanceCache.noCacheRules)
      if (cacheEditing || noCacheEditing) {
        return
      }
      if (this.selectCacheType === 'yes') {
        this.cdnAdvanceCache.cacheRules.unshift({
          isEditing: true,
          value: {
            type: 'equal',
            content: '',
            cache_type: this.selectCacheType,
            cache_time_unit: 'minute'
          }
        })
        this.popoverCacheArray.unshift({
          flag: false
        })
      } else {
        this.cdnAdvanceCache.noCacheRules.unshift({
          isEditing: true,
          value: {
            type: 'equal',
            content: '',
            cache_time: '1',
            cache_time_unit: 'minute',
            cache_type: this.selectCacheType
          }
        })
        this.popoverArray.unshift({
          flag: false
        })
      }
      this.validArray.unshift({
        validContent: false,
        validTime: false
      })
    },
    updateSuffix(resList) {
      this.emitResList = resList
    },
    handleCdnCacheRuleSave(scope) {
      console.info(scope.row)
      if (
        this.verifyContent(scope, 'content') ||
        this.verifyContent(scope, 'time')
      ) {
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
      let params
      if (row.value.type === 'suffix') {
        params = {
          type: row.value.type,
          content: this.emitResList,
          cache_type: row.value.cache_type,
          cache_time_unit: row.value.cache_time_unit,
          cache_time: row.value.cache_time
        }
      } else {
        params = {
          type: row.value.type,
          content: row.value.content,
          cache_type: row.value.cache_type,
          cache_time_unit: row.value.cache_time_unit,
          cache_time: row.value.cache_time
        }
      }
      if (row.id) {
        ConsoleTabPerformResource.putCdnAdvanceCache(
            this.domainId,
            params,
            row.id
          )
          .then(res => {
            this.operationSucceed()
            this.fetchCdnAdvanceCacheRules()
          })
          .catch(res => {
            this.fetchCdnAdvanceCacheRules()
          })
      } else {
        ConsoleTabPerformResource.postCdnAdvanceCache(this.domainId, params)
          .then(res => {
            this.operationSucceed()
            this.fetchCdnAdvanceCacheRules()
          })
          .catch(res => {
            this.fetchCdnAdvanceCacheRules()
          })
      }
    },
    changeCacheType(type) {
      console.log(1234)
      this.errorTip = false
      this.cdnAdvanceCache.cacheType.value = type
      this.fetchCdnAdvanceCacheRules()
    },
    handleCancelDel(index) {
      if (this.selectCacheType === 'no') {
        this.popoverArray[index].flag = false
      } else if (this.selectCacheType === 'yes') {
        this.popoverCacheArray[index].flag = false
      }
      return
    },
    handleConfDel(index, row) {
      if (this.selectCacheType === 'yes') {
        this.popoverCacheArray[index].flag = false
        this.popoverCacheArray.splice(index, 1)
      } else {
        this.popoverArray[index].flag = false
        this.popoverArray.splice(index, 1)
      }
      this.validArray.splice(index, 1)
      const url = `Web.Domain.DomainId.${this
        .domainId}.Settings.cdn_advance_cache.rules.${row.id}`
      this.fetchDel(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              this.fetchCdnAdvanceCacheRules()
            })
          }
        },
        e => {}
      )
    },
    handleEditRule(scope) {
      const row = scope.row
      if (row.value.type === 'suffix') {
        this.emitResList = row.value.content
      }
      console.log(scope)
      const cacheEditing = this.isEditing(this.cdnAdvanceCache.cacheRules)
      const noCacheEditing = this.isEditing(this.cdnAdvanceCache.noCacheRules)
      if (cacheEditing || noCacheEditing) {
        return
      }
      const index = scope.$index
      this.forwardCacheItem[index] = {
        isEditing: false,
        type: row.value.type,
        content: row.value.content,
        cacheType: row.value.cache_type,
        cacheTimeUnit: row.value.cache_time_unit,
        cacheTime: row.value.cache_time
      }
      scope.row.isEditing = true
    },
    handleCancelEdit(scope) {
      this.errorTip = false
      const value = scope.row.value
      const currentIndex = scope.$index
      this.validArray[currentIndex].validTime = false
      this.validArray[currentIndex].validContent = false
      if (!scope.row.id) {
        if (this.selectCacheType === 'yes') {
          this.cdnAdvanceCache.cacheRules.splice(currentIndex, 1)
        } else if (this.selectCacheType === 'no') {
          this.cdnAdvanceCache.noCacheRules.splice(currentIndex, 1)
        }
        return
      }
      if (this.forwardCacheItem[currentIndex]) {
        if (this.selectCacheType === 'yes') {
          value.type = this.forwardCacheItem[currentIndex].type
          value.content = this.forwardCacheItem[currentIndex].content
          value.cache_type = this.forwardCacheItem[currentIndex].cacheType
          value.cache_time_unit = this.forwardCacheItem[
            currentIndex
          ].cacheTimeUnit
          value.cache_time = this.forwardCacheItem[currentIndex].cacheTime
        } else if (this.selectCacheType === 'no') {
          value.type = this.forwardCacheItem[currentIndex].type
          value.content = this.forwardCacheItem[currentIndex].content
          value.cache_type = this.forwardCacheItem[currentIndex].cacheType
        }
      }
      scope.row.isEditing = false
    },
    ruleUp(scope) {
      if (scope.$index === 0) {
        return
      }
      this.swapItems(
        this.cdnAdvanceCache.cacheRules,
        scope.$index,
        scope.$index - 1
      )
    },
    ruleDown(scope) {
      if (scope.$index === this.cdnAdvanceCache.cacheRules.length - 1) {
        return
      }
      this.swapItems(
        this.cdnAdvanceCache.cacheRules,
        scope.$index,
        scope.$index + 1
      )
    },
    swapItems(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return this.ruleSort(arr)
    },
    ruleSort(arr) {
      const jsonIds = {}
      arr.forEach((item, index) => {
        jsonIds[item.id] = index
        item.order = index
      })
      const url = 'Web.Domain.DomainId.Settings.setCacheOrder'
      const params = {
        domain_id: this.domainId,
        ids: jsonIds
      }
      this.fetchPut(url, params).then(
        result => {
          if (result.ok) {
            result.json().then(res => {})
          }
        },
        e => {}
      )
      return arr
    },
    handleIgnoreOption() {
      const params = {
        ctrl_f5_refresh: ''
      }
      params.ctrl_f5_refresh = this.booleanToNum(this.notIgnore)
      ConsoleTabPerformResource.putIgnoreHead(
        this.domainId,
        params
      ).then(res => {
        this.operationSucceed()
      })
    }
  }
}
</script>

<style scoped>
.not-ignore {
  margin-top: 20px;
}

.yun-prior {
  position: relative;
  left: -18px;
  top: -10px;
}

.select-unit {
  width: 80px;
}

.el-card {
  overflow: visible;
}

.input-time {
  width: 60px !important;
}

.el-select .el-input__inner,
.el-input__inner {
  font-size: 12px;
}

.add-rules {
  left: -18px;
  position: relative;
}
</style>
<style>
.cache-time {
  padding-left: 25px;
}
</style>
