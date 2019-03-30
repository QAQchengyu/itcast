import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

// 导入组件
import index from "./components/index.vue"
import login from "./components/login.vue"

// 规则
let routes =[
    {
        path:"/login",
        component:login
    },
    {
        path:"/index",
        component:index
    },
    {
        path:"/",
        component:index
    }
]

// 实例化路由对象
let router = new VueRouter({
    routes
})

// 暴露
export default router