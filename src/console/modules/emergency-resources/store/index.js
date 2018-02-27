import Vue from 'vue'
import Vuex from 'vuex'
import dialog from './dialog'
import monitor from './monitor'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    dialog,
    monitor
  },
  strict: debug
  // plugins: debug ? [createLogger()] : plugins
})
