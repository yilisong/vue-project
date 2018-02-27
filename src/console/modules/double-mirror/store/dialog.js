import * as types from '../constants/mutation-types'

const initVisible = false

const state = {
  addMirror: {
    visible: initVisible
  },
  deployMirror: {
    visible: initVisible
  },
  upDateMirror: {
    visible: initVisible
  }
}

const actions = {
  triggerAddMirrorVisible({ commit, state }, visible) {
    commit(types.ADD_MIRROR, { visible })
  },
  triggerDeployMirrorVisible({ commit, state }, visible) {
    commit(types.DEPLOY_MIRROR, { visible })
  },
  triggerUpDateMirrorVisible({ commit, state }, visible) {
    commit(types.UP_DATE_MIRROR, { visible })
  }
}

const mutations = {
  [types.ADD_MIRROR](state, { visible }) {
    state.addMirror.visible = visible
  },
  [types.DEPLOY_MIRROR](state, { visible }) {
    state.deployMirror.visible = visible
  },
  [types.UP_DATE_MIRROR](state, { visible }) {
    state.upDateMirror.visible = visible
  }
}

export default {
  state,
  actions,
  mutations
}
