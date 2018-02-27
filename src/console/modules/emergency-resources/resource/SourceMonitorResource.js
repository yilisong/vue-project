import { SourceMonitorResource } from './'

export default {
  getPackageInfo: params =>
    SourceMonitorResource.get('/V4/cloudmonitor.package.overview', {
      params: {
        ...params
      }
    }),
  getMonitorByPage: params =>
    SourceMonitorResource.get('/V4/cloudmonitor.task.list', {
      params: {
        ...params
      }
    }),
  addMonitorSave: params =>
    SourceMonitorResource.post('/V4/cloudmonitor.task.add', params),
  pauseMonitorList: params =>
    SourceMonitorResource.post('/V4/cloudmonitor.task.pause', params),
  openMonitorList: params =>
    SourceMonitorResource.post('/V4/cloudmonitor.task.open', params),
  saveTask: params =>
    SourceMonitorResource.post('/V4/cloudmonitor.task.save', params),
  getTaskInfo: params =>
    SourceMonitorResource.post('/V4/cloudmonitor.task.info', params),
  deleteMonitorList: params =>
    SourceMonitorResource.post('/V4/cloudmonitor.task.delete', params),
  getLinkageInfo: params =>
    SourceMonitorResource.post('/V4/cloudmonitor.linkage.info', params),
  getLinkageRecords: params =>
    SourceMonitorResource.post('/V4/cloudmonitor.task.records', params),
  saveAlertSetting: params =>
    SourceMonitorResource.post('/V4/cloudmonitor.alertSetting.save', params),
  getAlertSetting: params =>
    SourceMonitorResource.post('/V4/cloudmonitor.alertSetting.info', params),
  availabilityReoprt: params =>
    SourceMonitorResource.get('/V4/cloudmonitor.stats.availability', {
      params: {
        ...params
      }
    }),
  failurerateReoprt: params =>
    SourceMonitorResource.get('/V4/cloudmonitor.stats.failurerate', {
      params: {
        ...params
      }
    }),
  linkageLogDns: params =>
    SourceMonitorResource.get('/V4/cloudmonitor.stats.linkage.log', {
      params: {
        ...params
      }
    }),
  getAlertList: params =>
    SourceMonitorResource.get('/V4/cloudmonitor.alert.list', {
      params: {
        ...params
      }
    }),
  getMalfunctionDetails: params =>
    SourceMonitorResource.get('/V4/cloudmonitor.alert.info', {
      params: {
        ...params
      }
    }),
  saveLinkageSetting: params =>
    SourceMonitorResource.post('/V4/cloudmonitor.linkage.save', params)
}
