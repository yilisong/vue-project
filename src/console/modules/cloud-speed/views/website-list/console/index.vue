<template>
<console-page-layout :title="title">
  <div slot="tab">
    <el-tabs v-model="tabActiveName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabOptions" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>
  </div>
  <router-view></router-view>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'

export default {
  data() {
    return {
      tabActiveName: this.$route.fullPath.split('/')[4],
      tabOptions: [{
          label: '性能优化',
          name: 'perform'
        },
        {
          label: '基础安全',
          name: 'basic'
        },
        {
          label: '高级配置',
          name: 'pages'
        }
      ]
    }
  },
  computed: {
    title() {
      return `管理（${this.$store.state.website.domain.name}）`
    }
  },
  created() {},
  mounted() {

  },
  components: {
    ConsolePageLayout
  },
  watch: {
    $route(to, from) {
      const toDepth = to.fullPath.split('/')
      const fromDepth = from.fullPath.split('/')
      this.tabActiveName = `${toDepth[4]}`
      this.transitionName = toDepth.length < fromDepth.length ? 'slide-left' : 'slide-right'
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push(`${tab.name}`)
    }
  }
}
</script>


<style>
@media (max-width:1401px) {
  .item-name {
    font-size: 14px !important;
  }
}
</style>
