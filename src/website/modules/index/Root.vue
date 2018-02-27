<template lang="html">
<div class="index-out-container">
  <!-- <ADbar /> -->
  <website-layout :buttonShow="buttonShow">
    <TopButton :currentHeight="buttonCurrent" />
    <Banner />
    <Product />
    <Service />
    <div class="character-data">
      <p>今日解析次数：<span>{{todayData.dns}}</span> 次</p>
      <p>今日加速流量：<span>{{todayData.speedflow}}</span> MB</p>
      <p>今日请求次数：<span>{{todayData.nginx}}</span> 次</p>
    </div>
    <Solution />
    <MapPic :cc="attack.cc" :waf="attack.waf" :ddos="attack.ddos" :currentHeight="mapCurrent" />
    <Cases />
    <YundunBar />
  </website-layout>
</div>
</template>

<script>
import TopButton from 'common/components/TopButton/TopButton'
import SourceWebResource from './resource/SourceWebResource'
import websiteLayout from 'common/components/layout/website-layout'
import Product from './components/Product'
import Solution from './components/Solution'
import Banner from './components/Banner'
import Service from './components/Service'
import MapPic from './components/MapPic'
import Cases from './components/Cases'
import YundunBar from '../../components/YundunBar'
import ADbar from 'common/components/Inform/ADbar'
import TWEEN from 'tween.js'
export default {
  metaInfo: {
    title: '上海云盾（YUNDUN）-智慧云安全服务商',
    meta: [{
        vmid: 'description',
        name: 'description',
        content: 'YUNDUN—智慧云安全服务商云WAF、DDoS云清洗、T级防C抗D、高防智能DNS、防黑客入侵篡改、防挂马、防漏洞、CDN网站加速'
      },
      {
        vmid: 'keywords',
        name: 'keywords',
        content: 'DDoS防火墙,DDoS防御,防CC攻击,防DDoS攻击,CDN,网站加速,CDN加速,DNS,智能DNS,高防DNS,网站防火墙,防SQL注入,网页防篡改,云WAF,网站安全,网站防护,云盾'
      }
    ]
  },
  mounted() {
    const self = this
    SourceWebResource.getAttack().then(response => {
      for (const i in self.todayData) {
        self.todayData[i] = self.assemble(',', self.splitVal(String(response.data.data[i])))
      }
      for (const i in self.attack) {
        self.attack[i] = response.data.data[i]
      }
    })
    window.onscroll = self.throttle(function() {
      const current = this.pageYOffset
      this.now = current
      self.buttonCurrent = current
      if (this.pre <= this.now) {
        self.mapCurrent = current
      }
      setTimeout(function() {
        this.pre = this.now
      }, 0)
    }, 200)
  },
  data() {
    return {
      buttonShow: false,
      scrollBtn: false,
      switchBar: false,
      buttonCurrent: 0,
      mapCurrent: 0,
      attack: {
        cc: '',
        waf: '',
        ddos: ''
      },
      todayData: {
        dns: '',
        nginx: '',
        speedflow: ''
      }
    }
  },
  methods: {
    switchType(type) {
      for (const i in this.product) {
        this.product[i] = i === type
      }
    },
    assemble(symbol, data) {
      let value = ''
      if (Array.isArray(data)) {
        const last = data.length - 1
        data.forEach((item, index) => {
          if (index === last) symbol = ''
          value = value + item + symbol
        })
      } else {
        value = null
      }
      return value
    },
    splitVal(value, num) {
      const val = value
      const _num = num || 3
      const valArr = []
      let splitNum = ''
      if (val && typeof val === 'string') {
        const valLen = val.length
        const count = Math.floor(valLen / _num)
        for (let i = 0; i <= count; i++) {
          if (i !== count) {
            splitNum = val.slice(valLen - (i + 1) * _num, valLen - i * _num)
            valArr.push(splitNum)
          } else {
            splitNum = val.slice(0, valLen - i * _num)
            if (splitNum) {
              valArr.push(splitNum)
            }
          }
        }
        valArr.reverse()
        return valArr
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
  },
  components: {
    TopButton,
    websiteLayout,
    Product,
    Solution,
    Banner,
    Service,
    MapPic,
    Cases,
    YundunBar,
    ADbar
  }
}
</script>

<style lang="css">
@import './index-animation.css';
.nav-bar {
  position: absolute!important;
  background: rgba(0, 0, 0, .5)!important;
  border: none!important;
}

.nav-bar:hover {
  background: rgba(0, 0, 0, .9)!important;
  transition: all .5s!important;
}

.index-out-container {
  overflow-x: hidden;
}

.website-suit-index {
  position: relative;
}

.character-data {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background: url('./assets/images/blue_bar.jpg')center center no-repeat;
  background-size: cover;
}

.character-data p {
  display: inline-block;
  color: #fff;
  font-size: 16px;
}

.character-data p+p {
  padding-left: 120px;
}

.character-data p span {
  font-size: 25px;
}

</style><style scoped>#root {
  position: relative;
}

</style><style media="screen" scoped>#root {
  overflow-x: hidden;
}
</style>
