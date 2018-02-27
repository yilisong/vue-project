import { ConsoleTabPerformResource } from './'

export default {
  putCdnAdvanceCache: (domainId, params, id) =>
    ConsoleTabPerformResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cdn_advance_cache.rules.${id}`,
      {
        ...params
      }
    ),
  postCdnAdvanceCache: (domainId, params) =>
    ConsoleTabPerformResource.post(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cdn_advance_cache.rules`,
      {
        ...params
      }
    ),
  getCloudIds: domainId =>
    ConsoleTabPerformResource.get(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cloud_ids`,
      {}
    ),
  putCloudIds: (domainId, params) =>
    ConsoleTabPerformResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cloud_ids`,
      {
        ...params
      }
    ),
  addSubstitute: params =>
    ConsoleTabPerformResource.post('/V4/replaceMirror.mirror.add', {
      ...params
    }),
  putIgnoreHead: (domainId, params) =>
    ConsoleTabPerformResource.put(
      `/V4/Web.Domain.DomainId.${domainId}.Settings.cdn_advance_cache`,
      {
        ...params
      }
    )
}
