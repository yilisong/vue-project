/* eslint-disable */
<template lang="html">
<div class="map-bg" id="mapContainer">
  <div class="map-outer">
    <div class="map-container">
      <img src="../assets/images/index-map/map.png" alt="" class="map-content">
      <div class="dot-container-small dot-position-1">
        <span class="map-dot-small"></span>
        <div class="map-circle-first">
        </div>
        <div class="map-circle-second">
        </div>
        <div class="map-circle-third">
        </div>
      </div>
      <div class="dot-container-small dot-position-2">
        <span class="map-dot-small"></span>
        <div class="map-circle-first">
        </div>
        <div class="map-circle-second">
        </div>
        <div class="map-circle-third">
        </div>
      </div>
      <div class="dot-container-middle dot-position-3">
        <span class="map-dot-large"></span>
        <div class="map-circle-first">
        </div>
        <div class="map-circle-second">
        </div>
      </div>
      <div class="dot-container-small dot-position-4">
        <span class="map-dot-middle"></span>
        <div class="map-circle-first">
        </div>
      </div>
      <div class="dot-container-small dot-position-5">
        <span class="map-dot-small"></span>
        <div class="map-circle-first">
        </div>
        <div class="map-circle-second">
        </div>
        <div class="map-circle-third">
        </div>
      </div>
      <div class="dot-container-middle dot-position-6">
        <span class="map-dot-middle"></span>
      </div>
      <div class="dot-container-small dot-position-7">
        <span class="map-dot-middle"></span>
        <div class="map-circle-first">
        </div>
      </div>
      <div class="dot-container-small dot-position-8">
        <span class="map-dot-middle"></span>
      </div>
      <div class="dot-container-small dot-position-9">
        <span class="map-dot-middle"></span>
        <div class="map-circle-first">
        </div>
        <div class="map-circle-second">
        </div>
        <div class="map-circle-third">
        </div>
      </div>
      <div class="dot-container-small dot-position-10">
        <span class="map-dot-middle"></span>
        <div class="map-circle-first">
        </div>
      </div>
      <div class="dot-container-small dot-position-11">
        <span class="map-dot-large"></span>
        <div class="map-circle-first">
        </div>
        <div class="map-circle-third">
        </div>
      </div>
      <div class="dot-container-small dot-position-12">
        <span class="map-dot-middle"></span>
      </div>
      <div class="dot-container-small dot-position-13">
        <span class="map-dot-middle"></span>
      </div>
      <div class="dot-container-small dot-position-14">
        <span class="map-dot-middle"></span>
      </div>
      <div class="dot-container-small dot-position-15">
        <span class="map-dot-middle"></span>
        <div class="map-circle-first">
        </div>
        <div class="map-circle-second">
        </div>
      </div>
      <div class="dot-container-small dot-position-16">
        <span class="map-dot-middle"></span>
        <div class="map-circle-first">
        </div>
        <div class="map-circle-second">
        </div>
      </div>
      <div class="dot-container-small dot-position-17">
        <span class="map-dot-middle"></span>
        <div class="map-circle-first">
        </div>
        <div class="map-circle-second">
        </div>
        <div class="map-circle-third">
        </div>
      </div>
      <div class="dot-container-small dot-position-18">
        <span class="map-dot-middle"></span>
      </div>
      <div class="dot-container-small dot-position-19">
        <span class="map-dot-middle"></span>
        <div class="map-circle-first">
        </div>
      </div>
      <div class="dot-container-small dot-position-20">
        <span class="map-dot-middle"></span>
        <div class="map-circle-first">
        </div>
        <div class="map-circle-second">
        </div>
        <div class="map-circle-third">
        </div>
      </div>
      <div class="dot-container-small dot-position-21">
        <span class="map-dot-middle"></span>
      </div>
      <div class="dot-container-small dot-position-22">
        <span class="map-dot-middle"></span>
        <div class="map-circle-first">
        </div>
      </div>
      <div class="dot-container-small dot-position-23">
        <span class="map-dot-small"></span>
      </div>
      <div class="dot-container-small dot-position-24">
        <span class="map-dot-small"></span>
        <div class="map-circle-first">
        </div>
        <div class="map-circle-second">
        </div>
        <div class="map-circle-third">
        </div>
      </div>
    </div>
  </div>
  <div class="map-title">
    <h2>安全洞见 全网感知</h2>
    <!-- <h4>Security Insight &amp; Network Perception</h4> -->
  </div>
  <div class="count-container">
    <a class="data-container" href="http://ssa.yundun.com/cc" target="_blank">
      <div>
        <span>今日CC攻击次数</span>
        <div class="testSome">
          <span class="">{{this.attack.cc}}</span>
        </div>
      </div>
    </a>
    <a class="data-container" href="http://ssa.yundun.com/waf" target="_blank">
      <div>
        <span>今日WAF攻击次数</span>
        <div class="testSome">
          <span class="">{{this.attack.waf}}</span>
        </div>
      </div>
    </a>
    <a class="data-container" href="http://ssa.yundun.com/ddos" target="_blank">
      <div>
        <span>今日DDOS攻击峰值（Mbps）</span>
        <div class="testSome">
          <span class="">{{this.attack.ddos}}</span>
        </div>
      </div>
    </a>

  </div>
</div>
</template>

<script>
import TWEEN from 'tween.js'
// import SourceWebResource from '../resource/SourceWebResource'
import {
  NORMAL_API
} from 'common/config/interceptor'
export default {
  props: ['cc', 'waf', 'ddos', 'currentHeight'],
  data() {
    return {
      isAnimated: false,
      trueData: this.attackData,
      attack: {
        cc: 0,
        waf: 0,
        ddos: 0
      },
      animateCC: 0,
      animateWaf: 0,
      animateDDos: 0,
      dataSave: {
        cc: 0,
        waf: 0,
        ddos: 0
      }
    }
  },
  watch: {
    currentHeight(newVaule) {
      if (newVaule >= 2300 && newVaule <= 2800 && !this.isAnimated) {
        this.animateCC = this.attack.cc
        this.animateDDos = this.attack.ddos
        this.animateWaf = this.attack.waf
        this.isAnimated = true
      }
    },
    waf(newVaule, oldValue) {
      for (const i in this.attack)
        this.attack[i] = Math.floor(parseInt(this[i], 0))
      for (const i in this.dataSave)
        this.dataSave[i] = Math.floor(parseInt(this[i], 0))
    },
    animateCC(newVaule, oldValue) {
      const vm = this

      new TWEEN.Tween({
          tweeningNumber: 0
        })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({
          tweeningNumber: vm.dataSave.cc
        }, 500)
        .onUpdate(function() {
          vm.attack.cc = this.tweeningNumber.toFixed(0)
        })
        .start()
      vm.animate()
    },
    animateWaf(newVaule, oldValue) {
      const vm = this

      new TWEEN.Tween({
          tweeningNumber: 0
        })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({
          tweeningNumber: vm.dataSave.waf
        }, 500)
        .onUpdate(function() {
          vm.attack.waf = this.tweeningNumber.toFixed(0)
        })
        .start()
      vm.animate()
    },
    animateDDos(newVaule, oldValue) {
      const vm = this

      new TWEEN.Tween({
          tweeningNumber: 0
        })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({
          tweeningNumber: vm.dataSave.ddos
        }, 500)
        .onUpdate(function() {
          vm.attack.ddos = this.tweeningNumber.toFixed(0)
        })
        .start()
      vm.animate()
    }
  },
  mounted() {

  },
  methods: {
    unbind() {
      if (window.removeEventListerner) { // 标准浏览器
        return function(elem, type, handler) {
          elem.removeEventListerner(type, handler, false)
        }
      } else if (window.detachEvent) { // IE浏览器
        return function(elem, type, handler) {
          elem.detachEvent('on' + type, handler)
        }
      }
    },
    getScrollTop() {
      let scrollTop = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        scrollTop = document.body.scrollTop
      }
      return scrollTop
    },
    animate() {
      if (TWEEN.update()) {
        requestAnimationFrame(this.animate)
      }
    },
    scrollSmooth() {
      const currentScroll = this.getScrollTop()
      if (currentScroll > 0) {
        window.requestAnimationFrame(this.scrollSmooth)
        window.scrollTo(0, currentScroll - (currentScroll / 5))
      }
    },
    throttle(func, delay) { //简单节流 用于onscroll事件
      let last = 0
      return function() {
        const curr = +new Date()
        if (curr - last > delay) {
          func.apply(this)
          last = curr
        }
      }
    }
  }
}
</script>

<style lang="css" scoped="">
@import "../index-common.css";
.map-bg {
  position: relative;
  background: url('../assets/images/index-map/map_bg.jpg')center center repeat-x;
  height: 710px;
}

.map-outer {
  min-width: 1000px;
  max-width: 1200px;
  margin: 0 auto;
}

.map-container {
  width: 100%;
}

.map-container img {
  margin-top: 93px;
  width: 100%;
}

.map-title {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 80px;
  color: #fff;
}

.map-title h2 {
  font-size: 32px;
  padding-bottom: 16px;
}

.map-title h4 {
  font-size: 16px;
}

.map-bg .count-container {
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
}

.map-bg .data-container {
  padding: 22px 10px;
  display: inline-block;
  vertical-align: top;
  width: 280px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, .3);
  text-align: center;
  color: #fff;
  transform: perspective(1px) translateZ(0);
  transition-duration: 0.5s;
  transition-property: transform;
}

.map-bg .data-container:hover {
  border: 1px solid #2d90e6;
  box-shadow: 0 10px 15px rgba(0, 0, 0, .2);
  transform: translateY(-5px);
}

.map-bg .data-container+.data-container {
  margin-left: 15px;
}

.map-bg .data-container div span {
  font-size: 16px;
}

.map-bg .data-container .testSome {
  padding: 10px;
  span {
    font-size: 42px;
  }
}


/*.map-bg .data-container+.data-container {
  margin-top: 10px;
}*/

.map-container {
  position: relative;
}

.dot-container-small {
  width: 40px;
  height: 40px;
}

.dot-container-middle {
  width: 80px;
  height: 80px;
}

.dot-position-1 {
  position: absolute;
  top: 40.6%;
  left: 5%;
}

.dot-position-2 {
  position: absolute;
  top: 47.7%;
  left: 47.3%;
}

.dot-position-3 {
  position: absolute;
  top: 44%;
  left: 37.5%;
}

.dot-position-4 {
  position: absolute;
  top: 51%;
  left: 41.6%;
}

.dot-position-5 {
  position: absolute;
  top: 52.5%;
  left: 40.5%;
}

.dot-position-6 {
  position: absolute;
  top: 51.8%;
  left: 39.3%;
}

.dot-position-7 {
  position: absolute;
  top: 51.8%;
  left: 35.3%;
}

.dot-position-8 {
  position: absolute;
  top: 61.5%;
  left: 37.4%;
}

.dot-position-9 {
  position: absolute;
  top: 48%;
  left: 22%;
}

.dot-position-10 {
  position: absolute;
  top: 54.6%;
  left: 17%;
}

.dot-position-11 {
  position: absolute;
  top: 31%;
  left: 25%;
}

.dot-position-12 {
  position: absolute;
  top: 38%;
  left: 13%;
}

.dot-position-13 {
  position: absolute;
  top: 34%;
  left: 9%;
}

.dot-position-14 {
  position: absolute;
  top: 42.6%;
  left: 6.5%;
}

.dot-position-15 {
  position: absolute;
  top: 52.6%;
  left: 6.5%;
}

.dot-position-16 {
  position: absolute;
  bottom: 7.5%;
  left: 51.5%;
}

.dot-position-17 {
  position: absolute;
  top: 29.5%;
  right: 20.5%;
}

.dot-position-18 {
  position: absolute;
  right: 24%;
  top: 32%;
}

.dot-position-19 {
  position: absolute;
  right: 16.6%;
  top: 46.9%;
}

.dot-position-20 {
  position: absolute;
  right: 18.3%;
  top: 48%;
}

.dot-position-21 {
  position: absolute;
  right: 29.9%;
  top: 46.6%;
}

.dot-position-22 {
  position: absolute;
  right: 29%;
  top: 48.1%;
}

.dot-position-23 {
  position: absolute;
  right: 19%;
  top: 64%;
}

.dot-position-24 {
  position: absolute;
  right: 9.5%;
  bottom: 5.5%;
}

.map-dot-small,
.map-dot-middle,
.map-dot-large {
  border-radius: 50%;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.map-dot-small {
  width: 8px;
  height: 8px;
}

.map-dot-middle {
  width: 11px;
  height: 11px;
}

.map-dot-large {
  width: 20px;
  height: 20px;
}

@keyframes ripple {
  0% {
    opacity: 0.5;
    transform: scale(0.1, 0.1);
  }
  5% {
    opacity: 1;
  }
  100% {
    transform: scale(1.0);
  }
}

.map-circle-first,
.map-circle-second,
.map-circle-third {
  width: 100%;
  height: 100%;
}

.map-circle-first::after,
.map-circle-second::after,
.map-circle-third::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  border: 2px solid #fff;
  opacity: 0;
}

.map-circle-first::after {
  animation: ripple 3.5s ease-out 225ms infinite;
}

.map-circle-second::after {
  animation: ripple 3.5s ease-out .9s infinite;
}

.map-circle-third::after {
  animation: ripple 3.5s ease-out 1.8s infinite;
}
</style>
