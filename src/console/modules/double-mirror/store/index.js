import Vue from 'vue'
import Vuex from 'vuex'
import dialog from './dialog'
import domain from './domainId'
import doubleMirror from './doubleMirror'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    dialog,
    doubleMirror,
    domain
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
