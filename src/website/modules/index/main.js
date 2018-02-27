import Vue from 'vue'
import Root from './Root'
import 'whatwg-fetch'
import 'core-js'
import { Carousel, CarouselItem } from 'iview'
import 'common/assets/website-common-style'
import Meta from 'vue-meta'

Vue.use(Meta, {
  keyName: 'metaInfo'
})
Vue.use(Carousel)
Vue.use(CarouselItem)

Vue.prototype.fetchGet = function(apiName, params = {}) {
  let searchParams = ''
  for (const key in params) {
    const value = params[key]
    searchParams += (searchParams === '' ? '?' : '&') + `${key}=${value}`
  }
  const opt = {
    method: 'GET'
  }
  return fetch(process.env.API + apiName + searchParams, opt)
}

const app = new Vue({
  el: '#root',
  components: {
    Root
  },
  render: h => h(Root),
  data: {
    eventHub: new Vue()
  }
})
