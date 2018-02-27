import { SourceOverviewResource, SourceCloudResource } from './'

export default {
  getCDNFloweter: params =>
    SourceOverviewResource.get('/V4/Web.Domain.Report.Traffic.speed', {
      params: {
        ...params
      }
    }),
  getMessageList: params =>
    SourceOverviewResource.get('/V4/messagecenter.home.getmessagelist', {
      params: {
        ...params
      }
    }),
  getBalance: params =>
    SourceOverviewResource.get('/V4/finance.recharge.getMemberBalance', {
      params: {
        ...params
      }
    }),
  getMessageFlowmeter: params =>
    SourceOverviewResource.get('/V4/overview.home.getsmsandcdn', {
      params: {
        ...params
      }
    }),
  getBasicApplicationInfo: params =>
    SourceOverviewResource.get('/V4/overview.home.getbaseapplicationinfo', {
      params: {
        ...params
      }
    }),
  getTJKDInfo: params =>
    SourceOverviewResource.get('/V4/overview.home.gettjkdinfo', {
      params: {
        ...params
      }
    }),
  getWEBCDNInfo: params =>
    SourceOverviewResource.get('/V4/overview.home.getwebcdn', {
      params: {
        ...params
      }
    }),
  getCloudSafeInfo: params =>
    SourceOverviewResource.get('/V4/overview.home.getcloudsafe', {
      params: {
        ...params
      }
    }),
  getCloudCountInfo: data =>
    SourceCloudResource.post('/', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }),
  getTodayData: params =>
    SourceOverviewResource.get('/V4/overview.home.getbigdata', {
      params: {
        ...params
      }
    }),
  getProductInfo: () =>
    SourceOverviewResource.get('/V4/overview.home.getarticlelists', {})
}
