<template lang="html">
  <!-- 防DDOS -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">防DDOS</p>
      </el-col>
      <el-col :span="15" v-if="useTaichiDdos" class="description">
        <p>您已开启太极抗D服务，具体防护配置请前往<a v-bind:href="taichiDdosUrl" class="a-link">太极抗D</a>控制台。</p>
      </el-col>
      <el-col :span="15" v-else class="description">
        <p>已默认开启轻量级抗DDoS服务，如遇针对性大规模DDoS攻击，YUNDUN会将域名解析回源,停止服务，如需要更高级抗DDoS服务，请开启<a href="/console/taichi-ddos#/websiteProtectList" class="a-link">太极抗D</a>服务。</p>
      </el-col>
      <!-- <el-col :span="6">
        <el-select v-model="antiDdos.status" @change="updateAntiDdos" class="fr">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col> -->
    </el-row>
  </el-card>
</template>

<script>
import SourceSpeedResource from 'cloudSpeed/resource/SourceSpeedResource'
import SourceSpeedCommonResource from 'cloudSpeed/resource/SourceSpeedCommonResource'

export default {
  name: 'defense-ddos',
  data() {
    return {
      options: [{
        value: 'on',
        label: 'ON'
      }, {
        value: 'off',
        label: 'OFF'
      }],
      antiDdos: {
        status: ''
      },
      taichiDdosUrl:'',
      useTaichiDdos: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.domainId = this.$route.params.id
      this.taichiDdosUrl = `/console/taichi-ddos#/websiteProtectList/console/${this.domainId}`
      const params = {
        domain: this.domainId
      }
      SourceSpeedCommonResource.queryDomainInfo(params).then(res => {
        const data = res.data.data
        if (data.tjkd_protected_status === '1') {
          this.useTaichiDdos = true
        }
      })
    },
    fetchAntiDdos() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.anti_ddos`
      this.fetchGet(url, {}).then(result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data && res.data.anti_ddos) {
              this.antiDdos.status = res.data.anti_ddos.status
            }
          })
        }
      }, e => {})
    },
    updateAntiDdos() {
      const params = {
        status: this.antiDdos.status
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.anti_ddos`
      this.fetchPut(url, params).then(result => {
        if (result.ok) {
          result.json().then(res => {
            this.windowMessage(res)
          })
        }
      }, e => {})
    }
  }
}
</script>

<style scoped>
/*@import '../../assets/styles/website-help.css';*/
</style>
