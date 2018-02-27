<template>
<div id="app" :class="{folding: isFold}">
  <header>
    <div style="height:60px;width:100%;background:#0b76bf;">预案系统

      <div class="sub-header pull-right">
        <ul class="header-help">
          <li>
            <a @click="openQQ"><i class="yun-icon yun-qq"></i></a>
          </li>
          <li>
            <a href="">
              <!-- <i-badge :value="unreadMessageLocalCache" class="header-message-badge"> -->
                <i class="yun-icon yun-unread-message"></i>
              <!-- </i-badge> -->
            </a>
          </li>
          <li>
            <span class="header-phone"><i class="yun-icon yun-hot-line"></i><span class="phone-number">xxx-xxx-xxx</span></span>
          </li>
          <li>
            <dropdown class="header-bar" trigger="click" @command="handleUserCommand">
              <a href="javascript:void(0)" class="user-email-info">
                {{ user.email }}<i class="i-icon-caret-bottom i-icon--right"></i>
              </a>
              <dropdown-menu class="user-info" slot="list">
                <dropdown-item>xxx联动中心</dropdown-item>
                <dropdown-item>修改密码</dropdown-item>
                <dropdown-item  command="logOut">退出登陆</dropdown-item>
              </dropdown-menu>
            </dropdown>
          </li>
        </ul>
      </div>
    </div>
    <div class="sub-header-all">
      <div class="sub-header">
        <div class="header-btn" @click="foldToggle">
          <span></span>
        </div>
        <!-- <a href="/console/home" class="header-a">总览</a> -->
        <div class="breadcrumb-bar">
            <breadcrumb class="breadcrumb-path" separator=">">
              <breadcrumb-item>您当前的位置：</breadcrumb-item>
              <breadcrumb-item :to="{path: item.path}" :key="index" v-for="(item, index) in breadcrumb">
                {{item.name}}
              </breadcrumb-item>
            </breadcrumb>
          </div>
      </div>
    </div>
  </header>
  <div class="main-container">
    <div class="main-nav-container">
      <i-menu  :open-names="['1']" accordion class="main-nav delete-right-icon" :default-openeds="defaultNav" :default-active="appMenu.navActive" unique-opened @select="handleSelect">
        <submenu :index="index + ''" :key="index" v-for="(item, index) in navConfig">
          <template slot="title">
            <tooltip :disabled="!isFold" class="item" effect="dark" :content="item.title" placement="right">
              <span class="em-cover"></span>
            </tooltip>
            <em :class="['side-menu', item.icon]"></em>
            {{item.title}}
          </template>
          <menu-item v-for="(item, index) in item.sub" :key="index" :index="item.index">
            <!-- <tooltip :disabled="!isFold" class="item fill-block" effect="dark" :content="item.title" placement="right">
              <a v-if="item.index === '5-1'" :class="['side-menu', item.icon]" :href="item.url" target="_blank"></a>
              <a v-else :class="['side-menu', item.icon]" :href="item.url"></a>
            </tooltip> -->
            <a v-if="item.index === '5-1'" target="_blank" :href="item.url" class="right-mark">{{item.title}}</a>
            <a v-else :href="item.url" class="right-mark">{{item.title}}</a>
          </menu-item>
        </submenu>
      </i-menu>
    </div>
    <div class="module-container">
      <div v-if="isProduct">
        <!-- <i-menu class="module-nav" :router="true" mode="vertical" :default-active="appMenu.active">
          <i-menu-item-group :title="appMenu.title">
            <i-menu-item :index="item.index" :key="index" v-for="(item, index) in appMenu.items">{{item.title}}</i-menu-item>
          </i-menu-item-group>
        </i-menu> -->
        <div class="module-content">
          <!-- <div class="breadcrumb-bar">
            <breadcrumb class="breadcrumb-path" separator=">">
              <breadcrumb-item>您当前的位置：</breadcrumb-item>
              <breadcrumb-item :to="{path: item.path}" :key="index" v-for="(item, index) in breadcrumb">
                {{item.name}}
              </breadcrumb-item>
            </breadcrumb>
          </div> -->
          <div class="page-area">
            <slot></slot>
          </div>
        </div>
      </div>
      <div v-else>
        <slot name="product"></slot>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */
import navConfig from '../../config/main-nav'
import SourceWebResource from 'src/website/static/js/SourceWebResource'
import CommonResource from 'common/resource/CommonResource'
import Help from 'common/utils/help'
// import shrinkableMenu from '../main-components/shrinkable-menu/shrinkable-menu.vue';

const FOLD_STORAGE_KEY = 'F_S'

export default {
  components: {
    // shrinkableMenu
  },
  props: {
    appMenu: {
      type: Object,
      default: {}
    },
    breadcrumb: Array,
    isProduct: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      theme2: 'dark',
      user: {
        email: '672710651@qq.com'
      },
      navConfig,
      isFold: this.foldStateInit(),
      unreadMessageLocalCache: 0,
      migratedBtn: false,
      defaultNav: ['0']
    }
  },
  computed: {
    unreadMessage() {
      // if (this.$store.state.messageList !== undefined) {
      //   return this.$store.state.messageList.unReadNumber
      // } else {
      //   return this.unreadMessageLocalCache
      // }
    }
  },
  mounted() {
    // SourceWebResource.getUserInfo()
    //   .then(response => {
    //     if (response.data.email) {
    //       this.user.email = response.data.email
    //     } else {
    //       window.location.href = '/login'
    //     }
    //   })
    //   .catch(error => {
    //     if (error.response.status === 500) {
    //       window.location.href = '/login'
    //     }
    //   })
  },
  created() {
    // ie9-oninput-polyfill.js
    ;
    // (function(d) {
    //   if (navigator.userAgent.indexOf('MSIE 9') === -1) return
    //   d.addEventListener('selectionchange', () => {
    //     const el = d.activeElement
    //     if (
    //       el.tagName === 'TEXTAREA' ||
    //       (el.tagName === 'INPUT' && el.type === 'text')
    //     ) {
    //       const ev = d.createEvent('CustomEvent')
    //       ev.initCustomEvent('input', true, true, {})
    //       el.dispatchEvent(ev)
    //     }
    //   })
    // })(document)
    // this.init()
    // Help.statistics()
    // this.$router.afterEach(route => {
    //   if (route.matched[0].path === '/MessageList') {
    //     SourceWebResource.getUnreadMessage().then(response => {
    //       this.unreadMessageLocalCache = this.fotmatUnreadMessage(
    //         response.data.data.total
    //       )
    //     })
    //   }
    // })
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key)
      if (Object.is(key, '5-1')) {
        location.reload(false)
      }
    },
    openQQ() {
      Help.linkService()
    },
    init() {
      SourceWebResource.getUnreadMessage().then(response => {
        this.unreadMessageLocalCache = this.fotmatUnreadMessage(
          response.data.data.total
        )
      })
      SourceWebResource.getUserInfo().then(response => {
        const {
          email
        } = response.data
        this.user.email = email
      })
      CommonResource.getMemberMigrateTeam().then(response => {
        const data = response.data.data
        if (data.migrate_team === '1' && data.is_migrate === '2') {
          this.migratedBtn = true
        }
      })
    },
    fotmatUnreadMessage(number) {
      if (number > 99) {
        return '99+'
      } else {
        return number
      }
    },
    foldToggle() {
      this.setFoldState(!this.isFold)
      this.isFold = this.getFoldState()
    },
    foldStateInit() {
      !window.localStorage.getItem(FOLD_STORAGE_KEY) && this.setFoldState(false)
      return this.getFoldState()
    },
    setFoldState(value) {
      window.localStorage.setItem(FOLD_STORAGE_KEY, value)
    },
    getFoldState() {
      return JSON.parse(window.localStorage.getItem(FOLD_STORAGE_KEY))
    },
    handleUserCommand(command) {
      if (command === 'logOut') {
        SourceWebResource.logOut()
          .then(response => {
            const {
              http_status_code
            } = response.data
            if (http_status_code && http_status_code === 204) {
              window.location.href = '/'
            }
          })
          .catch(res => {
            window.location.href = '/login'
          })
      }
    }
  }
}
</script>

<style scoped>
.login-log {
  display: block;
  color: #333333;
}

.go-old-site {
  color: var(--primary-blue);
  font-size: 12px;
  border: 1px solid var(--primary-blue);
  padding: 2px 5px
}
</style>

<style>
$headerHeight: 52px;
$splitBorderColor: #E8EBEE;
@define-extend boundary {
  min-width: 1280px;
  width: 100%;
}

html {
  font-size: 12px;
  line-height: 1.5 !important;
}

header {
  @extend boundary;
  position: fixed;
  height: 60px;
  box-shadow: 0 0 5px rgba(57, 70, 78, .2);
  background: #fff;
  z-index: 1000;
}

header .sub-header-all {
  @extend boundary;
  position: fixed;
  height: 50px;
  box-shadow: 0 0 5px rgba(57, 70, 78, .2);
  background: #fff;
  /* z-index: 1000; */
  left: 160px;
}

#app {
  background: #fff;
}

.logo>img {
  width: 160px;
  height: 52px;
}

.folding .logo {
  width: 52px;
  padding-left: 0;
}

.sub-header {
  width: 100%;
  height: 100%;
  display: inline-block;
  line-height: 52px;
  position: relative;
}

.header-btn {
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 46px;
  height: 41px;
  margin: 5px 8px 6px;
  text-align: center;
  float: left;
}

.header-btn span {
  position: absolute;
  width: 20px;
  height: 12px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-top: 2px solid #2095f1;
  border-bottom: 2px solid #2095f1;
}

.header-btn span:before {
  content: '';
  width: 20px;
  height: 0;
  position: absolute;
  top: 1px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-top: 2px solid #2095f1;
}

.folding .header-btn {
  width: 30px;
  padding-left: 1px;
}

.folding .header-btn span,
.folding .header-btn span:before {
  width: 2px;
}

.header-a {
  position: relative;
  margin: auto 20px;
  line-height: 52px;
  color: #333;
  font-size: 14px;
}

.header-a:before {
  position: absolute;
  content: '';
  width: 0;
  height: 24px;
  left: -20px;
  border-left: 1px solid $splitBorderColor;
  top: 0;
  bottom: 0;
  margin: auto;
}

.header-help {
  li {
    text-align: center;
    cursor: pointer;
    height: 20px;
    /* width: 20px; */
    float: left;
    padding: 0 20px;
    margin-top: 15px;
    line-height: 1;
    color: #fff;
    /* border-right: 1px solid #cdcdcd; */
    &:nth-of-type(3), &:nth-of-type(2), &:nth-of-type(1) {
      width: 134px;
    }
    &:nth-of-type(4) {
      width: 180px;
    }
  }
  .header-bar {
    height: 35px;
    z-index: 999999;
  }
  .phone-number {
    padding-left: 10px;
    position: relative;
    top: -3px;
  }
  .header-phone {
    font-size: 14px;
    cursor: pointer;
    position: relative;
    display: inline-block;
    text-decoration: 5px;
  }
}

.header-message-badge {
  .i-badge__content.is-fixed
  {
    top: 16px;
    right: 12px;
    position: absolute;
  }
  .i-badge__content {
    height: 16px;
    line-height: 16px;
    padding: 0 4px;
  }
}

.main-container {
  position: absolute;
  top: 52px;
  bottom: 0px;
  @extend boundary;
}

$mainNavUnfoldWidth: 160px;
$mainNavFoldWidth: 52px;
$scrollBarWidth: 17px;
.main-nav-container {
  width: $mainNavUnfoldWidth;
  position: fixed;
  top: 60px;
  bottom: 0;
  z-index: 100;
  background-color: #232323;
  overflow: hidden;
  .main-nav {
    width: calc(100% + $scrollBarWidth);
    height: 99%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: $scrollBarWidth;
    background-color: inherit;
  }
}

.folding .main-container .main-nav-container {
  width: $mainNavFoldWidth;
}

.main-nav .i-submenu .i-submenu__title {
  padding: 0 !important;
  border-bottom: 1px solid #383838;
  color: #717171;
}

.main-nav .i-submenu .i-menu-item {
  font-size: 12px;
}

.main-nav .i-submenu.is-active .i-submenu__title {
  background-color: #2c2c2c;
}

.em-cover {
  position: absolute;
  z-index: 15;
  display: inline-block;
  width: 53px;
  height: 48px;
  opacity: 0;
}

.main-nav .i-submenu .i-submenu__title .side-menu {
  display: inline-block;
  width: 49px;
  height: 46px;
  margin-top: -1px;
  vertical-align: middle;
  opacity: 0;
}

.main-nav .i-submenu.is-active .i-submenu__title {
  color: #fff;
  border-bottom: 1px solid #383838;
}

.main-nav .i-submenu .i-submenu__title {
  height: 48px;
  line-height: 48px;
}

.main-nav .i-submenu .i-submenu__title .side-menu::before {
  font-family: 'iconfont' !important;
  font-size: 46px;
  font-style: normal;
  position: absolute;
  left: 0;
}

.main-nav .i-submenu .i-submenu__title .menu-performance-acceleration::before {
  content: '\e620';
}

.main-nav .i-submenu .i-submenu__title .menu-tjkd::before {
  content: '\e623';
}

.main-nav .i-submenu .i-submenu__title .menu-cloud-security::before {
  content: '\e635';
}

.main-nav .i-submenu .i-submenu__title .menu-basic-application::before {
  content: '\e61e'
}

.main-nav .i-submenu .i-submenu__title .side-menu.menu-message::before {
  content: '\e62f'
}

.main-nav .i-submenu.is-active .i-submenu__title .side-menu.menu-message::before {
  content: '\e62f'
}

.main-nav .i-submenu .i-submenu__title .menu-user::before {
  content: '\e645'
}

.main-nav .i-submenu .i-submenu__title .side-menu.menu-financial::before {
  content: '\e647'
}

.main-nav .i-submenu .i-menu .i-menu-item .side-menu::before {
  font-family: 'iconfont' !important;
  font-size: 40px;
  font-style: normal;
  position: absolute;
  left: -50px;
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-yjs::before {
  content: '\e641';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-web::before {
  content: '\e63f';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-dns::before {
  content: '\e632';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-plus::before {
  content: '\e639';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-yyj::before {
  content: '\e643';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-hwws::before {
  content: '\e637';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-dy::before {
  content: '\e638';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-ssl::before {
  content: '\e63c';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-tsjx::before {
  content: '\e63e';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-qly::before {
  content: '\e63b';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-fws::before {
  content: '\e636';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-jcy::before {
  content: '\e63a';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-yjx::before {
  content: '\e642';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-yjk::before {
  content: '\e640';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-message::before {
  content: '\e63d';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-account::before {
  content: '\e633';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-finance::before {
  content: '\e634';
}

.main-nav .i-submenu .i-menu .i-menu-item .yun-gxfk::before {
  content: '\e634';
}

.main-nav>.i-submenu .i-menu {
  /*padding: 12px 0;*/
  border-bottom: 1px solid #3b3b3b;
  background-color: #2e2e2e;
}

.main-nav>.i-submenu.is-active .i-menu {
  background-color: #2c2c2c;
}

.main-nav .i-menu-item.is-active .side-menu {
  color: #199ddc;
}

.main-nav .i-submenu .i-menu-item {
  display: block;
  height: 42px;
  padding: 0 !important;
  margin-left: 51px;
  line-height: 42px;
  color: #848484;
  cursor: pointer;
}

.main-nav .i-submenu .is-active {
  border-right: 3px solid #2d90e6;
}

.main-nav .i-submenu .i-menu-item a {
  display: inline-block;
  vertical-align: top;
  color: #848484;
  cursor: pointer;
}

.main-nav .i-submenu .i-menu-item:hover,
.main-nav .i-submenu .i-menu-item:hover a,
.main-nav .i-submenu .i-menu-item a:hover,
.main-nav .i-submenu .i-submenu__title:hover {
  color: #fff;
  background-color: transparent;
}

.main-nav .i-submenu .i-menu-item a {
  display: inline-block;
  vertical-align: top;
  color: #848484;
  cursor: pointer;
}

.main-nav .i-submenu:hover .i-submenu__title {
  background: #3a3a3a!important;
}

.main-nav .i-submenu.is-active .i-submenu__title:hover {
  background-color: #2c2c2c;
}

.main-nav .i-submenu__title .i-submenu__icon-arrow.i-icon-arrow-down {
  margin-top: -4px;
  opacity: 1;
}

.main-nav .i-submenu__title .i-icon-arrow-down:before {
  font-family: 'iconfont' !important;
  content: '\e657';
  /*color: #fff;*/
}

.main-nav .is-active .i-submenu__title .i-icon-arrow-down:before {
  font-family: 'iconfont' !important;
  content: '\e657';
}

.main-nav .i-submenu.is-opened .i-submenu__title .i-icon-arrow-down:before {
  color: #199ddc;
}

.folding .main-nav .i-submenu__title .i-submenu__icon-arrow::before,
.folding .main-nav .i-submenu.is-opened .i-submenu__title .side-menu {
  opacity: 0;
}

.folding .main-nav .i-submenu.is-opened .i-submenu__title .i-icon-arrow-down:before,
.folding .i-submenu .i-submenu__title .side-menu {
  opacity: 1;
}

.main-nav .i-menu-item.is-active a {
  color: #fff;
}

.main-nav .i-menu-item:hover a {
  color: #fff;
  background-color: transparent;
}

.module-container {
  position: absolute;
  overflow-x: hidden;
  width: auto;
  height: 100%;
  top: 60px;
  /* left: $mainNavUnfoldWidth; */
  left: 20px;
  bottom: 0px;
  right: 0px;
}

.folding .module-container {
  left: $mainNavFoldWidth;
}

$moduleNavWidth: 140px;
.module-container .module-nav {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: $moduleNavWidth;
  white-space: nowrap;
  z-index: 20;
  background-color: var(--wrap-background);
}

.module-nav .i-menu-item {
  height: 32px;
  padding: 11px auto;
  /*margin: 11px auto;*/
  line-height: 32px;
  color: #333;
}

.module-nav .i-menu-item.is-active {
  color: #000;
  background: #ffffff;
}

.module-nav .i-menu-item:hover {
  color: #2d90e6;
  background-color: transparent;
}

.module-container .module-content {
  position: absolute;
  width: auto;
  top: 0px;
  bottom: 0px;
  left: $moduleNavWidth;
  right: 0px;
  overflow: hidden;
  overflow-y: auto;
  /*background-color: #F6F7F9;*/
}

.module-container .module-content .breadcrumb-bar {
  background-color: #fff;
  z-index: 11;
  width: 100%;
  height: 48px;
  padding: 0 12px;
  line-height: 48px;
  border-bottom: 1px solid #e6e6e6;
}

.breadcrumb-bar .breadcrumb-path.i-breadcrumb {
  margin-right: 14px;
  line-height: 48px;
  display: inline-block;
}

.module-nav .i-menu-item-group__title {
  color: #333;
  height: 32px;
  font-size: 12px;
  border-bottom: 1px solid #e6e6e6;
}

.i-menu-item,
.i-submenu__title {
  height: 47px;
  line-height: 47px;
}

.delete-right-icon .i-submenu__title .i-icon-arrow-down {
  left: 20px;
  right: auto;
}

.folding .main-nav .i-submenu__title .i-submenu__icon-arrow.i-icon-arrow-down {
  opacity: 1;
}

.user-info {
  font-size: 14px;
  margin-right: -1px;
  margin-top: -8px;
}

.user-info li {
  color: #000!important;
}

.fill-block {
  display: block;
  width: 36px;
  height: 42px;
  margin-left: -36px;
}

.main-nav .right-mark {
  width: 100px;
}

.page-area {
  line-height: 1.5;
}

.user-email-info {
  color: #fff;
}
</style>
