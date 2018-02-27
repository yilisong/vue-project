import { SourceSpeedResource } from './'

export default {
  // websietList
  getWebsiteByParams: params =>
    SourceSpeedResource.post('/V4/Web.Domain.list', {
      ...params
    }),
  addWebsite: params =>
    SourceSpeedResource.post('/V4/Web.Domain.add.transaction', {
      ...params
    }),
  getWebsiteConfigInfo: params =>
    SourceSpeedResource.get('/V4/Web.Domain.get.transaction', {
      params: {
        ...params
      }
    }),
  updateWebsiteConfig: params =>
    SourceSpeedResource.put('/V4/Web.Domain.edit.transaction', {
      ...params
    }),
  openCloseProtect: params =>
    SourceSpeedResource.put('/V4/Web.Domain.Open.Close.Protect', {
      ...params
    }),
  generateTxtRecords: params =>
    SourceSpeedResource.post('/V4/Web.Domain.verify.generateTXTRecords', {
      ...params
    }),
  generateFileCode: params =>
    SourceSpeedResource.post('/V4/Web.Domain.verify.generateFileCode', {
      ...params
    }),
  postCertifyTxtComplete: params =>
    SourceSpeedResource.post('/V4/Web.Domain.verify.verifyTXTRecords', {
      ...params
    }),
  postCertifyFileComplete: params =>
    SourceSpeedResource.post('/V4/Web.Domain.verify.verifyFileCode', {
      ...params
    }),
  postReCheck: params =>
    SourceSpeedResource.post('/V4/Web.Domain.reCheck', {
      ...params
    }),
  // console-tab-pages
  getSearchEngineOptimization: domainId =>
    SourceSpeedResource.get(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.search_engine_optimization`,
      {}
    ),
  putSearchEngineOptimization: (domainId, params) =>
    SourceSpeedResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.search_engine_optimization`,
      {
        ...params
      }
    ),
  // console-tab-perform
  putCdnAdvanceCache: (domainId, params, id) =>
    SourceSpeedResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cdn_advance_cache.rules.${id}`,
      {
        ...params
      }
    ),
  postCdnAdvanceCache: (domainId, params) =>
    SourceSpeedResource.post(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cdn_advance_cache.rules`,
      {
        ...params
      }
    ),
  getCloudIds: domainId =>
    SourceSpeedResource.get(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cloud_ids`,
      {}
    ),
  putCloudIds: (domainId, params) =>
    SourceSpeedResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cloud_ids`,
      {
        ...params
      }
    ),
  addSubstitute: params =>
    SourceSpeedResource.post('/V4/replaceMirror.mirror.add', {
      ...params
    }),
  //console-tab-basic
  putAntiCcRules: (domainId, params, id) =>
    SourceSpeedResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc.rules.${id}`,
      {
        ...params
      }
    ),
  postAntiCcRules: (domainId, params) =>
    SourceSpeedResource.post(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.anti_cc.rules`,
      {
        ...params
      }
    ),
  putVisitLimitBlacklist: (domainId, params, id) =>
    SourceSpeedResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.visit_limit_blacklist.rules.${id}`,
      {
        ...params
      }
    ),
  postVisitLimitBlacklist: (domainId, params) =>
    SourceSpeedResource.post(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.visit_limit_blacklist.rules`,
      {
        ...params
      }
    )
}
