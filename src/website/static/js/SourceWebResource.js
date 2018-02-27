import { SourceWebResource } from './'

import qs from 'qs'

export default {
  getUserInfo: () => SourceWebResource.get('/sso/V4/getUserInfo'),
  getUnreadMessage: () =>
    SourceWebResource.get('/V4/overview.home.getUnread.message.number'),
  logOut: () => SourceWebResource.get('/sso/V4/logOut'),
  login: param => SourceWebResource.post('/sso/V4/login', qs.stringify(param)),
  getToken: params =>
    SourceWebResource.get('/sso/V4/attach', {
      params: {
        ...params
      }
    }),
  getCap: param =>
    SourceWebResource.post('/sso/V4/regSendMobileCap', qs.stringify(param)),
  findCap: param =>
    SourceWebResource.post('/sso/V4/findPassSendCap', qs.stringify(param)),
  register: param => {
    const queryString = qs.stringify(param)
    return SourceWebResource.post('/sso/V4/register', queryString)
  },
  findPass: param =>
    SourceWebResource.post('/sso/V4/findPass', qs.stringify(param)),
  getFriendLink: () => SourceWebResource.get('/V4/site.friendlink')
}
