<template lang="html">
  <!-- HTTPS -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">HTTPS</p>
      </el-col>
      <el-col :span="15" class="description">
        <p>提供SSL加速服务</p>
      </el-col>
      <el-col :span="6">
        <div class="fr">
        <el-select v-model="https.status" placeholder="请选择" @change="updateCertificate">
          <el-option v-for="(item, index) in https.certificateName" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="21">
        <Tip class="tip" :content="tipContent" mode="static"/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="3" class="top-line description">
        <p>HTTP跳转HTTPS</p>
      </el-col>
      <el-col :span="18" class="top-line">
        <el-radio-group v-model="https.httpToHttps" @change="updateHttps">
          <el-radio class="radio" label="off">关闭</el-radio>
          <el-radio class="radio" label="all">全量跳转</el-radio>
          <el-radio class="radio" label="special">指定浏览器跳转</el-radio>
        </el-radio-group>
        <el-popover ref="popover1" placement="top" trigger="hover" content="仅对支持SNI的浏览器进行https跳转">
        </el-popover>
        <i v-popover:popover1 class="yun-icon yun-help-blue inquiry"></i>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="3" class="top-line description">
        <p>HSTS</p>
      </el-col>
      <el-col :span="18" class="top-line">
        <el-switch :disabled="https.status === 'off'" on-value="on" off-value="off" @change="updateHsts" v-model="hsts.status">
        </el-switch>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'

export default {
  name: 'https',
  components: {
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      https: {
        init: 1,
        status: '',
        httpToHttps: '',
        certificateId: '',
        certificateType: 'self',
        certificateName: [
          {
            value: 'off',
            label: 'OFF'
          }
        ]
      },
      certificateCache: {},
      hsts: {
        status: ''
      },
      tipContent: [
        '共享SSL基于 SNI 实现，因此某些不支持 SNI 的旧式浏览器访问可能会有些问题。运行在 Windows XP 上的所有版本的 Internet Explorer 都不支持 SNI',
        '如您需要独享SSL 请联系我们的销售顾问',
        'HSTS为强制客户端（如浏览器）使用HTTPS与服务器创建连接，启用HSTS前请先启用HTTPS协议',
        '关闭HTTPS协议前为防止网站无法正常访问请先关闭HSTS,HSTS关闭后浏览器仍有一个月配置生效时间'
      ]
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.domainName = this.$store.state.website.domain.name
    this.fetchCertificate()
  },
  methods: {
    fetchCertificate() {
      const url = 'Web.ca.self.cloudspeedbycertificate'
      const params = {
        ca_domain: this.domainName
      }
      this.fetchGet(url, params).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && res.status.code === 1 && res.data) {
                res.data.forEach(item => {
                  if (item.certificate_id) {
                    const obj = {
                      label: item.certificate_info.ca_name,
                      value: item.certificate_id + '|' + item.certificate_type
                    }
                    this.https.certificateName.push(obj)
                  }
                })
              }
            })
            this.fetchHttps()
            this.fetchHsts()
          }
        },
        e => {}
      )
    },
    fetchHttps() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.https`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && res.status.code === 1 && res.data && res.data.https) {
                const HTTPS = res.data.https
                this.https.httpToHttps = HTTPS.http2https
                if (HTTPS.certificate_id) {
                  this.https.certificateId = HTTPS.certificate_id
                  this.https.certificateType = HTTPS.certificate_type
                }
                if (HTTPS.status === 'on') {
                  this.https.status =
                    HTTPS.certificate_id + '|' + HTTPS.certificate_type
                } else {
                  this.https.status = HTTPS.status
                }
              }
            })
          }
        },
        e => {}
      )
    },
    updateCertificate(value) {
      if (this.https.init < 3) {
        this.https.init++
        return
      }
      let params
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.https`
      if (value === 'off') {
        params = {
          status: 'off'
        }
      } else {
        const CertifyArray = value.split('|')
        params = {
          status: 'on',
          certificate_id: CertifyArray[0],
          certificate_type: CertifyArray[1]
        }
      }
      console.log('params=======', params)
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
    updateHttps() {
      if (this.https.init < 3) {
        this.https.init++
        return
      }
      let params
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.https`
      if (this.https.status === 'off') {
        params = {
          status: 'off',
          http2https: this.https.httpToHttps
        }
      } else {
        params = {
          status: 'on',
          certificate_type: this.https.certificateType,
          certificate_id: this.https.certificateId,
          http2https: this.https.httpToHttps
        }
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
    fetchHsts() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.hsts`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && res.status.code === 1 && res.data && res.data.hsts) {
                this.hsts.status = res.data.hsts.status
              }
            })
          }
        },
        e => {}
      )
    },
    updateHsts(val) {
      const params = {
        status: val
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.hsts`
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
    }
  }
}
</script>

<style scoped>
.inquiry {
  margin-left: 8px;
}
</style>
