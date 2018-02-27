<template lang="html">
  <div>
  	 <main>
      <ul class="countdown" v-show="showCountdown">
        <li>
          <span class="days">{{ days }}</span>
          <p>天</p>
        </li>
        <li class="seperator fitst-seperator">-</li>
        <li>
          <span class="hours">{{ hours }}</span>
          <p>时</p>
        </li>
        <li class="seperator">:</li>
        <li>
          <span class="minutes">{{ minutes }}</span>
          <p>分</p>
        </li>
        <li class="seperator">:</li>
        <li>
          <span class="seconds">{{ seconds }}</span>
          <p>秒</p>
        </li>
      </ul>
      <transition name="fade">
        <div class="promotional" v-show="!showCountdown">
          <h1>道枢综合联动平台</h1>
          <div @click="reseted">
            <a href="#" class="button">
              <img src="./images/reset.svg" alt="">
              <span>重置</span>
            </a>
        </div>
      </div>
      </transition>
  		<div class="-content -index" v-show="showCountdown">
				<div class="bounce-wrap">
					<div class="bounce">
						<div class="-shadow"></div>
						<div class="-box-wrap js-box-wrap">
							<div class="-box">
                <!-- <img class="logo" src="./images/logo.svg" alt=""> -->
								<div class="box-top wall"></div>
								<div class="front-right wall"></div>
								<div class="front-left wall"></div>
							</div>
						</div>
						<div id="emitter"></div>
					</div>
				</div>
  		</div>
  	</main>
  </div>
</template>

<script>
/*eslint-disable*/
import $ from 'jquery'
import moment from 'moment'
import { TweenMax, TimelineMax, TimelineLite, TweenLite } from 'gsap'

export default {
  name: 'PromotionalDecember',
  data() {
    return {
      days: '0',
      hours: '0',
      minutes: '0',
      seconds: '0',
      showCountdown: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
    this.countdown('2017-12-1 00:00:00')
  },
  methods: {
    addPrefix(time) {
      time = time.toString()
      if (time < 10) {
        return '0' + time
      }
      return time
    },
    countdown(dealline) {
      const self = this
      setInterval(function() {
        const endDate = Date.parse(new Date(dealline.replace(/-/g, '/')))
        const diffSecond = parseInt((endDate - new Date()) / 1000)
        if (diffSecond < 0) {
          return
        }
        const offset = moment.duration(diffSecond, 'seconds')
        self.days = self.addPrefix(offset.days())
        self.hours = self.addPrefix(offset.hours())
        self.minutes = self.addPrefix(offset.minutes())
        self.seconds = self.addPrefix(offset.seconds())
      }, 1000)
    },
    reseted() {
      $('#emitter').attr('style', '')
      this.showCountdown = true
      this.init()
    },
    init() {
      const self = this
      var emitter = document.getElementById('emitter'),
        container = document.createElement('div'),
        emitterSize = 100,
        dotQuantity = 50,
        dotSizeMax = 100,
        dotSizeMin = 10,
        speed = 1,
        gravity = 1

      container.setAttribute('id', 'emit-wrap')
      //setup the container with the appropriate styles
      container.style.cssText =
        'position:absolute; left:0; top:0; overflow:visible; z-index:5000; pointer-events:none;'
      document.body.appendChild(container)

      function createExplosion(container) {
        let tl = new TimelineLite({
          onComplete: function() {
            $('#emit-wrap').remove()
          }
        })
        let angle
        let length
        let dot
        let i
        let size
        //create all the dots
        for (i = 0; i < dotQuantity; i++) {
          dot = document.createElement('div')
          dot.className = 'emitter-dot'
          size = getRandom(dotSizeMin, dotSizeMax)
          container.appendChild(dot)
          angle = Math.random() * Math.PI * 2 //random angle
          //figure out the maximum distance from the center, factoring in the size of the dot (it must never go outside the circle), and then pick a random spot along that length where we'll plot the point.
          length = Math.random() * (emitterSize / 2 - size / 2)
          //place the dot at a random spot within the emitter, and set its size.
          TweenLite.set(dot, {
            x: Math.cos(angle) * length,
            y: Math.sin(angle) * length,
            width: size,
            height: size,
            xPercent: -50,
            yPercent: -50,
            force3D: true
          })
          //this is where we do the animation...
          tl.to(
            dot,
            1 + Math.random(),
            {
              opacity: 0,
              //if you'd rather not do physics, you could just animate out directly by using the following 2 lines instead of the physics2D:
              x: Math.cos(angle) * length * 24,
              y: Math.sin(angle) * length * 24
            },
            0
          )
        }
        return tl
      }

      function explode(element) {
        // debugger
        var explosion = createExplosion(container)

        var offset = $(element).offset()
        var width = $(element).width()
        var height = $(element).height()
        TweenLite.set(container, {
          x: offset.left + width / 2,
          y: offset.top + height / 2
        })
        explosion.restart()
      }

      function getRandom(min, max) {
        return min + Math.random() * (max - min)
      }

      $('.-content').one('click', function() {
        explode(emitter)
        $(emitter).hide()
        self.showCountdown = false
      })

      window.setTimeout(function() {
        $('.-content').click()
      }, 3450)
    }
  }
}
</script>

<style>
@import './PromotionalDecember.css';
.nav-bar {
  position: fixed !important;
  background: rgba(0, 0, 0, .66) !important;
}
</style>
<style scoped>
.promotional {
  margin-top: 21px;
  h1 {
    font-size: 48px;
    font-weight: 100;
    span {
      color: var(--primary-blue);
      font-weight: 400;
    }
  }
  p {
    margin-top: 14px;
    span {
      position: relative;
      top: -3px;
      font-size: 26px;
      font-weight: 100;
    }
  }
  .yundun-text {
    width: 140px;
  }
  .button {
    display: block;
    margin-top: 68px;
    cursor: pointer;
    text-align: center;
    border: 0;
    text-decoration: none;
    position: relative;
    color: #888888;
    span {
      position: relative;
      top: -2px;
    }
  }
}


.fade-enter-active {
  transition: opacity 3s;
}

.fade-enter {
  opacity: 0;
}

@-webkit-keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-25px);
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-25px);
  }
}

@-webkit-keyframes shadow {
  0% {
    background: rgba(0, 0, 0, 0.5);
    transform: scale(0.75) rotateX(75deg) rotateY(0deg) rotateZ(-45deg);
    box-shadow: 0 0 0px rgba(0, 0, 0, 0.6);
  }
  100% {
    background: rgba(0, 0, 0, 0.15);
    transform: scale(1) rotateX(75deg) rotateY(0deg) rotateZ(-45deg);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
}

@keyframes shadow {
  0% {
    background: rgba(0, 0, 0, 0.5);
    transform: scale(0.75) rotateX(75deg) rotateY(0deg) rotateZ(-45deg);
    box-shadow: 0 0 0px rgba(0, 0, 0, 0.6);
  }
  100% {
    background: rgba(0, 0, 0, 0.15);
    transform: scale(1) rotateX(75deg) rotateY(0deg) rotateZ(-45deg);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
}

.label {
  width: 100%;
  position: absolute;
  text-align: center;
}

.label small {
  display: block;
  margin-bottom: 1em;
}

main {
  height: 100vh;
  text-align: center;
}

main .-content {
  position: relative;
  height: 100vh;
  margin-top: -20px;
  .logo {
    position: absolute;
    top: 44px;
    left: 14px;
    width: 36px;
    opacity: 0;
    transition: all .1s;
  }
}

main .-content>div {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}

main .-content.-index {
  width: 100%;
}

main .-content.-index>div {
  vertical-align: middle;
}

.bounce-wrap {
  display: block;
  height: 90px;
  &:hover {
    .logo {
      opacity: 1;
      transition-delay: .2s;
    }
    .bounce .-box .box-top {
      transform: translateX(32px) translateY(32px) rotateY(90deg) rotateX(90deg);
      transition: all .2s;
    }
    .bounce .-box .front-left {
      transition: all .2s;
      transition-delay: .1s;
      transform: rotateX(0deg) rotateY(0deg) translateZ(-32px) translateY(32px);
    }

    .bounce .-box .front-right {
      transition: all .2s;
      transition-delay: .2s;
      transform: translateX(-32px) rotateY(90deg) translateY(32px);
    }
  }
}

.bounce {
  position: relative;
  margin: 4rem 0;
}

.bounce .-box,
.bounce .-box-wrap,
.bounce .-shadow {
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.bounce .-shadow {
  bottom: -180px;
  height: 64px;
  width: 64px;
  background: rgba(0, 0, 0, 0.5);
  transform: scale(0.75) rotateX(75deg) rotateY(0deg) rotateZ(-45deg);
  box-shadow: 0 0 0px rgba(0, 0, 0, 0.6);
  animation: shadow 400ms cubic-bezier(0.165, 0.84, 0.44, 1) infinite alternate;
}

.bounce .-box-wrap {
  transform: translateY(0);
  animation: bounce 400ms cubic-bezier(0.165, 0.84, 0.44, 1) infinite alternate;
}

.bounce .-box {
  width: 64px;
  height: 64px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(-14deg) rotateY(-45deg) rotateZ(0deg);
}

.bounce .-box .wall {
  width: 64px;
  height: 64px;
  position: absolute;
  transition: all 1s ease-out;
  backface-visibility: hidden;
}

.bounce .-box .box-top {
  height: 64px;
  background: #a5ecfe;
  transform-style: preserve-3d;
  transform: translateX(32px) translateY(-32px) rotateY(90deg) rotateX(90deg);
  transform-origin: 50% 100%;
  height: 64px;
  transition: all .2s;
  z-index: 1;
}

.bounce .-box .front-left {
  background: #00cffe;
  height: 64px;
  transform: rotateX(0deg) rotateY(0deg) translateZ(32px) translateY(32px);
  transition: all .2s;
  transition-delay: .1s;
  transform-origin: 50% 100%;
}

.bounce .-box .front-right {
  transition: all .2s;
  transition-delay: .2s;
  background: #4babeb;
  height: 64px;
  transform: translateX(32px) rotateY(90deg) translateY(32px);
  transform-origin: 50% 100%;
}
</style>
