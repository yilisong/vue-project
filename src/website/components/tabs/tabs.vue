<template>
  <div class="tabs">
    <ul class="tab-hd clearfix">
      <template v-for="(item,index) in tabContent.head">
        <slot :name="item"></slot>
      </template>
    </ul>
    <ul class="tab-bd">
      <template v-for="(item,index) in tabContent.body">
        <slot :name="item"></slot>
      </template>
    </ul>
  </div>
</template>

<script>
import './tabs.css'
import $ from 'jquery'
import tabs from './jqueryTabs'

export default {
  props: {
    tabContent: {
      type: Object,
      require: true
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    tabs('.tabs')
  }
}
</script>
<style scoped>
  .tabs {
    background: #ffffff;
  }
</style>
