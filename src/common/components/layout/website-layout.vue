<template>
<div class="website-suit-index">
  <header class="nav-bar" :class="{
    'navbar-black': blackHeader,
    'navbar-default': !blackHeader
   }" id="nav-bar">
    <div class="nav-bar-inner clearfix">
      <div class="nav-content">
        <a href="/">
          <!-- <img src="../../assets/images/logo_yundun.svg" class="logo-size" alt=""> -->
        </a>
      </div>
      <div class="nav-content nav-right">
        <ul class="menu mark-menu">
          <!-- <li class="bottom-line"></li> -->
          <!-- <li ref="li">
            <a href="/" v-bind:class="{active:activeData[0]}">首页</a>
          </li>
          <li @mouseenter="dropDown($event,'product')" @mouseleave="isShow('product',$event)">
            <a href="#" v-bind:class="{active:activeData[1]}">产品&amp;服务</a>
          </li>
          <li @mouseenter="dropDown($event,'scheme')" @mouseleave="isShow('scheme',$event)">
            <a href="#" v-bind:class="{active:activeData[2]}">解决方案</a>
          </li> -->
          <!-- <li>
            <a href="/help" v-bind:class="{active:activeData[3]}">帮助文档</a>
          </li> -->
          <!-- <li>
            <a href="/about" v-bind:class="{active:activeData[4]}">关于</a>
          </li> -->
        </ul>
        <div class="view-placeholder">
          <ul class="page login-switch" v-if="isLogin===false">
            <li><a class="register" href="/register">注册</a></li>
            <li><a class="login" href="/login">登录</a></li>
          </ul>
          <ul class="page user-login-info" v-else>
            <li class="console-style">
              <a :href="consoleHref">控制台</a>
            </li>
            <li class="isLogin-container" @mouseenter="dropShow=true" @mouseleave="dropShow=false"><a :href="consoleHref" class="fitName">{{userName}}</a>
              <ul class="isLogin-box" v-show="dropShow">
                <!-- <li><a href="/console/user-center#/">用户中心</a></li> -->
                <!-- <li><a href="/console/user-center#/basicinfo">用户中心</a></li> -->
                <li @click="logOut">退出</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div class="" v-show="index.product.content||index.scheme.content">
      <div class="drop-content" v-show='index.product.content' @mouseleave="switchStatus('product')">
        <div class="word-content" v-show='index.product.content'>
          <div class="drop-type">
            <div class="drop-title">基础&amp;应用</div>
            <ul class="drop-details">
              <li><a href="/cloud-host" target="_blank">基础云计算(云主机)</a></li>
              <li><a href="/cloud-resolving" target="_blank">云解析(安全DNS)</a></li>
              <li><a href="/cloud-speed" target="_blank">云加速(CDN加速)</a></li>
              <li><a href="/cloud-monitor" target="_blank">云监控(宕机监控)</a></li>
              <li><a href="/double-mirror" target="_blank">替身镜像(网站备份)</a></li>
              <li><a href="/ssl-certificate" target="_blank">SSL证书(证书管理)</a></li>
            </ul>
          </div>
          <div class="drop-type">
            <div class="drop-title">
              太极抗D
            </div>
            <ul class="drop-details">
              <li><a href="/taichiddosWeb" target="_blank">WEB(体验)版</a></li>
              <li><a href="/taichiddosPlus" target="_blank">PLUS(专业/尊享)版</a></li>
              <li><a href="/taichiddosDns" target="_blank">DNS版</a></li>
              <li><a href="/taichiddosApp" target="_blank">APP(SDK)版</a></li>
            </ul>
          </div>
          <div class="drop-type">
            <div class="drop-title">
              云安全
            </div>
            <ul class="drop-details">
              <li><a href="/red-guard" target="_blank">红网卫士(云WAF)</a></li>
              <li><a href="/risk-detect" target="_blank">盾眼(风险观测)</a></li>
              <li><a href="/server-guard" target="_blank">服卫士(主机防火墙)</a></li>
              <li><a href="/stargaze" target="_blank">观星风控(业务安全)</a></li>
            </ul>
          </div>
          <div class="drop-type">
            <div class="drop-title">
              重点服务
            </div>
            <ul class="drop-details">
              <li><a href="/consult" target="_blank">等保咨询</a></li>
              <li><a href="/assess" target="_blank">风险评估</a></li>
              <li><a href="/verify" target="_blank">源代码审计及验证</a></li>
              <li><a href="/service" target="_blank">安全测试和渗透服务</a></li>
              <li><a href="/polling" target="_blank">安全巡检</a></li>
              <li><a href="/guarantor" target="_blank">安全重保</a></li>
              <li><a href="/respond" target="_blank">应急响应</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="drop-content" v-show='index.scheme.content' @mouseleave="switchStatus('scheme')">
        <div class="word-content" v-show='index.scheme.content'>
          <div class="drop-type">
            <div class="drop-title">
              行业解决方案
            </div>
            <ul class="drop-details">
              <li><a href="/internet" target="_blank">互联网数据中心</a></li>
              <li><a href="/finance" target="_blank">新金融行业</a></li>
              <li><a href="/chess" target="_blank">棋牌游戏</a></li>
              <li><a href="/government" target="_blank">政企行业</a></li>
            </ul>
          </div>
          <div class="drop-type">
            <div class="drop-title">
              专项解决方案
            </div>
            <ul class="drop-details to-details">
              <li>CDN加速(敬请期待)</li>
              <li>安全DNS(敬请期待)</li>
              <li>DDOS防护(敬请期待)</li>
              <li>网页防篡改(敬请期待)</li>
              <li>防刷反爬虫(敬请期待)</li>
              <li>入侵防御(敬请期待)</li>
              <li>WEB监控(敬请期待)</li>
            </ul>
          </div>
        </div>
      </div>
    </div> -->
  </header>
  <slot>
  </slot>
  <!-- <footer v-if="footer" class="footer-bg">
    <div class="ad-replace">
      <img src="../../assets/images/group.png" alt="">
    </div>
    <div class="footer-part about">
      <ul>
        <li class="part-content first-padding">
          <h4>热门产品</h4>
          <ul class="content-list">
            <li><a href="/taichiddosPlus" target="_blank">太极抗D</a></li>
            <li><a href="/red-guard" target="_blank">红网卫士</a></li>
            <li><a href="/risk-detect" target="_blank">盾眼</a></li>
            <li><a href="/cloud-monitor" target="_blank">云监控</a></li>
            <li><a href="/cloud-resolving" target="_blank">云解析</a></li>
            <li><a href="/cloud-speed" target="_blank">云加速</a></li>
            <li><a href="/server-guard" target="_blank">服卫士</a></li>
          </ul>
        </li>
        <li class="part-content part-padding">
          <h4>重点服务</h4>
          <ul class="content-list">
            <li>
              <a href="/consult" target="_blank">等保咨询</a>
            </li>
            <li><a href="/assess" target="_blank">风险评估</a></li>
            <li><a href="/verify" target="_blank">源代码审计及验证</a></li>
            <li><a href="/service" target="_blank">安全测试和渗透服务</a></li>
            <li><a href="/polling" target="_blank">安全巡检</a></li>
            <li><a href="/guarantor" target="_blank">安全重保</a></li>
            <li><a href="/respond" target="_blank">应急响应</a></li>
          </ul>
        </li>
        <li class="part-content part-padding">
          <h4>重点解决方案</h4>
          <ul class="content-list">
            <li><a href="/internet" target="_blank">互联网数据中心（IDC）解决方案</a></li>
            <li><a href="/government" target="_blank">政企行业安全解决方案</a></li>
            <li><a href="/chess" target="_blank">棋牌游戏安全解决方案</a></li>
            <li><a href="/finance" target="_blank">新金融行业安全解决方案</a></li>
          </ul>
        </li>
        <li class="part-content part-padding link-us-last">
          <h4>联系我们</h4>
          <ul class="content-list">
            <li><span>客服QQ 800090007</span></li>
            <li><span>客服热线 400-999-7070</span></li>
            <li><span>客服邮箱 support#yundun.com</span></li>
            <li><span>站长交流群 492554047</span></li>
            <li>
              <span>微信公众号</span>
              <img src="../../assets/images/book.jpg" class="book-img" alt="">
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <p class="friendly-link">
      友情链接:&nbsp;
      <a target="_blank" v-for="single in linkData" v-bind:href="single.href">{{single.name}}</a>
    </p>
    <copyright-footer>
    </copyright-footer>
  </footer> -->
  <!-- <TopButton :currentHeight="buttonCurrent" v-if="button" /> -->
</div>
</template>

<script>
/*eslint-disable*/
import 'normalize.css'
import '../../assets/styles/style-reset.css'
import {
  BASE_URL
} from 'common/config/interceptor'
import SourceWebResource from '../../../website/static/js/SourceWebResource'
import {
  JSONP,
  returnOrigin
} from 'common/assets/js/normal'
import CopyrightFooter from './copyright-footer'
import 'core-js'
import Help from 'common/utils/help'
import axios from 'axios'
import TopButton from 'common/components/TopButton/TopButton'

export default {
  components: {
    CopyrightFooter,
    TopButton
  },
  props: {
    blackHeader: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: true
    },
    buttonShow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    button: {
      get() {
        return this.buttonShow
      }
    }
  },
  data() {
    return {
      buttonCurrent: 0,
      consoleHref: '',
      userName: '',
      dropShow: false,
      isLogin: false,
      testData: false,
      linkData: [],
      activeData: [false, false, false, false, false],
      index: {
        product: {
          bar: true,
          content: false
        },
        scheme: {
          bar: true,
          content: false
        }
      }
    }
  },
  created() {
    // ie9-oninput-polyfill.js
    ;
    (function(d) {
      if (navigator.userAgent.indexOf('MSIE 9') === -1) return
      d.addEventListener('selectionchange', () => {
        const el = d.activeElement
        if (
          el.tagName === 'TEXTAREA' ||
          (el.tagName === 'INPUT' && el.type === 'text')
        ) {
          const ev = d.createEvent('CustomEvent')
          ev.initCustomEvent('input', true, true, {})
          el.dispatchEvent(ev)
        }
      })
    })(document)
    Help.statistics()
    switch (window.location.pathname) {
      case '/':
        this.activeData[0] = true
        break
      case '/help':
        this.activeData[3] = true
        break
      case '/about':
        this.activeData[4] = true
        break
      default:
    }
  },
  mounted() {
    console.log(this.buttonShow, '00000sss')
    JSONP.getJSON(
      BASE_URL + '/sso/V4/attach', {
        callback: '?'
      },
      (json, code) => {
        console.log(json,'json',code,'code')
        if (code && (code === 200 || code === 204)) {
          SourceWebResource.getUserInfo()
            .then(response => {
              if (response.status === 200) {
                if (response.data.email) {
                  this.userName = response.data.email
                  this.isLogin = true
                  axios
                    .get('/api/V4/overview.guide.memberDisplayProduct')
                    .then(response => {
                      const {
                        member_type
                      } = response.data.data
                      this.consoleHref =
                        member_type === 'old' ? '/guide' : '/console'
                    })
                }
              }
              this.viewShow = true
            })
            .catch(error => {
              console.log('error===', error)
              JSONP.getJSON(
                BASE_URL + '/sso/V4/attach', {
                  callback: '?'
                },
                res => {
                  console.log('code2===', code)
                  console.log('callback', res)
                }
              )
            })
        } else {
          this.viewShow = true
        }
      }
    )
    SourceWebResource.getFriendLink().then(response => {
      if (response.status === 200) {
        if (response.data.status.code === 1) {
          this.linkData = response.data.data
        }
      }
    })
    const self = this

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
  methods: {
    throttle(func, delay) { //简单节流 用于onscroll事件
      let last = 0
      return function() {
        const curr = +new Date()
        if (curr - last > delay) {
          func.apply(this)
          last = curr
        }
      }
    },
    total(e) {
      // console.log(e, 'try a try')
    },
    dropDown(e, content) {
      const _di = this.judgeDirection(e)
      // console.log(this.index[content].bar, 'testing')
      if (_di === 2 && this.index[content].bar === true) {
        this.index[content].content = true
      }

      this.contentShow(content)
    },
    getOffset(obj, isLeft) {
      /*isLeft === false 为top*/
      let tmp = ''
      isLeft ? (tmp = obj.offsetLeft) : (tmp = obj.offsetTop)
      let val = obj.offsetParent
      while (val != null) {
        isLeft ? (tmp += val.offsetLeft) : (tmp += val.offsetTop)
        val = val.offsetParent
      }
      return tmp
    },
    judgeDirection(e) {
      const _target = e.target || e.srcElement
      const _offLeft = this.getOffset(_target, true)
      const _offTop = this.getOffset(_target, false)
      const w = _target.clientWidth
      const h = _target.clientHeight
      const x = (e.pageX - _offLeft - w / 2) * (w > h ? h / w : 1)
      const y = (e.pageY - _offTop - h / 2) * (h > w ? w / h : 1)
      const direction =
        Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4
      const eventType = e.type
      const directionWord = ['up', 'right', 'down', 'left']
      return direction
    },
    contentStatus(type) {
      this.contentShow(type)
    },
    contentShow(index) {
      for (const i in this.index) {
        i === index ?
          (this.index[i].content = true) :
          (this.index[i].content = false)
      }
      this.index[index].bar = true
    },
    isShow(index, e) {
      const _di = this.judgeDirection(e)
      if (_di !== 2 && this.index[index].bar === true) {
        this.index[index].content = false
        this.index[index].bar = false
      }
    },
    switchStatus(index) {
      this.index[index].bar = true
      this.index[index].content = false
    },
    logOut() {
      SourceWebResource.logOut().then(response => {
        if (response.status === 200) {
          if (
            document.referrer.indexOf('find-pass', 0) !== -1 ||
            document.referrer.indexOf('register', 0) !== -1
          ) {
            window.location = returnOrigin()
          } else {
            window.location = document.referrer || returnOrigin()
          }
        }
      }).catch(res => {
        window.location.href = '/login'
      })
    }
  }
}
</script>

<style scoped>
a {
  color: #fff;
}


/* 清除浮动 */

.clearfix:before,
.clearfix:after {
  display: table;
  content: " ";
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1;
}


/**********header**********/

.navbar-black {
  background: #000000;
}

.navbar-default {
  /*background: linear-gradient(to right, #0c8ad6, #2370e0, #3b52eb);
  background: #2d90e6\9\0;*/
  background: rgba(0, 0, 0, .98);
  background: #000\9\0;
}

.nav-bar {
  position: relative;
  width: 100%;
  z-index: 1000;
  left: 0;
  top: 0;
}

.nav-bar:hover {
  transition: all .5s;
  @extend .navbar-black;
}

.nav-bar-inner {
  position: relative;
  max-width: 1200px;
  min-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  height: 65px;
  line-height: 65px;
}

.nav-right {
  float: right;
  height: 100%;
}

.logo-size {
  width: 258px;
  vertical-align: middle;
}

.hide {
  display: none;
}

.menu li,
.page li,
.nav-content,
.nav-content ul,
.view-placeholder,
.user-enter-container {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  box-sizing: border-box;
}

.view-placeholder {
  width: 225px;
}

.user-enter-container {
  position: relative;
}

.user-login-info {
  float: right;
  line-height: 62px;
}


/*.menu li:hover{
 border-bottom: 1px solid #fff;
}*/

.menu li {
  z-index: 1000;
  /*height: 140%;*/
}

.nav-content .mark-menu {
  font-size: 0;
}

.menu {
  padding-right: 20px;
}

.menu li a {
  margin: 0 13px;
  padding: 5px 0;
  font-size: 14px;
  position: relative;
}

.console-style {
  margin-right: 24px;
}

.mark-menu {
  position: relative;
}

.mark-menu .bottom-line {
  position: absolute;
  bottom: 10%;
  left: 0;
  height: 1px;
  width: 0;
  background: #fff;
}


/*.mark-menu:hover .bottom-line{
  width: 50px;
  transition: all .5s;
}*/

.mark-menu li a::after {
  content: "";
  height: 1px;
  width: 0;
  position: absolute;
  top: 100%;
  left: 50%;
  background: #fff;
}

.mark-menu li:hover a::after {
  width: 100%;
  left: 0;
  transition: all .5s;
}

.active::after {
  content: "";
  height: 1px;
  width: 100%!important;
  position: absolute;
  top: 100%;
  left: 0!important;
  background: #fff;
}


/*.underline{
    height: 3px;
 background: #3E8760;
 position: absolute;
 bottom: 0;
 width: 120px;
 z-index: 2;
 -webkit-transition: all 0.35s;
 -moz-transition: all 0.35s;
 -ms-transition: all 0.35s;
 transition: all 0.35s;
}*/

.register,
.login {
  padding: 0 31px;
}

.register {
  border-left: 1px solid currentColor;
}

.login-switch .login {
  border: 1px solid currentColor;
  padding: 5px 30px;
}


/*.drop-container{
    position: absolute;
    left: 0;
    right: 0;
    background: #101010;
    height: 563px;
}*/

.drop-content {
  text-align: left;
  /*padding-left: 20%;*/
  position: absolute;
  left: 0;
  right: 0;
  background: #101010;
  height: 363px;
}

.word-content {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.drop-type {
  display: inline-block;
  vertical-align: top;
  padding: 30px 40px;
  font-size: 12px;
}

.drop-title,
.drop-details {
  text-align: left;
}

.drop-title {
  color: #fff;
  border-bottom: 1px solid #404040;
  padding-bottom: 8px;
  font-weight: bold;
  padding-right: 100px;
}

.drop-details {
  padding: 5px 0 15px;
  box-sizing: border-box;
}

.drop-details li {
  padding: 8px 0;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #101010;
}

.drop-details li a,
.to-details li {
  padding-right: 10px;
  color: #969696;
  display: block;
}


/*.drop-details li:hover {
  border: 1px solid #404040;
  transition: all .3s;
}*/

.to-details li:hover {
  border: 1px solid #101010;
}

.drop-details li:hover a {
  color: #1468d4;
  transition: all .3s;
}


/*.drop-details li:hover a:after {
  content: '>';
  color: #1468d4;
  position: absolute;
  right: 5px;
}*/

.isLogin-container {
  position: relative;
}

.isLogin-box {
  position: absolute;
  left: 0;
  top: 96%;
  width: 100%;
}

.isLogin-box li {
  width: inherit;
  box-sizing: border-box;
  padding: 5px;
  display: block!important;
  background: rgba(0, 0, 0, .9);
  color: #fff;
  cursor: pointer;
}

.isLogin-box li a {
  color: inherit;
}

.fitName {
  text-overflow: ellipsis;
  width: 145px;
  overflow: hidden;
  display: inline-block;
}


/************footer***********/

.footer-bg {
  /*background: #272A2D;*/
  background: #272727;
  width: 100%;
  color: #969696;
}

.footer-bg a {
  color: #969696;
}

.footer-bg a:hover {
  color: #fff;
  transition: all .3s;
}

.footer-part {
  /*text-align: center;*/
}

.footer-bg .about {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 65px;
}

.footer-part .part-content,
.footer-part .first-content {
  display: inline-block;
  vertical-align: top;
  height: 270px;
  box-sizing: border-box;
}

.footer-part .part-padding {
  padding: 55px 105px;
}

.footer-part .first-padding {
  padding: 55px 80px 0 20px;
}

.footer-part .part-content h4 {
  padding-bottom: 20px;
  color: #dcdcdc;
  font-weight: 100;
}

.footer-part .content-list li {
  padding: 5px 0;
  font-size: 12px;
}

.footer-part .part-content+.part-content {
  border-left: 1px solid #323232;
}

.footer-part .part-content .wechat {
  display: inline-block;
  vertical-align: top;
  padding-top: 10px;
}

.friendly-link {
  text-align: left;
  padding: 14px 0;
  width: 1200px;
  box-sizing: border-box;
  margin: 0 auto;
  border-top: 1px solid #313131;
  border-bottom: 1px solid #313131;
}

.friendly-link a {
  padding: 0 6px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.book-img {
  width: 63px;
  display: block;
  margin-top: 8px;
}

.ad-replace {
  text-align: center;
}

.footer-part .link-us-last {
  padding: 55px 0 0 134px;
}

.login-switch {
  margin-top: -5px;
}

</style><style>body {
  min-width: 1280px;
}
</style>
