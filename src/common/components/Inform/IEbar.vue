<template lang="html">
<div class="notice-bg otherTip" v-show="isShow">
  <img src="./assets/images/browser_tip.png">
  <i class="close" @click="closeInform">X</i>
</div>
</template>

<script>
import cookie from './assets/js/cookie'
export default {
  data() {
    return {
      isShow: true
    }
  },
  props: {
    isIE: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    isIE(newValue) {
      this.isShow = !cookie.get('isIE') && this.isIE
      if (cookie.get('isIE')) {
        this.$emit('updateIEbar')
      }
    }
  },
  mounted() {
    this.isShow = !cookie.get('isIE') && this.isIE
    if (cookie.get('isIE')) {
      this.$emit('updateIEbar')
    }
  },
  methods: {
    closeInform() {
      this.isShow = false
      if (!cookie.get('isIE') && this.isIE) {
        cookie.set('isIE', 'true')
      }
      this.$emit('updateIEbar')
    }
  }
}
</script>

<style lang="css" scoped>
.notice-bg {
  background: url('./assets/images/notice_background.jpg')center center no-repeat;
  background-size: cover;
  text-align: center;
  position: relative;
}

.close {
  font-size: 16px;
  font-weight: 100;
  font-style: normal;
  display: block;
  position: absolute;
  right: 50px;
  top: 5px;
  cursor: pointer;
  color: #333;
}

.otherTip {
  background: #f5f6b4;
}
</style>
