import * as types from '../constants/mutation-types'

const state = {
  package: {
    doubleMirrorDomainId: '',
    doubleMirrorDomain: '',
    doubleMirrorDomainProtocol: ''
  }
}

const actions = {
  changeDomainId({ commit, state }, id) {
    commit(types.MIRROR_DOMAIN_ID, { id })
  },
  changeDomain({ commit, state }, domain) {
    commit(types.MIRROR_DOMAIN_DOMAIN, { domain })
  },
  changeDomainProtocol({ commit, state }, protocol) {
    commit(types.MIRROR_DOMAIN_DOMAIN_PROTOCOL, { protocol })
  }
}

const mutations = {
  [types.MIRROR_DOMAIN_ID](state, { id }) {
    // 变更id
    state.package.doubleMirrorDomainId = id
  },
  [types.MIRROR_DOMAIN_DOMAIN](state, { domain }) {
    // 变更domain
    state.package.doubleMirrorDomain = domain
  },
  [types.MIRROR_DOMAIN_DOMAIN_PROTOCOL](state, { protocol }) {
    // 变更domain
    state.package.doubleMirrorDomainProtocol = protocol
  }
}

export default {
  state,
  actions,
  mutations
}
