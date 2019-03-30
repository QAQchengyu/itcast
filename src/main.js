import Vue from 'vue'
import App from './App.vue'

// 导入elmUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入公共样式
import './assets/base.scss'

Vue.config.productionTip = false

// 导入路由
import router from "./router.js"

new Vue({
  render: h => h(App),
  // 挂载到Vue实例
  router
}).$mount('#app')
