export default config => ({
  data() {
    return {
      appMenu: config.default.appMenu,
      mainTransition: 'slide-right',
      breadcrumb: []
    }
  },
  created() {
    this.appMenu.active = `/${this.$route.fullPath.split('/')[1]}`
  },
  watch: {
    $route(to, from) {
      const toDepth = to.fullPath.split('/')
      const fromDepth = from.fullPath.split('/')

      this.appMenu.active = `/${toDepth[1]}`
      this.mainTransition = toDepth.length < fromDepth.length
        ? 'slide-left'
        : 'slide-right'
      this.breadcrumb = to.meta.breadcrumb
    }
  }
})
