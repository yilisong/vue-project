<template lang="html">
<div class="product-container service">
  <h2>安全服务</h2>
  <ul class="service-container">
    <li v-bind:class="{'active':!service.refer}" @mouseenter="switchCard('refer')" @mouseleave="judgeAll('refer')">
      <div class="safe-box">
        <h3 class="safe-title refer">安全咨询<i class="safe-refer normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.refer">
          <h4>等保咨询</h4>
          <h4>风险评估</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.refer" v-bind:class="{'safe-fade':!service.refer}">
          <div class="">
            <h4>等保咨询</h4>
            <p>遵循国家等级保护要求，帮助客户完成信息系统达标建设，通过测评中心的测评</p>
            <a href="/consult">查看详情...</a>
          </div>
          <div class="">
            <h4>风险评估</h4>
            <p>针对客户关键业务信息系统从管理上和技术上两方面开展全面的评估活动</p>
            <a href="/assess">查看详情...</a>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.app}" @mouseenter="switchCard('app')" @mouseleave="judgeAll('app')">
      <div class="safe-box">
        <h3 class="safe-title app">应用安全检测<i class="safe-app normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.app">
          <h4>源代码审计及验证</h4>
          <h4>安全测试和渗透服务</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.app" v-bind:class="{'safe-fade':!service.app}">
          <div class="">
            <h4>源代码审计及验证</h4>
            <p>使用专业代码审计设备对网站源代码的逻辑流程、编程规范性、安全特性等方面进行审计</p>
            <a href="/verify">查看详情...</a>
          </div>
          <div class="">
            <h4>安全测试和渗透服务</h4>
            <p>通过对目标（WEB/APP/微信）进行安全检查和漏洞扫描，全面了解信息系统安全状况</p>
            <a href="/service">查看详情...</a>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.polling}" @mouseenter="switchCard('polling')" @mouseleave="judgeAll('polling')">
      <div class="safe-box">
        <h3 class="safe-title polling">安全巡检<i class="safe-polling normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.polling">
          <h4>安全审查</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.polling" v-bind:class="{'safe-fade':!service.polling}">
          <div class="">
            <h4>安全审查</h4>
            <p>通过对信息资产（网络，服务器、数据库、WEB等）进行定期的本地安全审查及加固</p>
            <a href="/polling">查看详情...</a>
          </div>
        </div>
      </div>
    </li>
    <li v-bind:class="{'active':!service.safeguard}" @mouseenter="switchCard('safeguard')" @mouseleave="judgeAll('safeguard')">
      <div class="safe-box">
        <h3 class="safe-title safeguard">安全协查与保障<i class="safe-safeguard normal-icon"></i></h3>
        <hr>
        <div class="brief" v-show="service.safeguard">
          <h4>安全重保</h4>
          <h4>应急响应</h4>
          <i class="so-on"></i>
        </div>
        <div class="details-box" v-show="!service.safeguard" v-bind:class="{'safe-fade':!service.safeguard}">
          <div class="">
            <h4>安全重保</h4>
            <p>丰富的政府及企业客户的重保经验，提供重大活动的网络安全保障、人工值守服务</p>
            <a href="/guarantor">查看详情...</a>
          </div>
          <div class="">
            <h4>应急响应</h4>
            <p>在网站遭到黑客攻击时进行响应，抑制事件的影响程度，并且调查黑客入侵手段</p>
            <a href="/respond">查看详情...</a>
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      service: {
        refer: false,
        app: true,
        polling: true,
        safeguard: true
      }
    }
  },
  methods: {
    switchCard(type) {
      for (const i in this.service) {
        this.service[i] = !(i === type)
      }
    },
    judgeAll(type) {
      let isAll = false
      for (const i in this.service) {
        if (i !== type)
          isAll = this.service[i]
      }
      this.service[type] = !isAll
    }
  }
}
</script>

<style lang="css" scoped>
@import "../index-common.css";
.service {
  height: 720px;
}

.service-container {
  li {
    display: inline-block;
    width: 24%;
    height: 305px;
    box-sizing: border-box;
    vertical-align: top;
    position: relative;
    padding: 22px;
    margin-left: -4px;
    transition: all .3s cubic-bezier(.4, 0, .2, 1), z-index 0s .12s;
  }
  li+li::before {
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    height: 175px;
    background: #efefef;
    left: 0;
    top: 147px;
  }
}

.title-icon {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.safe-box {
  .safe-title {
    position: relative;
    padding: 20px 0;
    font-weight: 100;
    margin-top: 38px;
  }
  .normal-icon {
    position: absolute;
    display: block;
    width: 35px;
    height: 34px;
    bottom: 100%;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  hr {
    background: #efefef;
  }
  .brief {
    padding: 30px 0;
    h4 {
      font-size: 14px;
      color: #333;
    }
    h4+h4 {
      margin-top: 25px;
    }
  }
}

.safe-refer {
  background: url('../assets/images/index-service/safe_refer.png')center center no-repeat;
}

.active .safe-refer {
  background: url('../assets/images/index-service/safe_refer_blue.png')center center no-repeat;
}

.safe-app {
  background: url('../assets/images/index-service/safe_app.png')center center no-repeat;
}

.active .safe-app {
  background: url('../assets/images/index-service/safe_app_blue.png')center center no-repeat;
}

.safe-polling {
  background: url('../assets/images/index-service/safe_polling.png')center center no-repeat;
}

.active .safe-polling {
  background: url('../assets/images/index-service/safe_polling_blue.png')center center no-repeat;
}

.safe-safeguard {
  background: url('../assets/images/index-service/safe_safeguard.png')center center no-repeat;
}

.active .safe-safeguard {
  background: url('../assets/images/index-service/safe_safeguard_blue.png')center center no-repeat;
}

.refer+hr,
.polling+hr {
  width: 30%;
}

.app+hr {
  width: 45%;
}

.safeguard+hr {
  width: 47%;
}

.so-on {
  position: relative;
  margin: 0 auto;
  margin-top: 30px;
}

.so-on,
.so-on::before,
.so-on::after {
  background: #2d90e6;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  display: block;
}

.so-on::before,
.so-on::after {
  content: "";
  position: absolute;
  margin: 0 2px;
}

.so-on::before {
  right: 100%;
}

.so-on::after {
  left: 100%;
}

.service-container .active {
  position: relative;
  /*width: 24.3%;*/
  height: 396px;
  /*border-bottom: 3px solid #2d90e6;*/
  box-shadow: 0 0 5px #dadcdf;
  .safe-box hr {
    width: 100%;
    background: #2d90e6;
    transition: all .3s cubic-bezier(.4, 0, .2, 1), z-index 0s .8s;
  }
  .details-box {
    transition: all .7s;
    h4,
    p {
      text-align: left;
      color: #333;
    }
    h4 {
      font-size: 14px;
      margin-top: 30px;
    }
    p {
      font-size: 12px;
      margin-top: 10px;
      line-height: 1.5;
    }
    a {
      text-align: left;
      display: block;
      margin-top: 14px;
      color: #2d90e6;
      font-size: 12px;
    }
  }
}

.service-container .active::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 3px;
  background: #2d90e6;
  left: 0;
  bottom: 0;
  transition: all .3s;
}

.safe-fade {
  animation-duration: .7s;
  animation-fill-mode: both;
  animation-name: fadeIn;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
