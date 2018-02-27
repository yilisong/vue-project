import * as types from '../constant/mutationTypes'
import SourceOverviewResource from '../resource/SourceOverviewResource'
import Qs from 'qs'

const state = {
  availableServices: {
    basicApply: {
      title: '基础应用',
      serviceList: []
    },
    webCDN: {
      title: '性能加速',
      serviceList: []
    },
    cloudSafe: {
      title: '云安全',
      serviceList: []
    },
    taichiDDos: {
      title: '太极抗D',
      serviceList: []
    }
  },
  disabledServiceList: {
    basicApply: {
      title: '基础应用',
      serviceList: []
    },
    webCDN: {
      title: '性能加速',
      serviceList: []
    },
    cloudSafe: {
      title: '云安全',
      serviceList: []
    },
    taichiDDos: {
      title: '太极抗D',
      serviceList: []
    }
  }
}

const actions = {
  getBasicApplicationInfo({ state, commit }, params) {
    SourceOverviewResource.getBasicApplicationInfo(params).then(response => {
      const { serviceList, title } = response.data.data
      serviceList.forEach((item, index, arr) => {
        if (item.total === 0 || item.total === '0') {
          commit(types.GET_DISABLED_SERVICE_LIST, { item })
        } else {
          commit(types.GET_AVAILABLE_SERVICE_LIST, { item })
        }
      })
    })
  },
  getWEBCDNInfo({ state, commit }, params) {
    SourceOverviewResource.getWEBCDNInfo(params).then(response => {
      const { serviceList, title } = response.data.data
      serviceList.forEach((item, index, arr) => {
        if (item.total === 0 || item.total === '0') {
          commit(types.GET_DISABLED_SERVICE_LIST, { item })
        } else {
          commit(types.GET_AVAILABLE_SERVICE_LIST, { item })
        }
      })
    })
  },
  getCloudSafeInfo({ state, commit }, params) {
    SourceOverviewResource.getCloudSafeInfo(params).then(response => {
      const { serviceList, title } = response.data.data
      serviceList.forEach((item, index, arr) => {
        if (item.total === 0 || item.total === '0') {
          commit(types.GET_DISABLED_SERVICE_LIST, { item })
        } else {
          commit(types.GET_AVAILABLE_SERVICE_LIST, { item })
        }
      })
    })
  },
  getTJKDInfo({ state, commit }, params) {
    SourceOverviewResource.getTJKDInfo(params).then(response => {
      const { serviceList, title } = response.data.data
      for (const i in serviceList) {
        const item = serviceList[i]
        if (item.total === 0 || item.total === '0') {
          commit(types.GET_DISABLED_SERVICE_LIST, { item })
        } else {
          commit(types.GET_AVAILABLE_SERVICE_LIST, { item })
        }
      }
    })
  },
  getCloudCalc({ state, commit }) {
    const data = Qs.stringify({ api: 'query_vm_amount' })
    SourceOverviewResource.getCloudCountInfo(data).then(response => {
      const { code, result } = response.data
      if (code !== 200) {
        console.info('basic cloud calculate request failed')
        return
      }
      result.name = 'cloudCalc'
      result.title = '基础云计算'
      let item = {}
      if (result.total === 0) {
        item = result
        commit(types.GET_DISABLED_SERVICE_LIST, { item })
      } else {
        result.off = result.total - result.running
        item = result
        commit(types.GET_AVAILABLE_SERVICE_LIST, { item })
      }
    })
  }
}

const mutations = {
  [types.GET_AVAILABLE_SERVICE_LIST](state, { item }) {
    if (
      item.name === 'cloudCalc' ||
      item.name === 'cloudMonitor' ||
      item.name === 'cloudDns' ||
      item.name === 'sslCa' ||
      item.name === 'replaceMirror'
    ) {
      state.availableServices.basicApply.serviceList.push(item)
    } else if (item.name === 'webCdn') {
      state.availableServices.webCDN.serviceList.push(item)
    } else if (
      item.name === 'shieldEye' ||
      item.name === 'hwws' ||
      item.name === 'observeStar'
    ) {
      state.availableServices.cloudSafe.serviceList.push(item)
    } else if (
      item.name === 'tjkdApp' ||
      item.name === 'tjkdDns' ||
      item.name === 'tjkdPlus' ||
      item.name === 'tjkdweb'
    ) {
      state.availableServices.taichiDDos.serviceList.push(item)
    } else {
      console.info('无归属的服务', item)
    }
  },
  [types.GET_DISABLED_SERVICE_LIST](state, { item }) {
    if (
      item.name === 'cloudCalc' ||
      item.name === 'cloudMonitor' ||
      item.name === 'cloudDns' ||
      item.name === 'sslCa' ||
      item.name === 'replaceMirror'
    ) {
      state.disabledServiceList.basicApply.serviceList.push(item)
    } else if (item.name === 'webCdn') {
      state.disabledServiceList.webCDN.serviceList.push(item)
    } else if (
      item.name === 'shieldEye' ||
      item.name === 'hwws' ||
      item.name === 'observeStar'
    ) {
      state.disabledServiceList.cloudSafe.serviceList.push(item)
    } else if (
      item.name === 'tjkdApp' ||
      item.name === 'tjkdDns' ||
      item.name === 'tjkdPlus' ||
      item.name === 'tjkdweb'
    ) {
      state.disabledServiceList.taichiDDos.serviceList.push(item)
    } else {
      console.info('无归属的服务', item)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
