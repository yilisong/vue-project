<template lang="html">
<div class="content-padding base-border" v-if="haveService">
  <div class="title">
    已开通服务
  </div>
  <row :gutter="20">
    <col :span="12">
      <div class="wrapper base-border" v-if="haveBasicApply">
        <div>
          {{ basicApply.title }}
        </div>
        <div class="service-box clearfix basicApply" v-for="(service,index) in basicApply.serviceList">
          <i :class="'icon-'+service.name"></i>
          <span class="subtitle">{{ service.title }}</span>
          <template v-if="service.name === 'cloudCalc'">
            <a class="text-info" href="/console/cloud-host">管理</a>
            <div class="details">
              <span class="num">{{ service.total }}</span>台云主机,
              <span class="num">{{ service.off }}</span>台未运行
            </div>
          </template>
          <template v-else-if="service.name === 'cloudDns'">
            <a class="text-info" href="/console/cloud-resolving">管理</a>
            <div class="details">
              <span class="num">{{ service.total }}</span>个域名,
              <span class="num">{{ service.off }}</span>个未接入
            </div>
          </template>
          <template v-else-if="service.name === 'cloudMonitor'">
            <a class="text-info" href="/console/cloud-monitor">管理</a>
            <div class="details">
              <span class="num">{{ service.total }}</span>个监控项,
              <span class="num">{{ service.off }}</span>个宕机
            </div>
          </template>
          <template v-else-if="service.name === 'sslCa'">
            <a class="text-info" href="/console/ssl-certificate">管理</a>
            <div class="details">
              <span class="num">{{ service.total }}</span>个证书
            </div>
          </template>
          <template v-else="service.name === 'replaceMirror'">
            <a class="text-info" href="/console/double-mirror">管理</a>
            <div class="details">
              <span class="num">{{ service.total }}</span>个域名
            </div>
          </template>
        </div>
      </div>
      <div class="wrapper base-border" v-if="haveCloudSafe">
        <div>
          {{ cloudSafe.title }}
        </div>
        <div class="service-box clearfix" :class="[service.name === 'hwws' ? 'hwws' : 'shieldEye']" v-for="(service,index) in cloudSafe.serviceList">
          <i :class="'icon-'+service.name"></i>
          <span class="subtitle">{{ service.title }}</span>
          <template v-if="service.name === 'hwws'">
            <a class="text-info" href="/console/red-guard">管理</a>
            <div class="details">
              <span class="num">{{ service.total }}</span>个套餐,
              <span class="num">{{ service.off }}</span>个即将到期
            </div>
          </template>
          <template v-else-if="service.name === 'observeStar'">
            <a class="text-info" href="/console/observe-risk">管理</a>
            <div class="details">
              <span class="num">{{ service.total }}</span>个套餐,
              <span class="num">{{ service.off }}</span>个即将到期
            </div>
          </template>
          <template v-else="service.name === 'shieldEye'">
            <a class="text-info" href="/console/shield-eye">管理</a>
            <div class="details">
              <span class="num">{{ service.total }}</span>个资产
            </div>
          </template>
        </div>
      </div>
    </col>
    <col :span="12">
      <div class="wrapper base-border" v-if="haveWebCDN">
        <div>
          {{ webCDN.title }}
        </div>
        <div class="service-box clearfix webCDN" v-for="(service,index) in webCDN.serviceList">
          <i :class="'icon-'+service.name"></i>
          <span class="subtitle">{{ service.title }}</span>
          <template v-if="service.name === 'webCdn'">
            <a class="text-info" href="/console/cloud-speed">管理</a>
            <div class="details">
              <span class="num">{{ service.total }}</span>个域名
            </div>
          </template>
        </div>
      </div>
      <div class="wrapper base-border" v-if="haveTaichiDDos">
        <div>
          {{ taichiDDos.title }}
        </div>
        <div class="service-box clearfix taichiDDos" v-for="(service,index) in taichiDDos.serviceList">
          <i :class="'icon-'+service.name"></i>
          <span class="subtitle">{{ service.title }}</span>
          <template v-if="service.name === 'tjkdweb'">
            <a class="text-info" href="/console/taichi-ddos">管理</a>
          </template>
          <template v-else-if="service.name === 'tjkdPlus'">
            <a class="text-info" href="/console/taichi-plus#/PackageList">管理</a>
          </template>
          <template v-else-if="service.name === 'tjkdDns'">
            <a class="text-info" href="/console/taichi-dns#/DomainList">管理</a>
          </template>
          <template v-else="service.name === 'tjkdApp'">
            <a class="text-info" href="/console/game-shield#/gameList">管理</a>
          </template>
          <div class="details">
            <span class="num">{{ service.total }}</span>个套餐,
            <span class="num">{{ service.off }}</span>个即将到期
          </div>
        </div>
      </div>
    </col>
  </row>
</div>
</template>

<script>
import '../assets/styles/icon-backname.css'
import SourceOverviewResource from 'home/resource/SourceOverviewResource'

export default {
  name: 'AvailableServices',
  created() {},
  computed: {
    basicApply() {
      return this.$store.state.services.availableServices.basicApply
    },
    webCDN() {
      return this.$store.state.services.availableServices.webCDN
    },
    cloudSafe() {
      return this.$store.state.services.availableServices.cloudSafe
    },
    taichiDDos() {
      return this.$store.state.services.availableServices.taichiDDos
    },
    haveBasicApply() {
      if (!this.basicApply.serviceList.length) {
        return false
      } else {
        return true
      }
    },
    haveWebCDN() {
      if (!this.webCDN.serviceList.length) {
        return false
      } else {
        return true
      }
    },
    haveCloudSafe() {
      if (!this.cloudSafe.serviceList.length) {
        return false
      } else {
        return true
      }
    },
    haveTaichiDDos() {
      if (!this.taichiDDos.serviceList.length) {
        return false
      } else {
        return true
      }
    },
    haveService() {
      if (this.haveBasicApply || this.haveWebCDN || this.haveCloudSafe || this.haveTaichiDDos) {
        return true
      } else {
        return false
      }
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.text-info {
  color: var(--primary-blue);
}

.wrapper {
  padding: 15px 20px;
}

.title {
  margin-bottom: 20px;
}

.service-box {
  position: relative;
  padding-left: 10px;
  padding-right: 15px;
  font-size: 12px;
  line-height: 40px;
  border-left: 2px solid transparent;
  i {
    display: inline-block;
    margin-left: -4px;
    height: 24px;
    width: 24px;
    vertical-align: middle;
  }
  i:before {
    position: absolute;
    top: 2px;
    left: -8px;
    display: inline-block;
    font-family: 'iconfont' !important;
    font-style: normal;
    font-size: 40px;
  }
  .subtitle {
    display: inline-block;
    width: 5em;
    vertical-align: middle;
  }
  a {
    display: none;
    cursor: pointer;
  }
  a:before {
    content: '';
    display: inline-block;
    margin: 0 15px;
    width: 1px;
    height: 20px;
    background-color: #e6e6e6;
    vertical-align: middle;
  }
  .details {
    float: right;
    text-align: right;
  }
  .num {
    font-size: 14px;
    color: var(--primary-blue);
  }
}

.icon-cloudCalc:before,
.icon-cloudDns:before,
.icon-cloudMonitor:before,
.icon-sslCa:before,
.icon-replaceMirror:before {
  color: var(--primary-blue);
}

.icon-shieldEye:before {
  color: #3b6100;
}

.icon-hwws:before {
  color: #ff4200;
}

.icon-webCdn:before {
  color: #5ec8ff;
}

.icon-tjkdweb:before,
.icon-tjkdPlus:before,
.icon-tjkdDns:before,
.icon-tjkdApp:before {
  color: #3600ff;
}

.wrapper:hover {
  border-color: var(--primary-blue);
}

.service-box:hover {
  background: #eeeeee;
  border-left-color: var(--primary-blue);
  i {
  }
  a {
    display: inline;
  }
}
.basicApply:hover {
  border-left-color: var(--primary-blue);
}
.hwws:hover {
  border-left-color: #ff4200;
}
.shieldEye:hover {
  border-left-color: #3b6100;
}
.webCDN:hover {
  border-left-color: #5ec8ff;
}
.taichiDDos:hover {
  border-left-color: #3600ff;
}
</style>
