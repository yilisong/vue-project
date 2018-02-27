import { SourceMirror } from './'

export default {
  getDoubleMirrorList: params =>
    SourceMirror.get('/V4/replaceMirror.mirror.list', {
      params: {
        ...params
      }
    }),
  deleteDoubleMirror: params =>
    SourceMirror.delete('/V4/replaceMirror.mirror.del', {
      params: {
        ...params
      }
    }),
  addDoubleMirror: params =>
    SourceMirror.post('/V4/replaceMirror.mirror.add', {
      ...params
    }),
  refreshDoubleMirror: params =>
    SourceMirror.post('/V4/replaceMirror.mirror.refresh', {
      ...params
    }),
  deployDoubleMirror: params =>
    SourceMirror.post('/V4/replaceMirror.mirror.configure', {
      ...params
    }),
  getDeployDoubleMirror: params =>
    SourceMirror.post('/V4/replaceMirror.mirror.configureInfo', {
      ...params
    })
  // /V4/replaceMirror.mirror.configure
}
