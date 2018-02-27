import { CommonResource } from './'

export default {
  judgeServe: params =>
    CommonResource.get('V4/product.status.get', {
      ...params
    }),
  getMemberMigrateTeam: params =>
    CommonResource.get('/V4/Member.getMemberMigrateTeam', {
      params: {
        ...params
      }
    }),
  getReportToken: params =>
    CommonResource.get('/V4/member.whole.report.token', {
      params: {
        ...params
      }
    })
}
