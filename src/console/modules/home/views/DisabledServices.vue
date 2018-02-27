<template lang="html">
<div class="content-padding base-border" v-if="haveService">
  <div class="title">
    未开通服务
  </div>
  <row :gutter="20" v-if="haveBasicApply">
    <col :span="24" class="title">
      {{ basicApply.title }}
    </col>
    <col :lg="8" :md="12" class="service-box basicApply" v-for="(item,index) in basicApply.serviceList" :key="index">
      <div class="disservice-box base-border">
        <i :class="'icon-'+item.name"></i>
        <template v-if="item.name === 'cloudDns'">
          <div>云解析</div>
          <div class="describe">不限域名数量的安全、智能DNS解析服务</div>
          <a class="details" href="/cloud-resolving">详情</a>
          <a class="enable" href="/console/cloud-resolving">立即开通</a>
        </template>
        <template v-else-if="item.name === 'cloudMonitor'">
          <div>云监控</div>
          <div class="describe">为应用系统提供全生命周期服务可用性闭环监控</div>
          <a class="details" href="/cloud-monitor">详情</a>
          <a class="enable" href="/console/cloud-monitor">立即开通</a>
        </template>
        <template v-else-if="item.name === 'cloudCalc'">
          <div>基础云计算</div>
          <div class="describe">全SSD高性能云服务器和iDC基础资源服务 </div>
          <a class="details" href="/cloud-host">详情</a>
          <a class="enable" href="http://cloud.yundun.com/vhost.html">立即开通</a>
        </template>
        <template v-else-if="item.name === 'sslCa'">
          <div>SSL证书</div>
          <div class="describe">提供YUNDUN免费SSL证书，支持自有证书云端批量管理</div>
          <a class="details" href="/ssl-certificate">详情</a>
          <a class="enable" href="/console/ssl-certificate">立即开通</a>
        </template>
        <template v-else>
          <div>替身镜像</div>
          <div class="describe">应用系统页面内容安全备份服务</div>
          <a class="details" href="/double-mirror">详情</a>
          <a class="enable" href="/console/double-mirror">立即开通</a>
        </template>
      </div>
    </col>
  </row>
  <row :gutter="20" v-if="haveWebCDN">
    <col :span="24" class="title">
      {{ webCDN.title }}
    </col>
    <col :lg="8" :md="12" class="service-box webCDN" v-for="(item,index) in webCDN.serviceList" :key="index">
      <div class="disservice-box base-border">
        <i :class="'icon-'+item.name"></i>
        <template v-if="item.name === 'webCdn'">
          <div>云加速</div>
          <div class="describe">专业的WEB和移动端政企级CDN加速服务</div>
          <a class="details" href="/cloud-speed">详情</a>
          <a class="enable" href="/console/cloud-speed">立即开通</a>
        </template>
      </div>
    </col>
  </row>
  <row :gutter="20" v-if="haveCloudSafe">
    <col :span="24" class="title">
      {{ cloudSafe.title }}
    </col>
    <col :lg="8" :md="12" class="service-box cloudSafe" v-for="(item,index) in cloudSafe.serviceList" :key="index">
      <div class="disservice-box base-border">
        <i :class="'icon-'+item.name"></i>
        <template v-if="item.name === 'hwws'">
          <div>红网卫士</div>
          <div class="describe">红网卫士是面向政企客户推出的AI云WAF产品 </div>
          <a class="details" href="/red-guard">详情</a>
          <a class="enable" @click="openQQ">立即开通</a>
        </template>
        <template v-else-if="item.name === 'observeStar'">
          <div>观星风控</div>
          <div class="describe">数据风控、业务风控</div>
          <a class="details" href="/stargaze">详情</a>
          <a class="enable" @click="openQQ">立即开通</a>
        </template>
        <template v-else="item.name === 'shieldEye'">
          <div>盾眼</div>
          <div class="describe">漏洞扫描、篡改监控、内容观测 </div>
          <a class="details" href="/risk-detect">详情</a>
          <a class="enable" href="/console/shield-eye">立即开通</a>
        </template>
      </div>
    </col>
  </row>
  <row :gutter="20" v-if="haveTaichiDDos">
    <col :span="24" class="title">
      {{ taichiDDos.title }}
    </col>
    <col :lg="8" :md="12" class="service-box taichiDDos" v-for="(item,index) in taichiDDos.serviceList" :key="index">
      <div class="disservice-box base-border">
        <i :class="'icon-'+item.name"></i>
        <template v-if="item.name === 'tjkdweb'">
          <div>太极抗D-WEB版</div>
          <div class="describe">基于高防共享IP资源，为网站类应用提供全方位抗DDoS服务</div>
          <a class="details" href="/taichiddosWeb">详情</a>
          <a class="enable" href="/payment#/setting-taichi-ddos">立即开通</a>
        </template>
        <template v-else-if="item.name === 'tjkdPlus'">
          <div>太极抗D-PLUS版</div>
          <div class="describe">支持全业务抗D场景，致力于解决超大规模DDoS攻击</div>
          <a class="details" href="/taichiddosPlus">详情</a>
          <a class="enable" @click="openQQ">立即开通</a>
        </template>
        <template v-else-if="item.name === 'tjkdDns'">
          <div>太极抗D-DNS版</div>
          <div class="describe">亿级QPS，让DNS解析服务坚不可摧</div>
          <a class="details" href="/taichiddosDns">详情</a>
          <a class="enable" @click="openQQ">立即开通</a>
        </template>
        <template v-else="item.name === 'tjkdApp'">
          <div>太极抗D-APP版</div>
          <div class="describe">为移动端、PC端应用提供一站式安全解决方案</div>
          <a class="details" href="/taichiddosApp">详情</a>
          <a class="enable" @click="openQQ">立即开通</a>
        </template>
      </div>
    </col>
  </row>
</div>
</template>

<script>
import '../assets/styles/icon-backname.css'
import Help from 'common/utils/help'
import SourceOverviewResource from 'home/resource/SourceOverviewResource'
import SourceCloudResource from 'home/resource/SourceOverviewResource'

export default {
  name: 'DisabledServices',
  computed: {
    basicApply() {
      return this.$store.state.services.disabledServiceList.basicApply
    },
    webCDN() {
      return this.$store.state.services.disabledServiceList.webCDN
    },
    cloudSafe() {
      return this.$store.state.services.disabledServiceList.cloudSafe
    },
    taichiDDos() {
      return this.$store.state.services.disabledServiceList.taichiDDos
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
  methods: {
    openQQ() {
      Help.linkService()
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.title {
  margin-bottom: 20px;
}

.disservice-box {
  position: relative;
  padding: 15px 30px 15px 55px;
  i:before {
    position: absolute;
    top: 50%;
    left: -5px;
    margin-top: -23px;
    display: inline-block;
    font-family: 'iconfont' !important;
    font-style: normal;
    font-size: 40px;
    color: #666;
  }
  .describe {
    min-height: 40px;
    font-size: 12px;
    line-height: 20px;
    color: var(--disabled-border-color);
  }
  .details {
    position: absolute;
    top: 50%;
    margin-top: -8px;
    right: 10px;
    color: var(--disabled-border-color);
    cursor: pointer;
  }
  .enable {
    display: inline-block;
    margin-top: 5px;
    width: 82px;
    height: 23px;
    text-align: center;
    font-size: 12px;
    line-height: 25px;
    color: #333;
    border: 1px solid var(--disabled-border-color);
    border-radius: 2px;
    cursor: pointer;
  }
}

.disservice-box:before {
  position: absolute;
  content: '';
  width: 40px;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #e6e6e6;
}

.disservice-box:hover {
  border-color: var(--primary-blue);
  .details {
    color: #2d90e6;
  }
  i:before {
    color: var(--white);
  }
  .enable {
    border-color: var(--primary-blue);
  }
}

.disservice-box:hover:before {
  background-color: var(--primary-blue)
}
</style>
