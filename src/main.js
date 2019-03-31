import Vue from 'vue'
import App from './App.vue'

// 导入elmUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.prototype.$axios = axios

// 导入公共样式
import './assets/base.scss'

Vue.config.productionTip = false

// 设置axios拦截器
// 请求拦截器 请求之前统一设置一些内容 比如token
axios.interceptors.request.use(function (config) {
  // 统一设置token
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config;
}, function (error) {
  return Promise.reject(error);
});
// 响应拦截器 统一处理响应
axios.interceptors.response.use(function (response) {
  // 统一弹框
  if ([200, 201, 204].indexOf(response.data.meta.status) != -1) {
    Vue.prototype.$message.success(response.data.meta.msg)
  } else {
    Vue.prototype.$message.warning(response.data.meta.msg)
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

// 导入路由
import router from "./router.js"

new Vue({
  render: h => h(App),
  // 挂载到Vue实例
  router
}).$mount('#app')