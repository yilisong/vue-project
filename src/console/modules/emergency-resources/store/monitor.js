import * as types from '../constants/MutationTypes'
import SourceMonitorResource from '../resource/SourceMonitorResource'
import { Message } from 'iview'
import Vue from 'vue'

const state = {
  list: [],
  total: 0,
  statusCode: 0,
  pageSize: 5
}

const actions = {
  getMonitorByPage({ commit, state }, params) {
    SourceMonitorResource.getMonitorByPage(params)
      .then(response => {
        if (
          response.data &&
          response.data.data &&
          response.data.status.code === 1
        ) {
          const { list, total } = response.data.data
          commit(types.RECEIVE_MONITOR_BY_PAGE, { list })
          commit(types.RECEIVE_MONITOR_TOTAL, { total })
        }
      })
      .catch()
  },
  addMonitorSave({ dispatch, commit, state }, params) {
    SourceMonitorResource.addMonitorSave(params.data).then(response => {
      const { code, message } = response.data.status
      commit(types.ADD_MONITOR_SAVE, { code })
      if (code === 1) {
        dispatch('getMonitorByPage', params.page)
      }
      Message.info({
        message,
        showClose: true
      })
    })
  },
  pauseMonitorList({ dispatch, commit, state }, params) {
    SourceMonitorResource.pauseMonitorList(params.data).then(response => {
      const { code, message } = response.data.status
      commit(types.PAUSE_MONITOR_LIST, { code })
      if (code === 1) {
        dispatch('getMonitorByPage', params.page)
      }
      Message.info({
        message,
        showClose: true
      })
    })
  },
  openMonitorList({ dispatch, commit, state }, params) {
    SourceMonitorResource.openMonitorList(params.data).then(response => {
      const { code, message } = response.data.status
      commit(types.OPEN_MONITOR_LIST, { code })
      if (code === 1) {
        dispatch('getMonitorByPage', params.page)
      }
      Message.info({
        message,
        showClose: true
      })
    })
  },
  deleteMonitorList({ dispatch, commit, state }, params) {
    SourceMonitorResource.deleteMonitorList(params.data).then(response => {
      const { code, message } = response.data.status
      commit(types.DELETE_MONITOR_LIST, { code })
      if (code === 1) {
        dispatch('getMonitorByPage', params.page)
      }
      Message.info({
        message,
        showClose: true
      })
    })
  }
}

const mutations = {
  [types.RECEIVE_MONITOR_BY_PAGE](state, { list }) {
    state.list = list
  },
  [types.RECEIVE_MONITOR_TOTAL](state, { total }) {
    state.total = parseInt(total, 10)
  },
  [types.ADD_MONITOR_SAVE](state, { code }) {
    state.statusCode = code
  },
  [types.PAUSE_MONITOR_LIST](state, { code }) {
    state.statusCode = code
  },
  [types.OPEN_MONITOR_LIST](state, { code }) {
    state.statusCode = code
  },
  [types.DELETE_MONITOR_LIST](state, { code }) {
    state.statusCode = code
  }
}

export default {
  state,
  actions,
  mutations
}
