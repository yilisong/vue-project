<template lang="html">
<div class="">
  <div class="product-container">
    <h2>新一代云加速&amp;云安全</h2>
    <ul class="product-nav">
      <li v-bind:class="{'product-active':product.application}" @click="switchType('application')" id="application">
        <div class="product-icon-application">

        </div>
        <p>基础应用</p>
      </li>
      <li v-bind:class="{'product-active':product.speed}" @click="switchType('speed')" id="speed">
        <div class="product-icon-speed">

        </div>
        <p>性能加速</p>
      </li>
      <li v-bind:class="{'product-active':product.defense}" @click="switchType('defense')" id="defense">
        <div class="product-icon-DDoS">

        </div>
        <p>太极抗D</p>
      </li>
      <li v-bind:class="{'product-active':product.safe}" @click="switchType('safe')" id="safe">
        <div class="product-icon-safe">

        </div>
        <p>云安全</p>
      </li>
    </ul>
  </div>
  <div class="product-content-container">
    <i id="triangle" class="little-angle"></i>
    <!-- <ul class="product-container"> -->
    <transition-group name="fade" tag="ul" class="product-container">
      <li key="application" v-show="product.application">
        <div class="product-block">
          <h4>基础云计算</h4>
          <p>安全、稳定公有云及私有云计算服务</p>
          <a href="/cloud-host" target="_blank">了解详情</a>
        </div>
        <div class="product-block">
          <h4>云解析</h4>
          <p>高性能、高安全、高稳定的DNS解析服务</p>
          <a href="/cloud-resolving" target="_blank">了解详情</a>
        </div>
        <div class="product-block">
          <h4>云监控</h4>
          <p>宕机智能监控，解析联动切换</p>
          <a href="/cloud-monitor" target="_blank">了解详情</a>
        </div>
        <div class="product-block">
          <h4>SSL证书管理</h4>
          <p>支持HTTPS和Keyless SSL服务</p>
          <a href="/ssl-certificate" target="_blank">了解详情</a>
        </div>
        <div class="product-block">
          <h4>替身镜像</h4>
          <p>多样的备份方式，灵活的替身访问控制</p>
          <a href="/double-mirror" target="_blank">了解详情</a>
        </div>
      </li>
      <li key="speed" v-show="product.speed">
        <div class="speed-state">
          <h3>云加速</h3>
          <div class="details">
            <p>专业面向WEB应用的高性能加速产品</p>
            <hr>
            <ul>
              <li>
                <h4>页面加速</h4>
                <p>有效地提升网站访问速度和用户体验</p>
              </li>
              <li>
                <h4>下载加速</h4>
                <p>支持音视频资源、游戏包、软件等高带宽资源下载加速</p>
              </li>
              <li>
                <h4>视频点播加速</h4>
                <p>提供流畅、稳定的端到端的一站式视频加速解决方案</p>
              </li>
              <li class="https-speed">
                <h4>HTTPS加速</h4>
                <p>网站同时具备SSL的安全性和CDN的高性能</p>
              </li>
            </ul>
            <div class="btn-box">
              <a href="/cloud-speed" target="_blank">了解详情</a>
            </div>
          </div>
        </div>
      </li>
      <li key="defense" v-show="product.defense">
        <div class="product-block">
          <h4>WEB版</h4>
          <p>基于共享高防IP资源的高性价比抗D服务</p>
          <a href="/taichiddosWeb" target="_blank">立即购买</a>
        </div>
        <div class="product-block">
          <h4>PLUS版</h4>
          <p>高防独享线路，支持全业务抗D场景</p>
          <a href="/taichiddosPlus" target="_blank">了解详情</a>
        </div>
        <div class="product-block">
          <h4>DNS版</h4>
          <p>亿级QPS，让DNS解析服务坚不可摧</p>
          <a href="/taichiddosDns" target="_blank">了解详情</a>
        </div>
        <div class="product-block">
          <h4>APP版</h4>
          <p>下一代创新性端联动抗D解决方案</p>
          <a href="/taichiddosApp" target="_blank">了解详情</a>
        </div>
      </li>
      <li key="safe" v-show="product.safe">
        <div class="product-block">
          <h4>红网卫士（云WAF）</h4>
          <p>新一代企业级云WAF产品</p>
          <a href="/red-guard" target="_blank">了解详情</a>
        </div>
        <div class="product-block">
          <h4>盾眼（风险观测）</h4>
          <p>漏洞扫描、篡改监控、内容观测</p>
          <a href="/risk-detect" target="_blank">了解详情</a>
        </div>
        <div class="product-block">
          <h4>观星风控</h4>
          <p>数据风控、业务风控</p>
          <a href="/stargaze" target="_blank">了解详情</a>
        </div>
        <div class="product-block">
          <h4>服卫士（主机防火墙）</h4>
          <p>底层驱动防护，服务器主机卫士</p>
          <a href="/server-guard" target="_blank">下载</a>
        </div>
      </li>
    </transition-group>
    <!-- </ul> -->
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        application: true,
        speed: false,
        defense: false,
        safe: false
      }
    }
  },
  mounted() {
    this.switchType('application')
  },
  methods: {
    switchType(type) {
      for (const i in this.product) {
        this.product[i] = i === type
      }
      const name = document.getElementById(type)
      const triangle = document.getElementById('triangle')
      const rect = name.getBoundingClientRect()
      const left = rect.left
      const half = (rect.width) / 2
      const distance = half + left - 8
      triangle.style.left = distance + 'px'
    }
  }
}
</script>

<style lang="css" scoped>
@import "../index-common.css";
.product-nav li {
  width: 24.5%;
  display: inline-block;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.product-nav li+li {
  margin-left: -4px;
}

.product-nav li div {
  margin: 0 auto;
}

.product-nav li p {
  padding-top: 10px;
  font-size: 16px;
}

.product-nav li::before,
.product-nav li::after {
  content: "";
  display: block;
  width: 35.4%;
  height: 1px;
  background: #e6e6e6;
}

.product-nav li::before {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
}

.product-nav li::after {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
}

.product-nav .product-active::before,
.product-nav .product-active::after {
  background: #2d90e6;
  transition: all .5s;
}

.product-icon-speed,
.product-icon-DDoS,
.product-icon-safe,
.product-icon-application {
  width: 86px;
  height: 77px;
  background-size: 86px 154px;
  background-position: 0 0;
}

.product-active .product-icon-application,
.product-active .product-icon-speed,
.product-active .product-icon-DDoS,
.product-active .product-icon-safe {
  background-position: 86px 77px;
}

.product-icon-application,
.product-active .product-icon-application {
  background-image: url('../assets/images/index-products/application.svg');
}

.product-icon-speed,
.product-active .product-icon-speed {
  background-image: url('../assets/images/index-products/speed.svg');
}

.product-icon-DDoS,
.product-active .product-icon-DDoS {
  background-image: url('../assets/images/index-products/tjkd.svg');
}

.product-icon-safe,
.product-active .product-icon-safe {
  background-image: url('../assets/images/index-products/safe.svg');
}

.product-content-container {
  margin-top: 24px;
  padding: 30px 0;
  background: #f2f2f4;
  min-height: 280px;
  position: relative;
}

.little-angle {
  position: absolute;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid #f2f2f4;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  position: absolute;
  top: -15px;
  transition: left .3s linear;
}

.product-content-container ul {
  text-align: left;
  position: relative;
}

.product-content-container ul li {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.product-content-container .product-block {
  width: 33%;
  box-sizing: border-box;
  height: 135px;
  display: inline-block;
  vertical-align: top;
  padding: 18px 13px;
  margin-bottom: 20px;
}

.product-content-container .product-block h4 {
  color: #000;
}

.product-content-container .product-block p {
  padding: 12px 0 15px 0;
  height: 23px;
  font-size: 12px;
}

.product-content-container .product-block a,
.speed-state .details a {
  padding: 8px 18px;
  color: #333;
  border: 1px solid #cdcdcd;
  background: #f3f3f5;
  font-size: 12px;
}

.product-content-container .product-block:hover {
  background: #fff;
  transition: all .5s;
}

.product-content-container .product-block:hover a,
.speed-state:hover .details a {
  background: #fff;
  border-color: #2d90e6;
}

.speed-state {
  padding: 20px 20px 28px;
  margin-top: -10px;
  h3,
  .details {
    display: inline-block;
    vertical-align: top;
  }
  h3 {
    font-weight: 100;
  }
  .details {
    padding-left: 15px;
    width: 90%;
    P {
      font-size: 15px;
    }
    hr {
      background: #D6D6D6;
      margin-top: 25px;
    }
    ul li {
      width: 33%;
      display: inline-block;
      position: static;
      h4 {
        padding: 16px 0 12px 0;
        color: #333;
      }
      p {
        color: dimgray;
        font-size: 12px;
      }
    }
    .btn-box {
      margin-top: 60px;
      text-align: center;
    }
  }
}

.speed-state:hover {
  background: #fff;
  transition: all .5s;
}

.https-speed {
  margin-top: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>
