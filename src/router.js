import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

// 导入组件
import index from "./components/index.vue"
import login from "./components/login.vue"
import users from "./components/users.vue"
import roles from "./components/roles.vue"
import rights from "./components/rights.vue"
import goods from "./components/goods.vue"
import categories from "./components/categories.vue"
import orders from "./components/orders.vue"
import params from "./components/params.vue"
import reports from "./components/reports.vue"

// 规则
let routes = [{
        path: "/login",
        component: login
    },
    {
        path: "/index",
        component: index
    },
    {
        path: "/",
        component: index,
        children: [{
                path: "users",
                component: users
            },
            {
                path: "roles",
                component: roles
            },
            {
                path: "rights",
                component: rights
            },
            {
                path: "goods",
                component: goods
            },
            {
                path:"categories",
                component:categories
            },
            {
                path:"orders",
                component:orders
            },
            {
                path:"params",
                component:params
            },
            {
                path:"reports",
                component:reports
            }
        ]

    }
]

// 实例化路由对象
let router = new VueRouter({
    routes
})

// 注册全局前置守卫

router.beforeEach((to,from,next)=>{
    if(to.path==='/login'){
        next()
    }else{
        if(window.sessionStorage.getItem('token')){
            next()
        }else{
            Vue.prototype.$message.error("导航守卫在此，请先登录")
            next('/login')
        }
    }
})

// 暴露
export default router