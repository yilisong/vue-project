<template lang="html">
<div class="solution-container">
  <div class="product-container">
    <h2>专业的解决方案</h2>
    <ul class="menu">
      <li @click="switchType('net')" v-bind:class="{active:solution.net}">互联网数据中心（IDC）</li>
      <li @click="switchType('finance')" v-bind:class="{active:solution.finance}">金融行业</li>
      <li @click="switchType('game')" v-bind:class="{active:solution.game}">棋牌游戏</li>
      <li @click="switchType('government')" v-bind:class="{active:solution.government}">政企行业</li>
    </ul>
    <div class="">
      <ul>
        <li v-bind:class="{'solution-fade':solution.net}" v-show="solution.net">
          <div class="solution-box">
            <h3>互联网数据中心（IDC）安全解决方案</h3>
            <p class="content">为数据中心用户提供DDoS清洗服务、虚拟化系统、安全服务、安全合规服务和增值服务，完美解决IDC自身安全需求的同时，助力IDC转型和提升行业竞争能力。</p>
            <p class="demand">行业需求 &emsp;<span class="emphasis">DDoS攻击防护、安全合规要求、业务升级要求、用户安全需求</span></p>
            <div class="">
              <h5 class="client-case">客户案例</h5>
              <div class="case-pic">
                <img src="../assets/images/index-solution/idc.png" alt="">
              </div>
            </div>
          </div>
          <img src="../assets/images/index-solution/data.png" alt="" class="type-icon">
        </li>
        <li v-show="solution.finance" v-bind:class="{'solution-fade':solution.finance}">
          <div class="solution-box">
            <h3>新金融行业安全解决方案</h3>
            <p class="content">从网络、业务、数据多个维度为新金融客户在应用、业务、可用等安全领域提供量身定制的个性化安全解决方案，通过立体防护机制、大数据日志联动分析抵御多种恶意攻击，结合资深安全专家服务，助力新金融行业做到全面合规、持续发展，保障业务和数据安全。</p>
            <p class="demand">行业需求 &emsp;<span class="emphasis">业务安全、黑客入侵防护、流量攻击防护、安全合规、服务质量QoS</span></p>
            <div class="">
              <h5 class="client-case">客户案例</h5>
              <div class="case-pic">
                <img src="../assets/images/index-solution/finance_little.png" alt="">
              </div>
            </div>
          </div>
          <img src="../assets/images/index-solution/finance.png" alt="" class="type-icon">
        </li>
        <li v-show="solution.game" v-bind:class="{'solution-fade':solution.game}">
          <div class="solution-box">
            <h3>棋牌游戏安全解决方案</h3>
            <p class="content">针对棋牌游戏行业应用安全、业务安全、可用性安全，为游戏运营商量身打造的云、管、端立体安全服务方案。抵御大流量攻击、CC攻击，进行APP加固等。结合多年的攻防实战经验，为游戏运营打造最全面、可信赖的安全解决方案。</p>
            <p class="demand">行业需求 &emsp;<span class="emphasis">应用安全、业务安全、可用性安全</span></p>
            <div class="case-pic">
              <h5 class="client-case">客户案例</h5>
              <div class="">
                <img src="../assets/images/index-solution/game_logo.png" alt="">
              </div>
            </div>
          </div>
          <img src="../assets/images/index-solution/game.png" alt="" class="type-icon">
        </li>
        <li v-show="solution.government" v-bind:class="{'solution-fade':solution.government}">
          <div class="solution-box">
            <h3>政企行业安全解决方案</h3>
            <p class="content">为政府、教育、医疗等公共服务单位的门户、合规系统、核心应用、关键基础设施等政务业务及行业主管单位的预警、通报等监管需求，提供量身定制的合规、安全、可靠的政务专属安全解决方案。</p>
            <p class="demand">行业需求 &emsp;<span class="emphasis">系统漏洞、页面篡改、信息泄漏、监管挑战</span></p>
            <div class="">
              <h5 class="client-case">客户案例</h5>
              <div class="">
                <img src="../assets/images/index-solution/government_logo.png" alt="" class="fit-position">
              </div>
            </div>
          </div>
          <img src="../assets/images/index-solution/government.png" alt="" class="type-icon">
        </li>
      </ul>
    </div>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      solution: {
        net: true,
        finance: false,
        game: false,
        government: false
      }
    }
  },
  methods: {
    switchType(type) {
      for (const i in this.solution) {
        this.solution[i] = i === type
      }
    }
  }
}
</script>

<style lang="css" scoped>
@import "../index-common.css";
.solution-container {
  background: url('../assets/images/index-solution/bg.jpg')center center no-repeat;
  height: 730px;
}

.solution-container .product-container .menu {
  text-align: center;
  cursor: pointer;
  .active {
    background: #EEF6FC;
    border-color: #2d90e6;
  }
  .active+li {
    border-left-color: #2d90e6;
  }
  li {
    width: 17%;
    box-sizing: border-box;
    display: inline-block;
    letter-spacing: 1px;
    background: #fff;
    border: 1px solid #cdcdcd;
    padding: 16px 0;
  }
  li+li {
    margin-left: -5px;
  }
}

.solution-box {
  width: 63.5%;
  display: inline-block;
  vertical-align: top;
  margin-top: 56px;
  h3 {
    font-size: 25px;
    font-weight: 100;
    text-align: left;
  }
  p {
    text-align: left;
  }
  .content {
    line-height: 1.5;
    padding: 24px 0 33px 0;
  }
  .demand {
    padding-bottom: 20px;
    border-bottom: 1px solid #cdcdcd;
  }
  .emphasis {
    color: #2d90e6;
  }
  .client-case {
    text-align: left;
    padding: 19px 0 25px 0;
    font-size: 14px;
    font-weight: 100;
  }
}

.type-icon {
  display: inline-block;
  vertical-align: top;
}

.solution-fade {
  animation-duration: .8s;
  animation-fill-mode: both;
  animation-name: fadeIn;
}

.case-pic {
  text-align: left;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fit-position {
  margin-left: -5px;
  display: block;
}
</style>
