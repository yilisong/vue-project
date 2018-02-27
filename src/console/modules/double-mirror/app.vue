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
    routerSync(require('./constants/AppMenu'))
  ],
  components: {
    ConsoleLayout
  }
}
</script>
