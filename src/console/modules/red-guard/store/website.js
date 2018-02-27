import * as types from '../constants/mutation-types'
import SourceGuardResource from '../resource/SourceGuardResource'

const state = {
  domainInfo: {},
  websiteAdded: false
}

const actions = {
  changeWebsite({ commit, state }, website) {
    const params = {
      domain_id: website.id
    }
    SourceGuardResource.getWebsiteInfo(params).then(res => {
      website = res.data.data
      commit(types.WEBSITE, { website })
    })
  },
  getWebsiteConfigInfo({ commit, state }, params) {
    return SourceGuardResource.getWebsiteConfigInfo(params)
  },
  updateWebsiteConfig({ commit, state }, params) {
    return SourceGuardResource.updateWebsiteConfig(params)
  }
}

const mutations = {
  [types.WEBSITE](state, { website }) {
    state.domainInfo = website
  }
}

const getters = {
  getList: state => state.list
}

export default {
  state,
  actions,
  mutations,
  getters
}
