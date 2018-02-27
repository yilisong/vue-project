import axios from 'axios'
import Interceptor, { BASE_URL } from 'common/config/interceptor'

axios.defaults.timeout = 180000

const resources = {
  SourceGuardResource: axios.create({
    baseURL: BASE_URL
  })
}

const InterceptorWithProgress = new Interceptor({ progress: false })

for (const key of Object.keys(resources)) {
  resources[key].interceptors.request.use(
    ...InterceptorWithProgress.beforeRequest
  )
  resources[key].interceptors.response.use(
    ...InterceptorWithProgress.afterResponse
  )
}

export const { SourceGuardResource } = resources
