import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import request from './utils/request'
import api from './utils/api'
Vue.prototype.request = request;
Vue.prototype.api = api;


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
