import * as types from '../constants/MutationTypes'

const initVisible = false
// const linkageVisible = false

const state = {
  addMonitor: {
    visible: initVisible
  },
  linkageSetting: {
    visible: initVisible
  },
  taskConfig: {
    visible: initVisible
  },
  alarmSetting: {
    visible: initVisible
  }
}

const actions = {
  triggerAddMonitorVisible({ commit, state }, visible) {
    commit(types.ADD_MONITOR_VISIBLE, {
      visible
    })
  },
  triggerLinkageSettingVisible({ commit, state }, visible) {
    commit(types.LINKAGE_SETTING_VISIBLE, {
      visible
    })
  },
  triggerTaskConfigVisible({ commit, state }, visible) {
    commit(types.TASK_CONFIG_VISIBLE, {
      visible
    })
  },
  triggerAlarmSettingVisible({ commit, state }, visible) {
    commit(types.ALARM_SETTING_VISIBLE, {
      visible
    })
  }
}

const mutations = {
  [types.ADD_MONITOR_VISIBLE](state, { visible }) {
    state.addMonitor.visible = visible
  },
  [types.LINKAGE_SETTING_VISIBLE](state, { visible }) {
    state.linkageSetting.visible = visible
  },
  [types.TASK_CONFIG_VISIBLE](state, { visible }) {
    state.taskConfig.visible = visible
  },
  [types.ALARM_SETTING_VISIBLE](state, { visible }) {
    state.alarmSetting.visible = visible
  }
}

export default {
  state,
  actions,
  mutations
}
