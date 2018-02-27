import * as types from '../constants/mutation-types'

const initVisible = false

const state = {
  configInfo: {
    visible: initVisible
  }
}

const actions = {
  triggerConfigInfoVisible({ commit, state }, visible) {
    commit(types.CONFIG_INFO_VISIBLE, {
      visible
    })
  }
}

const mutations = {
  [types.CONFIG_INFO_VISIBLE](state, { visible }) {
    state.configInfo.visible = visible
  }
}

export default {
  state,
  actions,
  mutations
}
