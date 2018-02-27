import 'common/assets/console-common-style'

import { Vue, VueRouter } from 'common/assets/console-common-script'
import App from './app'
import Product from './product'
import router from './router'
import store from './store'
import dict from 'common/config/dict.json'
import SourceGuardResource from './resource/SourceGuardResource'
import CommonResource from 'common/resource/CommonResource'
import Help from 'src/common/utils/help'

Vue.prototype.windowMessage = function(message) {
  this.$message({
    showClose: true,
    message,
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

const drawing = () =>
  CommonResource.judgeServe().then(res => {
    const status = res.data.data.items.hongwangweishi.status
    const isServe = status
    console.log('isServe', isServe)
    const BLOATED = isServe ? App : Product
    const app = new Vue({
      el: '#root',
      store,
      router,
      components: {
        BLOATED
      },
      render: h => h(BLOATED)
    })
  })

const initInstance = async () => {
  await Help.verdictLogin()
  await SourceGuardResource.getWebsiteList().then(res => {})
  await drawing()
}

initInstance()
