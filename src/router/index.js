import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../layout/index.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
    // {
    //     path: "/",
    //     redirect: "/login",
    // },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/user",
                name: "user",
                meta: {
                    title: "个人中心",
                },
                component: () =>
                    import(/* webpackChunkName: "user" */ "../views/user"),
            },
            // {
            //     path: "/dashboard",
            //     name: "dashboard",
            //     meta: {
            //         title: "系统首页",
            //         permiss: "1",
            //     },
            //     component: () =>
            //         import(/* webpackChunkName: "dashboard" */ "../views/dashboard.vue"),
            // },
            // {
            //     path: "/customer",
            //     name: "customer",
            //     meta: {
            //         title: "用户信息",
            //         permiss: "2",
            //     },
            //     component: () =>
            //         import(/* webpackChunkName: "import" */ "../views/customer.vue"),
            // },
            // {
            //     path: "/customer",
            //     name: "customer",
            //     meta: {
            //         title: "订单管理",
            //         permiss: "2",
            //     },
            //     component: () =>
            //         import(/* webpackChunkName: "import" */ "../views/customer.vue"),
            // },
            // {
            //     path: "/customer",
            //     name: "customer",
            //     meta: {
            //         title: "商品管理",
            //         permiss: "2",
            //     },
            //     component: () =>
            //         import(/* webpackChunkName: "import" */ "../views/customer.vue"),
            // },
            // {
            //     path: "/customer",
            //     name: "customer",
            //     meta: {
            //         title: "溯源",
            //         permiss: "2",
            //     },
            //     component: () =>
            //         import(/* webpackChunkName: "import" */ "../views/customer.vue"),
            // },
        ]
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
