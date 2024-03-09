import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../views/login')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
