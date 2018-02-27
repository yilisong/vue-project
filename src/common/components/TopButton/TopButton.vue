<template lang="html">
<div class="">
  <div class="top">
    <div class="top-button qq" @click="findHelp">
      <div class="pop-box">
        <a href="#">技术客服</a>
      </div>
    </div>
    <div class="top-button contact">
      <div class="pop-box">
        400-999-7070
      </div>
    </div>
    <transition name="fade">
      <div class="top-button back" @click="scrollSmooth" v-show="backAppear">
      </div>
    </transition>
  </div>
</div>
</template>

<script>
import help from 'common/utils/help'
export default {
  props: {
    currentHeight: {
      type: Number
    }
  },
  watch: {
    currentHeight(newValue) {
      this.backAppear = newValue > 500
    }
  },
  data() {
    return {
      backAppear: false
    }
  },
  mounted() {

  },
  methods: {
    findHelp() {
      console.log(help,'help')
      help.linkService()
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
    scrollSmooth() {
      const currentScroll = this.getScrollTop()
      if (currentScroll > 0) {
        window.requestAnimationFrame(this.scrollSmooth)
        window.scrollTo(0, currentScroll - (currentScroll / 5))
      }
    }
  }
}
</script>

<style lang="css" scoped>
.top {
  position: fixed;
  z-index: 999;
  bottom: 20px;
  right: 50px;
}

.top-button {
  width: 44px;
  height: 44px;
  background-image: url('../../assets/images/top-button/icon.svg');
  background-size: 44px 264px;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .1);
}

.top-button+.top-button {
  margin-top: 5px;
}

.qq {
  background-position: 0 0;
}

.qq:hover {
  background-position: 0 220px;
}

.contact {
  background-position: 0 176px;
}

.contact:hover {
  background-position: 0 132px;
}

.back {
  background-position: 0 88px;
}

.back:hover {
  background-position: 0 44px;
}

.pop-box {
  border: 1px solid #2d90e6;
  border-radius: 3px;
  display: inline-block;
  position: absolute;
  text-align: center;
  height: 25px;
  line-height: 25px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  box-sizing: border-box;
  right: 100%;
  font-size: 12px;
  margin-right: 8px;
  background: var(--pseudo-background-color);
  color: #2d90e6;
}

.pop-box a {
  color: #2d90e6;
}

.pop-box::before,
.pop-box::after {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  top: 0;
  bottom: 0;
  margin: auto 0;
}

.pop-box::before {
  border-left: 4px solid #2d90e6;
  right: -5px;
}

.pop-box::after {
  border-left: 4px solid var(--pseudo-background-color);
  right: -4px;
}

.contact .pop-box {
  width: 100px;
}

.qq .pop-box {
  width: 80px;
}

.pop-box {
  display: none;
}

.qq:hover .pop-box,
.contact:hover .pop-box {
  display: block;
  transition: all .5s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>
