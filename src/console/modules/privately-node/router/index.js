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
    path: routeTable.NodeList.path,
    component: routeTable.NodeList.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.NodeList]
    }
  },
  {
    path: routeTable.MonitorLog.path,
    component: routeTable.MonitorLog.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.MonitorLog]
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
