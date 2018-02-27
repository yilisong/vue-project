const routeTable = {
  WebsiteList: {
    name: '网站列表',
    path: '/websiteList',
    component: r =>
      import(
        /* webpackChunkName: "cloud-speed_WebsiteList" */ '../views/website-list/index'
      ).then(r)
  },
  Console: {
    name: '管理',
    path: '/websiteList/console/:id',
    component: r =>
      import(
        /* webpackChunkName: "cloud-speed_Console" */ '../views/website-list/console/index'
      ).then(r),
    ConsoleTabBasic: {
      name: '基础安全',
      path: 'basic',
      component: r =>
        import(
          /* webpackChunkName: "cloud-speed_ConsoleTabBasic" */ '../views/website-list/console/console-tab-basic/index'
        ).then(r)
    },
    ConsoleTabPerform: {
      name: '性能优化',
      path: 'perform',
      component: r =>
        import(
          /* webpackChunkName: "cloud-speed_ConsoleTabPerform" */ '../views/website-list/console/console-tab-perform/index'
        ).then(r)
    },
    ConsoleTabPages: {
      name: '高级配置',
      path: 'pages',
      component: r =>
        import(
          /* webpackChunkName: "cloud-speed_ConsoleTabPages" */ '../views/website-list/console/console-tab-pages/index'
        ).then(r)
    }
  },
  StatisticsReport: {
    name: '统计报表',
    path: '/statisticsReport',
    component: r =>
      import(
        /* webpackChunkName: "cloud-speed_StatisticsReport" */ '../views/statistics-report/index'
      ).then(r),
    ReportTabWideFlowRange: {
      name: '流量带宽',
      path: 'wideFlowRange',
      component: r =>
        import(
          /* webpackChunkName: "cloud-speed_ReportTabWideFlowRange" */ '../views/statistics-report/tab-wide-flow-range'
        ).then(r)
    },
    ReportTabAccessAnalysis: {
      name: '访问分析',
      path: 'accessAnalysis',
      component: r =>
        import(
          /* webpackChunkName: "cloud-speed_ReportTabAccessAnalysis" */ '../views/statistics-report/tab-access-analysis'
        ).then(r)
    },
    ReportTabDistributionRequest: {
      name: '请求分布',
      path: 'distributionRequest',
      component: r =>
        import(
          /* webpackChunkName: "cloud-speed_ReportTabDistributionRequest" */ '../views/statistics-report/tab-distribution-request'
        ).then(r)
    },
    ReportTabSecurityTrend: {
      name: '安全趋势',
      path: 'securityTrend',
      component: r =>
        import(
          /* webpackChunkName: "cloud-speed_ReportTabSecurityTrend" */ '../views/statistics-report/tab-security-trend'
        ).then(r)
    },
    ReportTabStatusCodeAnalysis: {
      name: '状态码分析',
      path: 'statusCodeAnalysis',
      component: r =>
        import(
          /* webpackChunkName: "cloud-speed_ReportTabStatusCodeAnalysis" */ '../views/statistics-report/tab-status-code-analysis'
        ).then(r)
    },
    ReportTabHotspotAnalysis: {
      name: '热点分析',
      path: 'hotspotAnalysis',
      component: r =>
        import(
          /* webpackChunkName: "cloud-speed_ReportTabHotspotAnalysis" */ '../views/statistics-report/tab-hotspot-analysis'
        ).then(r),
      HotUrl: {
        name: '热门URL',
        path: 'hotUrl',
        component: r =>
          import(
            /* webpackChunkName: "cloud-speed_HotUrl" */ '../views/statistics-report/hotspot-analysis/hot-url'
          ).then(r)
      },
      HotReferer: {
        name: '热门Refeter',
        path: 'hotReferer',
        component: r =>
          import(
            /* webpackChunkName: "cloud-speed_HotReferer" */ '../views/statistics-report/hotspot-analysis/hot-referer'
          ).then(r)
      }
    }
  },
  CleanCache: {
    name: '清理缓存',
    path: '/cleanCache',
    component: r =>
      import(
        /* webpackChunkName: "cloud-speed_CleanCache" */ '../views/clean-cache/index'
      ).then(r)
  }
}

export const defaultPath = routeTable.WebsiteList.path

export const crumbRoot = {
  name: '云加速',
  path: defaultPath
}

export default routeTable
