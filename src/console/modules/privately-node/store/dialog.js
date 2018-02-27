import * as types from '../constants/mutation-types'

const initVisible = false

const state = {
  sendSet: {
    visible: initVisible
  },
  batchSendSet: {
    visible: initVisible
  }
}

const actions = {
  triggerSendSetVisible({ commit, state }, visible) {
    commit(types.SEND_SET, { visible })
  },
  triggerBatchSendSetVisible({ commit, state }, visible) {
    commit(types.BATCH_SEND_SET, { visible })
  }
}

const mutations = {
  [types.SEND_SET](state, { visible }) {
    state.sendSet.visible = visible
  },
  [types.BATCH_SEND_SET](state, { visible }) {
    state.batchSendSet.visible = visible
  }
}

export default {
  state,
  actions,
  mutations
}
