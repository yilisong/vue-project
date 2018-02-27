import 'common/assets/console-common-style'

import { Vue, VueRouter } from 'common/assets/console-common-script'
import App from './app'
import router from './router'
import store from './store'

const app = new Vue({
  el: '#root',
  store,
  router,
  components: {
    App
  },
  render: h => h(App)
})
