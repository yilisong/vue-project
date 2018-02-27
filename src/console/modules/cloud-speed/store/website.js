import * as types from '../constants/mutation-types'
import SourceSpeedResource from '../resource/SourceSpeedResource'
import SourceSpeedCommonResource from '../resource/SourceSpeedCommonResource'

const state = {
  domain: {
    id: '',
    name: '',
    data: {}
  },
  websiteAdded: false
}

const actions = {
  changeWebsite({ commit, state }, website) {
    const params = {
      domain: website.id
    }
    SourceSpeedCommonResource.queryDomainInfo(params).then(res => {
      website.domain = res.data.data.domain
      website.data = res.data.data
      commit(types.WEBSITE, { website })
    })
  },
  addWebsite({ commit, state }, params) {
    return SourceSpeedResource.addWebsite(params)
  },
  getWebsiteConfigInfo({ commit, state }, params) {
    return SourceSpeedResource.getWebsiteConfigInfo(params)
  },
  updateWebsiteConfig({ commit, state }, params) {
    return SourceSpeedResource.updateWebsiteConfig(params)
  }
}

const mutations = {
  [types.WEBSITE](state, { website }) {
    state.domain.id = website.id
    state.domain.name = website.domain
    state.domain.data = website.data
  },
  [types.WEBSITE_ADDED](state, { websiteAdded }) {
    state.websiteAdded = websiteAdded
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
