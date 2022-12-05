import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import {createWebHistory,createRouter} from 'vue-router'


const routes=[
    {
        name:'home',
        component:Home,
        path:'/'
    },
    {
        name:'SignUp',
        component:SignUp,
        path:'/sign-up'
    },
    {
        name:'Login',
        component:Login,
        path:'/login'
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})
export default router