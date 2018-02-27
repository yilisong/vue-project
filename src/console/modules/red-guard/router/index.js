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
    path: routeTable.Product.path,
    component: routeTable.Product.component,
    meta: {
      breadcrumb: [crumbRoot]
    }
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
        path: routeTable.Console.ConsoleTabPages.path,
        component: routeTable.Console.ConsoleTabPages.component,
        meta: {
          breadcrumb: [crumbRoot, routeTable.Console.ConsoleTabPages]
        }
      }
    ]
  },
  {
    path: routeTable.SafetyOverview.path,
    component: routeTable.SafetyOverview.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.SafetyOverview]
    }
  },
  {
    path: routeTable.MenaceAnalyze.path,
    component: routeTable.MenaceAnalyze.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.MenaceAnalyze]
    },
    redirect: routeTable.MenaceAnalyze.NormalAttack.path,
    children: [
      {
        path: routeTable.MenaceAnalyze.HackerProfile.path,
        component: routeTable.MenaceAnalyze.HackerProfile.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.MenaceAnalyze,
            routeTable.MenaceAnalyze.HackerProfile
          ]
        }
      },
      {
        path: routeTable.MenaceAnalyze.AdvancedThreat.path,
        component: routeTable.MenaceAnalyze.AdvancedThreat.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.MenaceAnalyze,
            routeTable.MenaceAnalyze.AdvancedThreat
          ]
        }
      },
      {
        path: routeTable.MenaceAnalyze.HackerAnalysis.path,
        component: routeTable.MenaceAnalyze.HackerAnalysis.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.MenaceAnalyze,
            routeTable.MenaceAnalyze.HackerAnalysis
          ]
        }
      },
      {
        path: routeTable.MenaceAnalyze.NormalAttack.path,
        component: routeTable.MenaceAnalyze.NormalAttack.component,
        meta: {
          breadcrumb: [
            crumbRoot,
            routeTable.MenaceAnalyze,
            routeTable.MenaceAnalyze.NormalAttack
          ]
        }
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

export default new VueRouter({
  routes
})
