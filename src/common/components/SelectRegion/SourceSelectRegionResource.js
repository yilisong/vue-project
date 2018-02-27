import { SourceSelectRegionResource } from './resource'

export default {
  addWebsite: params =>
    SourceSelectRegionResource.post('/V4/Web.Domain.add.transaction', {
      ...params
    }),
  getRegion: params =>
    SourceSelectRegionResource.get('/V4/Web.Domain.Region', {
      params: {
        ...params
      }
    })
}
