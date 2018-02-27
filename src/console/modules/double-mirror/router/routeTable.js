const routeTable = {
  DoubleMirrorList: {
    name: '替身镜像列表',
    path: '/doubleMirrorList',
    component: r =>
      import(
        /* webpackChunkName: "game-shield_GameShield" */ '../views/Mirror/DoubleMirror'
      ).then(r)
  }
}

export const defaultPath = routeTable.DoubleMirrorList.path

// Root breadcrumb item for the entire module
export const crumbRoot = { name: '替身镜像', path: defaultPath }

export default routeTable
