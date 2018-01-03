import Vue from 'vue'
import Router from 'vue-router'
import FastClick from 'fastclick'
//import axios from 'axios'
import {getCookie,setCookie,delCookie} from './lib/cookie'
import axios from './lib/http'
import Vum from './vum.js'
import router from './app-route.js'
import api from './lib/api.js'
//设置cookie可携带
axios.defaults.withCredentials = true
Vue.use(Router)
Vue.use(Vum)
Vue.prototype.$http = axios
new Vue({
  router
}).$mount('#app')

Vum.router(router)

FastClick.attach(document.body)
