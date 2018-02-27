import * as types from 'cloudSpeed/constants/mutation-types'

const initRefresh = false

const state = {
  alwaysOnlineRefresh: initRefresh
}

const actions = {
  refreshAlwaysOnlineRefresh({ commit, state }, alwaysOnline) {
    commit(types.ALWAYS_ONLINE_REFRESH, { alwaysOnline })
  }
}

const mutations = {
  [types.ALWAYS_ONLINE_REFRESH](state, { alwaysOnline }) {
    state.alwaysOnlineRefresh = alwaysOnline
  }
}

export default {
  state,
  actions,
  mutations
}
