import Vue from 'vue'
import Vuex from 'vuex'
import dialog from './dialog'
import website from './website'
import panel from './panel'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

const plugins = [
  createPersistedState({
    key: 'G_S',
    paths: ['website.domain', 'panel.alwaysOnlineRefresh']
  })
]

export default new Vuex.Store({
  modules: {
    dialog,
    website,
    panel
  },
  strict: debug,
  plugins: debug ? [createLogger(), ...plugins] : plugins
  // 注: createPersistedState要指定范围, 否则会引起BUG, 比如dialog在open的状态下关闭页面,
  // localStorage会把visible初始值设置为true, 下次打开标签页就永远无法触发dialog的open状态
  //plugins: debug ? [createLogger(), ...plugins] : plugins
})
