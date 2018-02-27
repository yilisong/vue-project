import Vue from 'vue'
import iview from 'iview'
import Root from './Root'
import 'iview/dist/styles/iview.css'
import 'common/assets/website-common-style'
import removeUrlHash from 'common/utils/removeUrlHash'

removeUrlHash()

Vue.use(iview)
const app = new Vue({
  el: '#root',
  components: {
    Root
  },
  render: h => h(Root)
})
