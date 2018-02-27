<template lang="html">
<div class="">
  <div class="">
    <div class="join-container">
      <img src="../static/images/lines_left.png" alt="" class="lines-left">
      <img src="../static/images/lines_right.png" alt="" class="lines-right">
      <div class="join-box">
        <i class="star-deco-big star-position-1"></i>
        <i class="star-deco-little star-position-2"></i>
        <i class="star-deco-trans star-position-3"></i>
        <i class="star-deco-trans star-position-4"></i>
        <h2>立即加入，开启安全之旅</h2>
        <div class="btn-signup">
          <a :href="consoleHref" target="_blank">立即体验</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import SourceWebResource from '../static/js/SourceWebResource'
import {
  BASE_URL
} from 'common/config/interceptor'
import {
  JSONP
} from 'common/assets/js/normal'
export default {
  data() {
    return {
      consoleHref: '/login'
    }
  },
  mounted() {
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
      })
      .catch(error => {
        JSONP.getJSON(
          BASE_URL + '/sso/V4/attach', {
            callback: '?'
          },
          res => {}
        )
      })
  }
}
</script>

<style lang="css" scoped>
.join-container {
  /*margin-top: 56px;*/
  padding: 65px 0;
  text-align: center;
  background: #1085d7\9\0;
  background-image: linear-gradient(to right, #23a9fc, #0c59cc);
  position: relative;
}

.join-box {
  width: 1000px;
  margin: 0 auto;
  position: relative;
}

.join-container h2 {
  font-size: 32px;
  font-weight: 100;
  color: #fff;
  padding-bottom: 32px;
  letter-spacing: 1px;
}

.btn-signup a,
.banner-content a,
.banner-btn {
  font-size: 15px;
  padding: 14px 40px;
  display: inline-block;
  background: rgba(255, 255, 255, .04);
  border: 1px solid currentColor;
  color: #fff;
}

.btn-signup a+a {
  margin-left: 28px;
}

.star-position-1 {
  position: absolute;
  right: 27%;
  top: -14%;
}

.star-position-2 {
  position: absolute;
  left: 26%;
  top: 50%;
}

.star-position-3 {
  position: absolute;
  left: 41.7%;
  top: -21%;
}

.star-position-4 {
  position: absolute;
  top: 38%;
  right: 24%;
}


/*.star-deco-big{
  display: inline-block;
  width: 15px;
  width: 15px;
}*/

.star-deco-big::before,
.star-deco-big::after {
  content: "";
  display: inline-block;
  background: #fff;
  width: 1px;
  height: 15px;
  box-shadow: 0px 0px 3px rgba(255, 255, 255, .7);
  animation: shining 3.3s ease-out 225ms infinite;
}

.star-deco-little::before,
.star-deco-little::after {
  content: "";
  display: inline-block;
  background: #fff;
  width: 1px;
  height: 11px;
  box-shadow: 0px 0px 3px rgba(255, 255, 255, .7);
  animation: shining 3.5s ease-out 375ms infinite;
}

.star-deco-trans::before,
.star-deco-trans::after {
  content: "";
  display: inline-block;
  background: rgba(255, 255, 255, 1);
  width: 1px;
  height: 11px;
  box-shadow: 0px 0px 3px rgba(255, 255, 255, .7);
  animation: shining 3s ease-out 425ms infinite;
}

.star-deco-big::after,
.star-deco-little::after,
.star-deco-trans::after {
  transform: rotate(90deg);
}

@keyframes shining {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

.lines-left {
  position: absolute;
  left: 0;
  top: 30%;
}

.lines-right {
  position: absolute;
  right: 0;
  top: 35%;
}
</style>
