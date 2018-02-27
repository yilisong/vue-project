import 'core-js'
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './Root'
import Product from './product'
import Iview from 'iview'
import 'common/utils/hmr-events'
import 'common/assets/console-common-style'
import Help from 'src/common/utils/help'

Vue.use(Iview)

const drawing = () => {
  // eslint-disable-next-line no-unneeded-ternary
  // const isServe = process.env.APP_ENV === 'release' ? false : true
  const BLOATED = App
  const app = new Vue({
    el: '#root',
    store,
    router,
    components: {
      BLOATED
    },
    render: h => h(BLOATED)
  }).$mount('#root')
}

const initInstance = async () => {
  await Help.verdictLogin()
  await drawing()
}

initInstance()
