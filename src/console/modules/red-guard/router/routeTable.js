const routeTable = {
  Product: {
    name: '安全概览',
    path: '/product',
    component: r =>
      import(/* webpackChunkName: "red-guard_Product" */
      'redGuard/product').then(r)
  },
  WebsiteList: {
    name: '网站列表',
    path: '/websiteList',
    component: r =>
      import(/* webpackChunkName: "red-guard_WebsiteList" */
      '../views/website-list/index').then(r)
  },
  Console: {
    name: '管理',
    path: '/websiteList/console/:id',
    component: r =>
      import(/* webpackChunkName: "red-guard_Console" */
      '../views/website-list/console/index').then(r),
    ConsoleTabBasic: {
      name: '基础安全',
      path: 'basic',
      component: r =>
        import(/* webpackChunkName: "red-guard_ConsoleTabBasic" */
        '../views/website-list/console/console-tab-basic/index').then(r)
    },
    ConsoleTabPages: {
      name: '高级配置',
      path: 'pages',
      component: r =>
        import(/* webpackChunkName: "red-guard_ConsoleTabPages" */
        '../views/website-list/console/console-tab-pages/index').then(r)
    }
  },
  SafetyOverview: {
    name: '安全概览',
    path: '/safetyOverview',
    component: r =>
      import(/* webpackChunkName: "red-guard_StatisticsReport" */
      '../views/safety-overview/index').then(r)
  },
  MenaceAnalyze: {
    name: '威胁分析',
    path: '/menaceAnalyze',
    component: r =>
      import(/* webpackChunkName: "red-guard_MenaceAnalyze" */
      '../views/menace-analyze/index').then(r),
    HackerProfile: {
      name: '黑客画像',
      path: '/menaceAnalyze/hackerProfile',
      component: r =>
        import(/* webpackChunkName: "red-guard_HackerProfile" */
        '../views/hacker-profile/index').then(r)
    },
    NormalAttack: {
      name: '常规攻击分析',
      path: '/menaceAnalyze/NormalAttack',
      component: r =>
        import(/* webpackChunkName: "red-guard_HackerProfile" */
        '../views/menace-analyze/tab/NormalAttack').then(r)
    },
    AdvancedThreat: {
      name: '高级威胁分析',
      path: '/menaceAnalyze/AdvancedThreat',
      component: r =>
        import(/* webpackChunkName: "red-guard_HackerProfile" */
        '../views/menace-analyze/tab/AdvancedThreat').then(r)
    },
    HackerAnalysis: {
      name: '黑客追溯分析',
      path: '/menaceAnalyze/HackerAnalysis',
      component: r =>
        import(/* webpackChunkName: "red-guard_HackerProfile" */
        '../views/menace-analyze/tab/HackerAnalysis').then(r)
    }
  }
}

export const defaultPath = routeTable.SafetyOverview.path

export const crumbRoot = {
  name: '红网卫士',
  path: defaultPath
}

export default routeTable
