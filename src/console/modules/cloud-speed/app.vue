<template lang="html">
<console-layout :appMenu="appMenu" :breadcrumb="breadcrumb">
  <transition :name="mainTransition" mode="out-in">
    <router-view></router-view>
  </transition>
</console-layout>
</template>

<script>
import ConsoleLayout from 'common/components/layout/console-layout'
import routerSync from 'common/mixins/routerSync'

export default {
  mixins: [
    routerSync(require('./constants/app-menu'))
  ],
  components: {
    ConsoleLayout
  }
}
</script>
<style media="screen">
@media screen and (max-width:1401px) {
  html,
  .el-table,
  .el-radio__label,
  .el-switch__label,
  .el-switch__label * {
    font-size: 12px;
  }
}
</style>
