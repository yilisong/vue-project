<template lang="html">
<!-- 防盗链 -->
<el-card class="item-padding">
  <el-row :gutter="20">
    <el-col :span="3">
      <p class="item-name">防盗链</p>
    </el-col>
    <el-col :span="15" class="description">
      <p>保护网站资源不被外部盗用</p>
    </el-col>
    <el-col :span="6">
      <div class="fr">
        <el-select v-model="antiRefer.status" @change="updateAntiRefer" class="fr">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :offset="3" :span="21">
      <Tip class="tip" :content="tipContent" mode="static" />
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :offset="3" :span="3" class="description">
      <span v-if="antiRefer.mode === 'blackList'">防盗链黑名单</span>
      <span v-else>防盗链白名单</span>
    </el-col>
    <el-col :span="10">
      <div class="">
        <el-radio-group class="" v-model="antiRefer.mode" @change="updateAntiRefer">
          <el-radio class="radio" label="whiteList">开启白名单模式</el-radio>
          <el-radio class="radio" label="blackList">开启黑名单模式</el-radio>
        </el-radio-group>
        <div class="list-input">
          <input-edit :validType="validType" v-on:updateItem="antiReferBlackItem" v-if="antiRefer.mode === `blackList`" :listData="antiRefer.blackList"></input-edit>
          <input-edit :validType="validType" v-on:updateItem="antiReferWhiteItem" v-if="antiRefer.mode === `whiteList`" :listData="antiRefer.whiteList"></input-edit>
        </div>
      </div>
    </el-col>
  </el-row>
</el-card>
</template>

<script>
import InputEdit from 'common/components/InputEdit/input-edit'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'

export default {
  name: 'defense-refer',
  components: {
    InputEdit,
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      validType: 'domain',
      options: [{
          value: 'on',
          label: 'ON'
        },
        {
          value: 'off',
          label: 'OFF'
        }
      ],
      antiRefer: {
        init: 1,
        status: '',
        mode: '',
        whiteList: [],
        blackList: []
      },
      tipContent: [
        '白名单中域名不受防盗链影响，可正常访问您网站资源',
        '支持通配符*，您可以使用*.demo.com来代表demo.com下的所有站点',
        '黑白名单规则上限20条'
      ]
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchAntiRefer()
  },
  methods: {
    fetchAntiRefer() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.anti_refer`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && res.status.code === 1 && res.data && res.data.anti_refer) {
                const antiRefer = res.data.anti_refer
                this.antiRefer.status = antiRefer.status
                if (antiRefer.mode) {
                  this.antiRefer.mode = antiRefer.mode
                }
                if (antiRefer.blackList) {
                  this.antiRefer.blackList = antiRefer.blackList
                }
                if (antiRefer.whiteList) {
                  this.antiRefer.whiteList = antiRefer.whiteList
                }
              }
            })
          }
        },
        e => {}
      )
    },
    updateAntiRefer(list) {
      if (this.antiRefer.init < 3) {
        this.antiRefer.init++
          return
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.anti_refer`
      const params = {
        status: this.antiRefer.status,
        mode: this.antiRefer.mode,
        blackList: this.antiRefer.blackList,
        whiteList: this.antiRefer.whiteList
      }
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
    antiReferBlackItem(listDate) {
      this.antiRefer.blackList = listDate
      this.updateAntiRefer()
    },
    antiReferWhiteItem(listDate) {
      this.antiRefer.whiteList = listDate
      this.updateAntiRefer()
    }
  }
}
</script>

<style scoped>
.list-input {
  margin-top: 12px;
}
</style>
