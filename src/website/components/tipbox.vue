<template lang="html">
  <div class="">
    <transition name="tipSlide">
    <div class="tip-box" v-bind:class="[{ tipError: isError }, normalClass]" v-show="isShow">
      {{message}}
    </div>
  </transition>
  </div>
</template>

<script>
export default {
  props: ['message', 'isError','isShow'],
  data() {
    return {
      normalClass: 'tip-box-normal'
    }
  }
}
</script>

<style lang="css">
.tip-box {
  position: absolute;
  left: 355px;
  top: -12px;
  /* padding: initial; */
  padding: 10px;
  border: 1px solid #cdcdcd;
  background: #fff;
}

.tip-box-normal {
  border-left: 4px solid #2ea1e9;
}

.tipError {
  border-left: 4px solid #F61C17;
}

.tip-box-normal::before,
.tipError::before {
  content: "";
  position: absolute;
  left: -9px;
  top: 22px;
  width: 0;
  height: 0;
}

.tip-box-normal::before {
  border-right: 5px solid #2ea1e9;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.tipError::before {
  border-right: 5px solid #F61C17;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.tipSlide-leave-active {
  transition: opacity .5s
}
.tipSlide-enter, .tipSlide-leave-active {
  opacity: 0;
}
.tipSlide-enter-active{
  animation-duration: .5s;
  animation-fill-mode: both;
  animation-name: slideInLeft;
}
@keyframes slideInLeft {
  from {
    transform: translate3d(-8%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}


</style>
