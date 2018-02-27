import { SourceSpeedCommonResource } from './'

export default {
  queryDomainInfo: params =>
    SourceSpeedCommonResource.get('/V4/Web.Domain.Info', {
      params: {
        ...params
      }
    }),
  getCertificationInfo: param =>
    SourceSpeedCommonResource.get(
      '/sso/V4/getCertificationInfo?breakcache=' + Math.random()
    ),
  getJoinStatus: params =>
    SourceSpeedCommonResource.get('V4/Web.Domain.check.cname.use.yundun', {
      params: {
        ...params
      }
    })
}
