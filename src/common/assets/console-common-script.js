import 'whatwg-fetch'
import 'core-js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Iview from 'iview'
import 'common/utils/hmr-events'

Vue.use(VueRouter)
Vue.use(Iview)

export { Vue, VueRouter, Iview }
