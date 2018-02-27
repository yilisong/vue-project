import 'common/assets/console-common-style'
import 'home/assets/styles/overview.css'

import { Vue, VueRouter } from 'common/assets/console-common-script'
import App from './app'
import store from './store'
import config from './config'

const router = new VueRouter({
  routes: config.routes
})

const app = new Vue({
  el: '#root',
  router,
  store,
  components: {
    App
  },
  render: h => h(App)
})
