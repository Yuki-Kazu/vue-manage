import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
    // {
    //     path: "/",
    //     redirect: "/login",
    // },
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../layout')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../views/login')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
