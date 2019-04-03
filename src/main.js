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

// 导入面包屑
import myBread from './components/myBread.vue'
Vue.component('my-bread',myBread)

// 导入moment组件和过滤器
import moment from 'moment'
Vue.filter('formatTime', (value,formatTem)=>{
  return moment(value).format(formatTem);
})

// 导入我的axios插件
import myaxios from './myaxios.js'
// use一下 调用了 插件的install方法
Vue.use(myaxios)

Vue.config.productionTip = false

// 导入路由
import router from "./router.js"

new Vue({
  render: h => h(App),
  // 挂载到Vue实例
  router
}).$mount('#app')