import nprogress from 'nprogress'
import { Message } from 'iview'

class Interceptor {
  constructor({
    progress = false,
    configure = {},
    beforeRequest = [],
    afterResponse = []
  } = {}) {
    progress && this.progressInit(configure)

    this.beforeRequest = [
      config => {
        progress && this.progressStart()
        if (beforeRequest[0]) {
          beforeRequest[0](config)
        } else {
          return config
        }
      },
      error => {
        progress && this.progressStop()
        if (beforeRequest[1]) {
          beforeRequest[1](error)
        } else {
          // Message.error({
          //   message: error.toString()
          // })
          return Promise.reject(error)
        }
      }
    ]

    this.afterResponse = [
      response => {
        progress && this.progressStop()
        if (afterResponse[0]) {
          afterResponse[0](response)
        } else {
          if (response.data.status.code === 16149) {
            const error = response.data.status
            window.location.href = '/login'
            return Promise.reject(error)
          }
          if (
            response.data.status.code === 16161 ||
            response.data.status.code === 1124
          ) {
            const error = response.data.status
            return Promise.reject(error)
          }
          if (response.data.status.code !== 1) {
            const error = response.data.status
            Message.error({
              message: error.message
            })
            return Promise.reject(error)
          } else {
            return response
          }
        }
      },
      ...error => {
        progress && this.progressStop()
        if (afterResponse[1]) {
          afterResponse[1](error)
        } else {
          return Promise.reject(error)
        }
      }
    ]
  }

  progressStart() {
    nprogress.start()
  }

  progressStop() {
    nprogress.done()
  }

  progressInit(configure) {
    nprogress.configure({
      showSpinner: false,
      ...configure
    })
  }
}

const BASE_URL = '/api'
const GAME_URL = '/game_api'
const CLOUD_URL = '/cloud_api'
const PRECEPTION_URL = '/perception_api'
const NORMAL_API = '/normal_api'

export { BASE_URL, GAME_URL, CLOUD_URL, PRECEPTION_URL, NORMAL_API }
export default Interceptor
