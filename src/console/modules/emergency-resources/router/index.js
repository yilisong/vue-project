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
    path: routeTable.MonitorList.path,
    component: routeTable.MonitorList.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.MonitorList]
    }
  },
  {
    path: routeTable.MonitorReport.path,
    component: routeTable.MonitorReport.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.MonitorList, routeTable.MonitorReport]
    }
  },
  {
    path: routeTable.AnnounciatorMonitor.path,
    component: routeTable.AnnounciatorMonitor.component,
    meta: {
      breadcrumb: [crumbRoot, routeTable.AnnounciatorMonitor]
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
