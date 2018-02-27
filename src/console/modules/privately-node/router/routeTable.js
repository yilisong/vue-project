const routeTable = {
  NodeList: {
    name: '节点列表',
    path: '/nodeList',
    component: r =>
      import(/* webpackChunkName: "privately-node_NodeList" */ '../views/node-list/index').then(
        r
      )
  },
  MonitorLog: {
    name: '监控日志',
    path: '/monitorLog',
    component: r =>
      import(/* webpackChunkName: "privately-node_MonitorLog" */ '../views/monitor-log/index').then(
        r
      )
  }
}

export const defaultPath = routeTable.NodeList.path

export const crumbRoot = {
  name: '私有节点',
  path: defaultPath
}

export default routeTable
