<template>
  <div class="data-box hot_banner">
    <el-tabs v-model="activeTabName" @tab-click="handleClick">
      <el-tab-pane label="热门URL TOP20" name="hotUrl"></el-tab-pane>
      <el-tab-pane label="热门Referer TOP20" name="hotReferer"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeTabName: this.$route.fullPath.split('/')[3]
      }
    },
    created() {

    },
    watch: {
      $route(to, from) {
        const toDepth = to.fullPath.split('/')
        this.activeTabName = `${toDepth[3]}`
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$router.push(`${tab.name}`)
      }
    }
  }
</script>

<style lang="css" scoped>
.speed-traffic{
  width: 29.5%;
  height: 150px;
  border: 1px solid #ccc;
  display: inline-block;
}
</style>
