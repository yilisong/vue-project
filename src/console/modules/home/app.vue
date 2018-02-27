<template lang="html">
<div class="">
  <IEbar :isIE="checkIE" v-on:updateIEbar="updateIEbar"/>
  <console-layout :appMenu="appMenu" :breadcrumb="breadcrumb" :isProduct="false" v-bind:class="{'ie-class': isIEclass}">
    测试
  </console-layout>
</div>
</template>

<script>
import OverView from 'home/views/index'
import ConsoleLayout from 'common/components/layout/console-layout'
import routerSync from 'common/mixins/routerSync'
import IEbar from 'common/components/Inform/IEbar'
import Help from 'common/utils/help'

export default {
  mixins: [
    routerSync(require('./config'))
  ],
  data() {
    return {
      checkIE: false,
      isIEclass: false
    }
  },
  mounted() {
    if (this.isIE(9)) {
      this.checkIE = true
      this.isIEclass = true
    }
  },
  methods: {
    isIE(ver) {
      const b = document.createElement('b')
      b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
      return b.getElementsByTagName('i').length === 1
    },
    updateIEbar() {
      this.isIEclass = false
    }
  },
  components: {
    ConsoleLayout,
    OverView,
    IEbar
  }
}
</script>

<style lang='less'>
.ie-class {
  div {
    .main-nav-container {
      top: 90px !important;
    }
    .module-container {
      top: 40px !important;
    }
  }
}
</style>
