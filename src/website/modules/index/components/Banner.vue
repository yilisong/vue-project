<template lang="html">
<div class="index-container" id="indexContainer">
  <el-carousel trigger="click" height="658px" :initial-index="defaultIndex" @change="carouselAni" :interval="delayTime">
    <!-- <el-carousel-item name="third">
      <div class="activity-hwws-bg">
        <div class="banner-box">
          <img src="../assets/images/index-banner/pic.png" alt="" class="activity-hwws-left" v-bind:class="{fadeIn:aniData.third}">
          <div class="activity-hwws-right" v-bind:class="{fadeIn:aniData.third}">
            <img src="../assets/images/index-banner/big_title.png" alt="">
            <div class="activity-hwws-btn" @click="contact">
            </div>
          </div>
        </div>
      </div>
    </el-carousel-item> -->
    <!--v5蝶变普通页面-->
    <el-carousel-item name="first">
      <div class="banner-bg">
        <div class="banner-box">
          <img src="../assets/images/index-banner/butterfly_title.png" alt="" class="logo-five" v-bind:class="{slideInDown:aniData.first}">
          <div class="banner-content fit-new" v-bind:class="{flipInX:aniData.first}">
            <h1 class="title">YUNDUN V5</h1>
            <p>致力于打造新一代场景化云服务平台。为Web和移动应用提供更快、更安全、更懂业务的智慧
              <br>产品，为网络空间提供新一代云安全解决方案。</p>
            <a class="banner-btn" :href="consoleHref">立即体验</a>
          </div>
        </div>
      </div>
    </el-carousel-item>
    <!-- <el-carousel-item name="first">
      <div class="activity-bg-pure">
        <div class="activity-bg">
          <div class="banner-box">
            <img src="../assets/images/index-banner/banner_copy.png" v-bind:class="{fadeIn:aniData.first}" >
            <span class="day-detail" v-bind:class="{fadeIn:aniData.first}">{{day}}</span>
          </div>
        </div>
      </div>
    </el-carousel-item> -->
    <!--安孵计划普通页面-->
    <el-carousel-item name="second">
      <div class="plan-bg">
        <img src="../assets/images/index-banner/little_ball.png" alt="" class="mid-ball" v-bind:class="{'fadeIn':aniData.second}">
        <img src="../assets/images/index-banner/mid_ball.png" alt="" class="fade-ball" v-bind:class="{'fadeIn':aniData.second}">
        <img src="../assets/images/index-banner/big_ball.png" alt="" class="big-ball" v-bind:class="{'fadeIn':aniData.second}">
        <img src="../assets/images/index-banner/left_ball.png" alt="" class="little-ball" v-bind:class="{'fadeIn':aniData.second}">
        <div class="banner-box">
          <img src="../assets/images/index-banner/bar_left.png" alt="" class="bar-left" v-bind:class="{'slideInUp':aniData.second}">
          <img src="../assets/images/index-banner/bar_right.png" alt="" class="bar-right" v-bind:class="{'slideInUp':aniData.second}">
          <div class="plan-content" v-bind:class="{'fadeInDown':aniData.second}">
            <img src="../assets/images/index-banner/plan_text.svg" alt="" class="plan-title">
            <p class="free-content">致力于帮助非营利性组织或初创企业构建优质、免费的业务安全保障</p>
            <a target="_blank" href="/hatch-plan" class="banner-btn">立即参与</a>
          </div>
        </div>
      </div>
    </el-carousel-item>
    <!--红网卫士普通页面-->
    <el-carousel-item name="third">
      <div class="hwws-bg">
        <img src="../assets/images/index-banner/picred.png" alt="" class="hwws-block-left" v-bind:class="{'fadeIn':aniData.third}">
        <img src="../assets/images/index-banner/picred.png" alt="" class="hwws-block-right" v-bind:class="{'fadeIn':aniData.third}">
        <img src="../assets/images/index-banner/dot_net.png" alt="" class="hwws-net" v-bind:class="{'fadeInUp':aniData.third}">
        <img src="../assets/images/index-banner/ball.png" alt="" class="hwws-grid-ball" v-bind:class="{'slideInUp':aniData.third}">
        <div class="banner-box">
          <img src="../assets/images/index-banner/001.png" alt="" class="dot-one bounce">
          <img src="../assets/images/index-banner/002.png" alt="" class="dot-two bounce">
          <img src="../assets/images/index-banner/003.png" alt="" class="dot-three bounce">
          <img src="../assets/images/index-banner/004.png" alt="" class="dot-four bounce">
          <img src="../assets/images/index-banner/005.png" alt="" class="dot-five bounce">
          <img src="../assets/images/index-banner/006.png" alt="" class="dot-six" v-bind:class="{'slideInUp':aniData.third}">
          <div class="plan-content" v-bind:class="{'fadeIn':aniData.third}">
            <h1 class="hwws-title">红网卫士<img src="../assets/images/index-banner/waf.svg" class="mark"></h1>
            <p class="free-content hwws-state">通过大数据行为模型对黑客进行全网追溯，让攻击可感知、可防御、可追溯、可推演</p>
            <a target="_blank" href="/red-guard" class="banner-btn">立即体验</a>
          </div>
        </div>
      </div>
    </el-carousel-item>
    <!--太极抗D普通页面-->
    <el-carousel-item name="forth">
      <div class="tjkd-bg">
        <img src="../assets/images/index-banner/single_line.png" alt="" class="single-line">
        <img src="../assets/images/index-banner/double_line.png" alt="" class="double-line">
        <img src="../assets/images/index-banner/multiple_line.png" alt="" class="multiple-line">
        <div class="lines lines-left" v-bind:class="{fadeIn:aniData.forth}">
        </div>
        <div class="lines lines-right" v-bind:class="{fadeIn:aniData.forth}">
        </div>
        <div class="banner-box">
          <div class="tjkd-content" v-bind:class="{fadeIn:aniData.forth}">
            <div class="tjkd-pic-box">
              <img src="../assets/images/index-banner/tjkd_title.svg" alt="" class="tjkd-word-logo">
              <p class="tjkd-word-title">致力于大规模抗DDoS服务</p>
            </div>
            <p class="tjkd-word-content">全业务支持 / 多层级清洗 / 100%清洗能力 / 详细数据报表</p>
            <a target="_blank" href="taichiddosPlus" class="banner-btn">立即体验</a>
          </div>
          <img src="../assets/images/index-banner/tjkd_ball.png" alt="" class="tjkd-logo" v-bind:class="{fadeInRightLine:aniData.forth}">
        </div>
      </div>
    </el-carousel-item>
    <!--盾眼普通页面-->
    <el-carousel-item name="seventh">
      <div class="dunyan-bg" v-bind:class="{fadeIn:aniData.fifth}">
        <img src="../assets/images/index-banner/dunyanbg.png" alt="" class="eye-left">
        <img src="../assets/images/index-banner/dunyanbg.png" alt="" class="eye-right">
        <div class="banner-box">
          <img src="../assets/images/index-banner/dunyan.png" alt="" class="eyes-img" v-bind:class="{slideInDown:aniData.fifth}">
          <div class="banner-content fit-new eyes-content" v-bind:class="{fadeIn:aniData.fifth}">
            <h1 class="eyes-title">风险观测</h1>
            <p>利用分布式集群和大数据分析模型，精准洞察应用漏洞、迅速捕获应用异
              <br>常，高效直观呈现观测数据。</p>
            <a target="_blank" href="/risk-detect" class="banner-btn">立即体验</a>
          </div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import moment from 'moment'
import SourceWebResource from '../../../static/js/SourceWebResource'
import diffDate from 'common/utils/diffDate'
import {
  BASE_URL
} from 'common/config/interceptor'
import {
  JSONP
} from 'common/assets/js/normal'
import axios from 'axios'
import help from 'common/utils/help'
export default {
  data() {
    return {
      defaultIndex: 0,
      resume: false,
      deadline: false,
      delayTime: 6000,
      day: '',
      consoleHref: '/login',
      aniData: {
        first: false,
        second: false,
        third: false,
        forth: false,
        fifth: false,
        sixth: false,
        seventh: false
      }
    }
  },
  mounted() {
    // const time = diffDate('2017-09-17 00:00:00')
    // this.day = time.indexOf('天') !== -1 ? diffDate('2017-09-17 00:00:00').split('天')[0] : 1
    // this.deadline = moment('2017-09-17 00:00:00').fromNow().indexOf('前') !== -1
    // this.resume = moment('2017-10-01 00:00:00').fromNow().indexOf('前') !== -1
    // console.log(moment('2017-09-17 00:00:00').fromNow(), '----')
    SourceWebResource.getUserInfo()
      .then(response => {
        if (response.status === 200) {
          if (response.data.email) {
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
        JSONP.getJSON(
          BASE_URL + '/sso/V4/attach', {
            callback: '?'
          },
          res => {}
        )
      })
  },
  methods: {
    switchover(index, data) {
      for (const i in data)
        data[i] = (i === index)
    },
    carouselAni(index) {
      let mark = 'first'
      switch (index) {
        case 0:
          mark = 'first'
          break
        case 1:
          mark = 'second'
          break
        case 2:
          mark = 'third'
          break
        case 3:
          mark = 'forth'
          break
        case 4:
          mark = 'fifth'
          break
        case 5:
          mark = 'sixth'
          break
        case 6:
          mark = 'seventh'
          break
      }
      this.switchover(mark, this.aniData)
    },
    contact() {
      help.linkService()
    }
  }
}
</script>

<style lang="css" scoped>
@import "../assets/css/banner.css";
.el-carousel__item .activity-bg-pure {
  background: linear-gradient(to bottom, #104287, #0a2455);
}

.el-carousel__item .activity-bg-pure .activity-bg {
  background-image: url('../assets/images/index-banner/activity_bg.jpg');
  background-repeat: repeat-x;
  height: 658px;
}

.btn-signup a,
.banner-content a,
.banner-btn {
  font-size: 15px;
  padding: 14px 45px;
  display: inline-block;
  background: rgba(255, 255, 255, .04);
  border: 1px solid currentColor;
  color: #fff;
  letter-spacing: 2px;
}


/*.el-carousel__item .activity-bg {
  background: url("../assets/images/index-banner/bannerbg.jpg")center center no-repeat;
  background-size: cover;
  height: 100%;
}*/

.banner-box .banner-content h1 {
  font-size: 50px;
  font-weight: 100;
}

.el-carousel__item .plan-bg {
  position: relative;
  background: #34a2ff\9\0;
  background: linear-gradient(to right, #1e35b8, #323232);
  height: 100%;
}

.plan-content {
  color: #fff;
  text-align: center;
  height: 300px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  .plan-title {
    padding: 27px 0 20px 0;
    width: 399px;
  }
}

.plan-content .free-content {
  /* margin-bottom: 30px; */
  padding: 10px 0;
  font-size: 16px;
  margin-bottom: 49px;
  letter-spacing: 2px;
}

.banner-btn {
  border-radius: 3px;
}

.banner-box .bar-left {
  position: absolute;
  top: 33.7%;
  left: 17%;
}

.banner-box .bar-right {
  position: absolute;
  right: 14.5%;
  top: 30%;
}

.el-carousel__item .tjkd-bg {
  position: relative;
  background: #27113d\9\0;
  background: linear-gradient(to bottom, #15161b, #0f1d52);
  height: 100%;
}

.big-ball {
  position: absolute;
  bottom: 0;
  right: -120px;
}

.little-ball {
  position: absolute;
  top: 30%;
  left: 0;
}

.fade-ball {
  position: absolute;
  top: -100px;
  left: 15%;
}

.mid-ball {
  position: absolute;
  bottom: 25px;
  left: 29%;
}

.tjkd-bg .lines {
  display: inline-block;
  width: 755px;
  height: 100%;
  background-image: url("../assets/images/index-banner/dot.png");
  background-repeat: repeat-y;
  position: absolute;
}

.tjkd-bg .lines-left {
  transform: rotateY(180deg);
  left: 0;
  bottom: 0;
}

.tjkd-bg .lines-right {
  right: 0;
  bottom: 0;
}

.tjkd-word-logo {
  width: 276px;
  height: 66px;
  display: inline-block;
  vertical-align: bottom;
}

.tjkd-word-title {
  font-size: 20px;
  display: inline-block;
  letter-spacing: 3px;
  padding-left: 18px;
}

.tjkd-word-content {
  padding: 20px 0 30px 1px;
  font-size: 15px;
  letter-spacing: 3px;
}

.tjkd-logo {
  position: absolute;
  right: -8.5%;
  bottom: -77px;
}

.tjkd-content {
  color: #fff;
  position: absolute;
  left: 1%;
  bottom: 240px;
}

.single-line {
  position: absolute;
  left: 9%;
  top: 40px;
  animation: shining 3s ease-in-out 400ms infinite;
}

.double-line {
  position: absolute;
  left: 39.5%;
  top: 35%;
  animation: shining 2.5s ease-in-out 300ms infinite;
}

.multiple-line {
  position: absolute;
  left: 30.5%;
  bottom: 120px;
  animation: shining 4s ease-out 600ms infinite;
}

.banner-box .banner-content .eyes-title {
  font-size: 35px;
  font-weight: 100;
}

@keyframes shining {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}

.hwws-bg {
  position: relative;
  background: #030025\9\0;
  background: linear-gradient(to bottom, #000215, #030025);
  height: 100%;
}

.hwws-title {
  font-size: 60px;
  font-weight: 100;
  letter-spacing: 10px;
  img {
    width: 150px;
    display: inline-block;
  }
}

.plan-content .hwws-state {
  padding-top: 20px;
  margin-bottom: 40px;
}

.hwws-block-left,
.hwws-block-right {
  position: absolute;
  bottom: 0;
}

.dot-one {
  position: absolute;
  bottom: 21.5%;
  left: 28.5%;
  animation-delay: 1.5s;
}

.dot-two {
  position: absolute;
  right: 35%;
  bottom: 0;
  animation-delay: 1.5s;
}

.dot-three {
  position: absolute;
  left: 41.5%;
  bottom: 0;
}

.dot-four {
  position: absolute;
  right: 17%;
  bottom: 0;
}

.dot-five {
  position: absolute;
  bottom: 12%;
  left: 10.5%;
}

.dot-six {
  position: absolute;
  bottom: 31.5%;
  right: 30%;
}

.hwws-block-left {
  left: 0;
}

.hwws-block-right {
  right: 0;
  transform: rotateY(180deg);
}

.hwws-net,
.hwws-grid-ball {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.hwws-grid-ball {
  top: 130px;
}

.dunyan-bg {
  position: relative;
  background: linear-gradient(to bottom, #001538, #4a758c);
  background: #4a758c\9\0;
  height: 100%;
}

.eyes-img {
  position: absolute;
  top: 95px;
  left: -152px;
}

.eye-left {
  position: absolute;
  left: 0;
  bottom: 0;
}

.eye-right {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: rotateY(180deg);
}

.el-carousel__item .banner-box .eyes-content {
  position: absolute;
  top: 36%;
  right: 14px;
  color: #fff;
}

.day-detail {
  position: absolute;
  color: #fff;
  font-size: 46px;
  font-style: italic;
  font-weight: bolder;
  bottom: 215px;
  left: 567px;
}

.pendant {
  background: url('../assets/images/index-banner/sale.png')center center no-repeat;
  position: absolute;
  width: 57px;
  height: 85px;
  display: block;
  left: 651px;
  bottom: 115px;
}

.banner-box:hover .pendant {
  background: url('../assets/images/index-banner/sales.gif')center center no-repeat;
}

.activity-hwws-bg {
  height: 100%;
  background: url('../assets/images/index-banner/bg.jpg')center center no-repeat;
  background-size: cover;
}

.activity-hwws-left {
  position: absolute;
  top: 25%;
  left: -100px;
}

.activity-hwws-right {
  position: absolute;
  top: 31.5%;
  right: 60px;
}

.activity-hwws-btn {
  width: 165px;
  height: 72.4px;
  background: url('../assets/images/index-banner/button.svg')center center no-repeat;
  margin-top: 30px;
  margin-left: 1px;
  cursor: pointer;
}

.activity-tf-bg {
  display: block;
  height: 100%;
  background: url('../assets/images/index-banner/banner_first.jpg')center center no-repeat;
  background-size: cover;
}

.activity-tf-box {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  position: relative;
}

.deco-right {
  display: block;
  position: absolute;
  right: 0;
  right: -350px;
}

.deco-left {
  display: block;
  position: absolute;
  top: 144px;
  left: -150px;
}

.eleven-bg {
  display: block;
  height: 100%;
  background: #0c1133;
}

.eleven-title {
  width: 712px;
  height: 323px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 100;
  text-align: center;
}

.activity-eleven-box {
  position: relative;
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  background: url(/static/images/dot.52ae03d.png)center center no-repeat;
}

.group-one {
  position: absolute;
  bottom: 0;
  left: -62px;
  z-index: 1;
}

.group-two {
  position: absolute;
  top: 0;
  left: 226px;
}

.group-three {
  position: absolute;
  bottom: 0;
  right: -176px;
}

.eleven-state {
  margin-top: 18px;
  color: #fff;
}

.eleven-shine {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>
