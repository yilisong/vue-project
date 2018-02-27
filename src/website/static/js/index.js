import axios from 'axios'
import Interceptor, { BASE_URL } from 'common/config/interceptor'

axios.defaults.timeout = 180000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const resources = {
  SourceWebResource: axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

const InterceptorRegular = new Interceptor()

resources.SourceWebResource.interceptors.request.use(
  ...InterceptorRegular.beforeRequest
)

// resources.SourceWebResource.interceptors.request.use(
//   ...InterceptorRegular.afterResponse
// )

export const { SourceWebResource } = resources
