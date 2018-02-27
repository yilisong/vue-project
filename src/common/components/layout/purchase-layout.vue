<template lang="html">
<div id="root">
  <header class="nav-bar">
    <div class="nav-bar-inner clearfix">
      <div class="pull-left nav-logo">
        <a href="/">
          <img src="../../assets/images/logo-console.svg" class="logo-size" alt="">
        </a>
      </div>
      <div class="pull-right nav-content">
        <div class="userbox">
          <span class="i-dropdown-link" @click="triggerLoginBox">
            {{ user.email }}
            <i :class="[isHidden ? 'i-icon-caret-bottom' : 'i-icon-caret-left']"></i>
          </span>
          <ul class="isLogin-box" v-show="isHidden">
            <li><a href="/console/user-center">用户中心</a></li>
            <li @click="logOut">退出</li>
          </ul>
        </div>
        <span class="separator"></span>
        <a class="console" href="/console">控制台</a>
      </div>
    </div>
  </header>
  <!-- section -->
  <slot>
  </slot>
  <!-- footer -->
  <copyright-footer></copyright-footer>
</div>
</template>

<script>
import 'common/assets/styles/helper-class.css'
import CopyrightFooter from './copyright-footer'
import SourceWebResource from 'src/website/static/js/SourceWebResource'
import Help from 'common/utils/help'

export default {
  components: {
    CopyrightFooter
  },
  created() {
    // ie9-oninput-polyfill.js
    (function(d) {
      if (navigator.userAgent.indexOf('MSIE 9') === -1) return
      d.addEventListener('selectionchange', () => {
        const el = d.activeElement
        if (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && el.type === 'text')) {
          const ev = d.createEvent('CustomEvent')
          ev.initCustomEvent('input', true, true, {})
          el.dispatchEvent(ev)
        }
      })
    }(document))
    Help.statistics()
    SourceWebResource.getUserInfo().then(response => {
      const {
        email,
        http_status_code
      } = response.data
      if (http_status_code && http_status_code === 204) {
        window.location.href = '/login'
      }
      this.user.email = email
    })
  },
  methods: {
    triggerLoginBox() {
      this.isHidden = !this.isHidden
    },
    logOut() {
      SourceWebResource.logOut().then(response => {
        const {
          http_status_code
        } = response.data
        if (http_status_code && http_status_code === 204) {
          window.location.href = '/'
        }
      })
    }
  },
  data() {
    return {
      user: {
        email: ''
      },
      isHidden: false
    }
  }
}
</script>

<style>
.container {
  @extend center;
}
</style>

<style scoped>
$backgroundColor: #272a2d;
@define-extend center {
  width: 1200px;
  margin: 0 auto;
}

.nav-bar {
  height: 45px;
  background-color: $backgroundColor;
}

.nav-bar-inner {
  @extend center;
}

.nav-logo {
  width: 125px;
  height: 48px;
  text-align: center;
  background-image: linear-gradient(to bottom right, #197bdb, #3b52eb);
}

.logo-size {
  width: 124px;
  margin-top: 4px;
}

.nav-content {
  color: #eaeaea;
}

.userbox {
  position: relative;
  display: inline-block;
  min-width: 50px;
  font-size: 12px;
  line-height: 45px;
  cursor: pointer;
}

.isLogin-box {
  position: absolute;
  top: 45px;
  left: -10px;
  padding: 5px 17px 10px 10px;
  width: 100%;
  color: #fff;
  line-height: 30px;
  border: 1px solid #272a2d;
  background-color: #272a2d;
  transition: height .5s;
  li {
    cursor: pointer;
  }
  a {
    display: block;
    color: #fff;
  }
}

.separator {
  display: inline-block;
  width: 1px;
  height: 25px;
  margin: 0 16px;
  background-color: #686a6c;
  vertical-align: middle;
}

.console {
  display: inline-block;
  width: 98px;
  height: 28px;
  font-size: 12px;
  line-height: 30px;
  color: #eaeaea;
  border: 1px solid #686a6c;
  border-radius: 1px;
  text-align: center;
}
</style>
