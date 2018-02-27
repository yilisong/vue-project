<template lang="html">
  <el-card v-show="delayed" class="item-padding">
    <div v-if="useCname">
      <el-row :gutter="20">
        <el-col :span="3">
          <p class="item-name">搜索引擎优化</p>
        </el-col>
        <el-col :span="15" class="description">
          <p>请前往<a v-bind:href="cloudResolveUrl" class="a-link">云解析</a>添加搜索引擎线路</p>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row :gutter="20">
        <el-col :span="3">
          <p class="item-name">搜索引擎优化</p>
        </el-col>
        <el-col :span="15" class="description">
          <p>指定IP让蜘蛛爬取，提高搜索引擎检索效率</p>
        </el-col>
        <el-col :span="6">
          <el-select class="fr" v-model="status" placeholder="请选择" @change="updateSearchEngineOptimization">
            <el-option v-for="(item, index) in statusOption" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3" class="top-line tr">搜索引擎回源IP</el-col>
        <el-col :span="21" class="top-line">
          <div>
            <input-edit v-on:updateItem="updateBackSourceIps" :listData="backSourceIps" :validType="validType" upperLimit=""></input-edit>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import SourceSpeedResource from 'cloudSpeed/resource/SourceSpeedResource'
import SourceSpeedCommonResource from 'cloudSpeed/resource/SourceSpeedCommonResource'
import InputEdit from 'common/components/InputEdit/input-edit'

export default {
  name: 'search-optimize',
  components: {
    InputEdit
  },
  data() {
    return {
      delayed: false,
      validType: 'ip',
      init: true,
      status: '',
      statusOption: [
        {
          value: 'off',
          label: 'OFF'
        },
        {
          value: 'on',
          label: 'ON'
        }
      ],
      backSourceIps: [],
      useCname: false,
      cloudResolveUrl: '',
      dnsId: ''
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.domainId = this.$route.params.id
      const params = {
        domain: this.domainId
      }
      SourceSpeedCommonResource.queryDomainInfo(params).then(res => {
        const data = res.data.data
        this.dnsId = data.cloud_dns_domain_id
        if (data.protected_mode === '2') {
          this.useCname = true
          this.cloudResolveUrl = `/console/cloud-resolving#/domainList/console/${this.dnsId}/record`
        }
        this.delayed = true
      })
      this.fetchSearchEngineOptimization()
    },
    fetchSearchEngineOptimization() {
      SourceSpeedResource.getSearchEngineOptimization(
        this.domainId
      ).then(res => {
        const data = res.data.data
        this.status = data.search_engine_optimization.status
        if (data.search_engine_optimization.back_source_ips) {
          this.backSourceIps = data.search_engine_optimization.back_source_ips
        }
      })
    },
    updateSearchEngineOptimization() {
      if (this.init) {
        this.init = false
        return
      }
      const params = {
        status: this.status,
        back_source_ips: this.backSourceIps
      }
      SourceSpeedResource.putSearchEngineOptimization(
        this.domainId,
        params
      ).then(res => {
        this.operationSucceed()
      })
    },
    updateBackSourceIps(listDate) {
      this.backSourceIps = listDate
      this.updateSearchEngineOptimization()
    }
  }
}
</script>

<style scoped>
.top-line {
  border-top: 0;
}
</style>
