import 'common/assets/console-common-style'
import './assets/styles/index.css'

import { Vue, VueRouter } from 'common/assets/console-common-script'
import App from './app'
import router from './router'
import store from './store'
import dict from 'common/config/dict.json'

Vue.prototype.fetchGet = function(apiName, params = {}) {
  let searchParams = ''
  for (const key in params) {
    const value = params[key]
    searchParams += (searchParams === '' ? '?' : '&') + `${key}=${value}`
  }
  const opt = {
    method: 'GET',
    credentials: 'same-origin'
  }
  return fetch(process.env.API + apiName + searchParams, opt)
}

Vue.prototype.fetchPost = function(apiName, params = {}) {
  console.log('postParams====', params)
  const postData = params
  return fetch(process.env.API + apiName, {
    method: 'POST',
    body: JSON.stringify(postData),
    credentials: 'same-origin'
  })
}

Vue.prototype.fetchDel = function(apiName, params = {}) {
  const delData = params
  return fetch(process.env.API + apiName, {
    method: 'DELETE',
    body: JSON.stringify(delData),
    credentials: 'same-origin'
  })
}

Vue.prototype.fetchPut = function(apiName, params = {}) {
  const putData = params
  return fetch(process.env.API + apiName, {
    method: 'PUT',
    body: JSON.stringify(putData),
    credentials: 'same-origin'
  })
}

Vue.prototype.resToBoolean = function(resStatus) {
  if (resStatus === 'on' || resStatus === '1' || resStatus === 1) {
    return true
  } else if (resStatus === 'off' || resStatus === '0' || resStatus === 0) {
    return false
  }
}

Vue.prototype.booleanToNum = function(booleanValue) {
  if (booleanValue) {
    return '1'
  } else {
    return '0'
  }
}

Vue.prototype.booleanToOnOff = function(booleanValue) {
  if (booleanValue) {
    return 'on'
  } else {
    return 'off'
  }
}

Vue.prototype.windowMessage = function(resValue) {
  console.log(resValue)
  const message = resValue.status.message
  const code = resValue.status.code
  if (code === 1) {
    this.$message({
      showClose: true,
      message,
      type: 'success'
    })
  } else {
    this.$message({
      showClose: true,
      message,
      type: 'error'
    })
  }
}

Vue.prototype.operationSucceed = function() {
  this.$message({
    showClose: true,
    message: '操作成功！',
    type: 'success'
  })
}

Vue.filter('dict', (value, key) => {
  if (!value || !key) return ''
  let label = ''
  const keys = key.split('.') // key 强制两层 eg: "disk.type"
  const values = dict[keys[0]][keys[1]]
  values.forEach(item => {
    if (item.value === value) {
      label = item.label
    }
  })
  return label
})

const app = new Vue({
  el: '#root',
  store,
  router,
  components: {
    App
  },
  render: h => h(App)
})
