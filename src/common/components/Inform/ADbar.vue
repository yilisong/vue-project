<template lang="html">
<div class="notice-bg" v-show="isShow">
  <img src="./assets/images/notice.png" alt="">
  <i class="close" @click="closeInform">+</i>
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
  watch: {},
  mounted() {
    this.isShow = !cookie.get('isShowInform')
  },
  methods: {
    closeInform() {
      this.isShow = false
      if (!cookie.get('isShowInform'))
        cookie.set('isShowInform', 'true')
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
  font-size: 27px;
  font-weight: 100;
  display: block;
  position: absolute;
  right: 5px;
  top: 0;
  transform: rotate(45deg);
  cursor: pointer;
  color: #325aa1;
}

.otherTip {
  background: #f5f6b4;
}
</style>
