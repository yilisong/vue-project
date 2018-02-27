import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from 'common/components/NotFound/NotFound'

import routeTable, { defaultPath, crumbRoot } from './routeTable'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: defaultPath
  },
  {
    path: routeTable.WebsiteList.path,
    component: routeTable.WebsiteList.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.WebsiteList]
    }
  },
  {
    path: routeTable.Console.path,
    component: routeTable.Console.component,
    children: [
      {
        path: '/',
        redirect: routeTable.Console.ConsoleTabBasic.path
      },
      {
        path: routeTable.Console.ConsoleTabBasic.path,
        component: routeTable.Console.ConsoleTabBasic.component,
        meta: {
          breadcrumb: [crumbRoot, routeTable.Console.ConsoleTabBasic]
        }
      },
      {
        path: routeTable.Console.ConsoleTabPerform.path,
        component: routeTable.Console.ConsoleTabPerform.component,
        meta: {
          breadcrumb: [crumbRoot, routeTable.Console.ConsoleTabPerform]
        }
      },
      {
        path: routeTable.Console.ConsoleTabPages.path,
        component: routeTable.Console.ConsoleTabPages.component,
        meta: {
          breadcrumb: [crumbRoot, routeTable.Console.ConsoleTabPages]
        }
      }
    ]
  },
  {
    path: routeTable.StatisticsReport.path,
    component: routeTable.StatisticsReport.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.StatisticsReport]
    },
    children: [
      {
        path: '/',
        redirect: routeTable.StatisticsReport.ReportTabWideFlowRange.path
      },
      {
        path: routeTable.StatisticsReport.ReportTabWideFlowRange.path,
        component: routeTable.StatisticsReport.ReportTabWideFlowRange.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.StatisticsReport.ReportTabWideFlowRange
          ]
        }
      },
      {
        path: routeTable.StatisticsReport.ReportTabAccessAnalysis.path,
        component:
          routeTable.StatisticsReport.ReportTabAccessAnalysis.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.StatisticsReport.ReportTabAccessAnalysis
          ]
        }
      },
      {
        path: routeTable.StatisticsReport.ReportTabDistributionRequest.path,
        component:
          routeTable.StatisticsReport.ReportTabDistributionRequest.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.StatisticsReport.ReportTabDistributionRequest
          ]
        }
      },
      {
        path: routeTable.StatisticsReport.ReportTabSecurityTrend.path,
        component: routeTable.StatisticsReport.ReportTabSecurityTrend.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.StatisticsReport.ReportTabSecurityTrend
          ]
        }
      },
      {
        path: routeTable.StatisticsReport.ReportTabStatusCodeAnalysis.path,
        component:
          routeTable.StatisticsReport.ReportTabStatusCodeAnalysis.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.StatisticsReport.ReportTabStatusCodeAnalysis
          ]
        }
      },
      {
        path: routeTable.StatisticsReport.ReportTabHotspotAnalysis.path,
        component:
          routeTable.StatisticsReport.ReportTabHotspotAnalysis.component,
        children: [
          {
            path: '/',
            redirect:
              routeTable.StatisticsReport.ReportTabHotspotAnalysis.HotUrl.path
          },
          {
            path:
              routeTable.StatisticsReport.ReportTabHotspotAnalysis.HotUrl.path,
            component:
              routeTable.StatisticsReport.ReportTabHotspotAnalysis.HotUrl
                .component,
            meta: {
              breadcrumb: [
                crumbRoot,
                routeTable.StatisticsReport.ReportTabHotspotAnalysis
              ]
            }
          },
          {
            path:
              routeTable.StatisticsReport.ReportTabHotspotAnalysis.HotReferer
                .path,
            component:
              routeTable.StatisticsReport.ReportTabHotspotAnalysis.HotReferer
                .component,
            meta: {
              breadcrumb: [
                crumbRoot,
                routeTable.StatisticsReport.ReportTabHotspotAnalysis
              ]
            }
          }
        ]
      }
    ]
  },
  {
    path: routeTable.CleanCache.path,
    component: routeTable.CleanCache.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.CleanCache]
    }
  },
  {
    path: '*',
    component: NotFound
  }
]

export default new VueRouter({
  routes
})
