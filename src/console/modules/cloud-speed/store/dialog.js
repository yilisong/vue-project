import * as types from '../constants/mutation-types'

const initVisible = false

const state = {
  addWebsite: {
    visible: initVisible
  },
  configInfo: {
    visible: initVisible
  },
  aliasBind: {
    visible: initVisible
  },
  clickCertify: {
    visible: initVisible
  },
  websiteNote: {
    visible: initVisible
  },
  createSubstitue: {
    visible: initVisible
  }
}

const actions = {
  triggerAddWebsiteVisible({ commit, state }, visible) {
    commit(types.ADD_WEBSITE_VISIBLE, {
      visible
    })
  },
  triggerConfigInfoVisible({ commit, state }, visible) {
    commit(types.CONFIG_INFO_VISIBLE, {
      visible
    })
  },
  triggerAliasBindVisible({ commit, state }, visible) {
    commit(types.ALIAS_BIDN_VISIBLE, {
      visible
    })
  },
  triggerClickCertifyVisible({ commit, state }, visible) {
    commit(types.CLICK_CERTIFY_VISIBLE, {
      visible
    })
  },
  triggerWebsiteNoteVisible({ commit, state }, visible) {
    commit(types.WEBSITE_NOTE_VISIBLE, {
      visible
    })
  },
  triggerCreateSubstituteVisible({ commit, state }, visible) {
    commit(types.CREATED_SUBSTITUTE_VISIBLE, {
      visible
    })
  }
}

const mutations = {
  [types.ADD_WEBSITE_VISIBLE](state, { visible }) {
    state.addWebsite.visible = visible
  },
  [types.CONFIG_INFO_VISIBLE](state, { visible }) {
    state.configInfo.visible = visible
  },
  [types.ALIAS_BIDN_VISIBLE](state, { visible }) {
    state.aliasBind.visible = visible
  },
  [types.CLICK_CERTIFY_VISIBLE](state, { visible }) {
    state.clickCertify.visible = visible
  },
  [types.WEBSITE_NOTE_VISIBLE](state, { visible }) {
    state.websiteNote.visible = visible
  },
  [types.CREATED_SUBSTITUTE_VISIBLE](state, { visible }) {
    state.createSubstitue.visible = visible
  }
}

export default {
  state,
  actions,
  mutations
}
