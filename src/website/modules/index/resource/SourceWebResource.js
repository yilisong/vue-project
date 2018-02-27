import { SourceWebResource } from './'

export default {
  getAttack: params =>
    SourceWebResource.get('/V4/site.today.report.allplat', {
      params: {
        ...params
      }
    })
}
