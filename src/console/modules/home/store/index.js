import Vue from 'vue'
import Vuex from 'vuex'
import services from './services'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    services
  },
  strict: true,
  plugins: debug ? [createLogger()] : []
})
