import Vue from 'vue'
import App from './app'
import { Button, Input, Form, FormItem, Message } from 'iview'
// import 'iview/lib/theme-default/index.css'
import 'common/assets/website-common-style'

Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.prototype.$message = Message
const app = new Vue({
  el: '#root',
  components: {
    App
  },
  render: h => h(App)
})
