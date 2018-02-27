import * as types from '../constants/mutation-types'
import SourceMirror from '../resource/SourceMirror'
import { Message } from 'iview'
import Vue from 'vue'

const state = {
  list: [],
  total: 0,
  backupInfo: '',
  statusCode: 1,
  pageSize: 10,
  backupInfoList: [],
  initialInfoList: [],
  backupContent: '',
  regularUpdate: '',
  size: 1,
  id: ''
}

const actions = {
  getDoubleMirrorList({ commit, state }, params) {
    SourceMirror.getDoubleMirrorList(params).then(response => {
      if (response.data && response.data.data) {
        const { backupInfo } = response.data.data
        const size = params.page
        commit(types.BACKUP_INFO, { backupInfo, size })
        if (response.data.data.list) {
          const { list, total } = response.data.data
          commit(types.RECEIVE_MIRROR_BY_PAGE, { list })
          commit(types.RECEIVE_MIRROR_TOTAL, { total })
        }
      } else {
        const message = response.data.status.message
        Message.info({
          showClose: true,
          message
        })
      }
    })
  },
  deleteDoubleMirror({ dispatch, commit, state }, params) {
    SourceMirror.deleteDoubleMirror(params.data).then(response => {
      const { code, message } = response.data.status
      commit(types.DELETE_DOUBLE_MIRROR, { code })
      if (code === 1) {
        dispatch('getDoubleMirrorList', params.page)
      }
      Message.info({
        message,
        showClose: true
      })
    })
  },
  addDoubleMirror({ dispatch, commit, state }, params) {
    SourceMirror.addDoubleMirror(params.data).then(response => {
      const { code, message } = response.data.status
      commit(types.ADD_DOUBLE_MIRROR, { code })
      if (code === 1) {
        dispatch('getDoubleMirrorList', params.page)
      }
      Message.info({
        message,
        showClose: true
      })
    })
  },
  refreshDoubleMirror({ dispatch, commit, state }, params) {
    SourceMirror.refreshDoubleMirror(params.data).then(response => {
      const { code, message } = response.data.status
      commit(types.REFRESH_DOUBLE_MIRROR, { code })
      if (code === 1) {
        dispatch('getDoubleMirrorList', params.page)
      }
      Message.info({
        message,
        showClose: true
      })
    })
  },
  deployDoubleMirror({ dispatch, commit, state }, params) {
    SourceMirror.deployDoubleMirror(params.data).then(response => {
      const { code, message } = response.data.status
      commit(types.DEPLOY_DOUBLE_MIRROR, { code })
      if (code === 1) {
        dispatch('getDoubleMirrorList', params.page)
      }
      Message.info({
        message,
        showClose: true
      })
    })
  },
  getDeployDoubleMirror({ commit, state }, params) {
    SourceMirror.getDeployDoubleMirror(params).then(response => {
      if (response.data && response.data.data && response.data.data) {
        const backupInfoList = response.data.data.blackList
        const initialInfoList = response.data.data.Initial_fetch_urls
        const regularUpdate = response.data.data.regular_update
        if (
          response.data.data.backup_content === null ||
          response.data.data.backup_content === ''
        ) {
          response.data.data.backup_content = 1
        }
        const backupContent = Number(response.data.data.backup_content)
        commit(types.BLACK_LIST, {
          backupInfoList,
          initialInfoList,
          regularUpdate,
          backupContent
        })
      } else {
        const message = response.data.status.message
        Message.info({
          showClose: true,
          message
        })
      }
    })
  },
  addDeployDoubleMirrorList({ commit, state }, index) {
    commit(types.ADD_DEPLOY_DOUBLE_MIRROR_LIST, { index })
  },
  deleteDeployDoubleMirrorList({ commit, state }, index) {
    commit(types.DELETE_DEPLOY_DOUBLE_MIRROR_LIST, { index })
  },
  addInitialMirrorList({ commit, state }, index) {
    commit(types.ADD_INITIAL_MIRROR_LIST, { index })
  },
  deleteInitialMirrorList({ commit, state }, index) {
    commit(types.DELETE_INITIAL_MIRROR_LIST, { index })
  }
}

const mutations = {
  [types.RECEIVE_MIRROR_BY_PAGE](state, { list }) {
    state.list = list
  },
  [types.RECEIVE_MIRROR_TOTAL](state, { total }) {
    state.total = parseInt(total, 10)
  },
  [types.BACKUP_INFO](state, { backupInfo, size }) {
    state.backupInfo = backupInfo
    state.size = size
  },
  [types.DELETE_DOUBLE_MIRROR](state, { code }) {
    state.statusCode = code
  },
  [types.ADD_DOUBLE_MIRROR](state, { code }) {
    state.statusCode = code
  },
  [types.REFRESH_DOUBLE_MIRROR](state, { code }) {
    state.statusCode = code
  },
  [types.DEPLOY_DOUBLE_MIRROR](state, { code }) {
    console.log('code', code)
    state.statusCode = code
  },
  [types.BLACK_LIST](
    state,
    { backupInfoList, initialInfoList, regularUpdate, backupContent }
  ) {
    state.regularUpdate = regularUpdate
    state.backupContent = backupContent
    state.backupInfoList = []
    state.initialInfoList = []
    initialInfoList.forEach((v, i) => {
      state.initialInfoList.push({
        id: v.id,
        url: v.url,
        disabled: true,
        port: v.port,
        borderNone: 'borderNone'
      })
    })
    backupInfoList.forEach((v, i) => {
      state.backupInfoList.push({
        id: v.id,
        url: v.url,
        mirror_id: v.mirror_id,
        disabled: true,
        borderNone: 'borderNone'
      })
    })
  },
  [types.ADD_DEPLOY_DOUBLE_MIRROR_LIST](state, { params }) {
    state.backupInfoList.unshift({
      url: '',
      disabled: false,
      display: 'displayBlock'
    })
  },
  [types.DELETE_DEPLOY_DOUBLE_MIRROR_LIST](state, { index }) {
    state.backupInfoList.splice(index, 1)
  },
  [types.ADD_INITIAL_MIRROR_LIST](state, { params }) {
    state.initialInfoList.unshift({
      url: '',
      port: '80',
      disabled: false,
      display: 'displayBlock'
    })
  },
  [types.DELETE_INITIAL_MIRROR_LIST](state, { index }) {
    state.initialInfoList.splice(index, 1)
  }
}

export default {
  state,
  actions,
  mutations
}
