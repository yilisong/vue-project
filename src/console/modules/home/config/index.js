import NotFound from 'common/components/NotFound/NotFound'
import Index from '../views/index'

export default {
  appMenu: {
    title: '总览'
  },
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '*',
      component: NotFound
    }
  ]
}
