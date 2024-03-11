import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../layout/index.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        redirect: '/user',
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
            {
                path: "/customer",
                name: "customer",
                meta: {
                    title: "用户信息",
                    // permiss: "2",
                },
                component: () =>
                    import(/* webpackChunkName: "customer" */ "../views/customer"),
            },
            {
                path: "/item",
                name: "item",
                meta: {
                    title: "商品管理",
                    // permiss: "2",
                },
                component: () =>
                    import(/* webpackChunkName: "item" */ "../views/item"),
            },
            {
                path: "/order",
                name: "order",
                meta: {
                    title: "订单管理",
                    // permiss: "2",
                },
                component: () =>
                    import(/* webpackChunkName: "order" */ "../views/order"),
            },
            {
                path: "/ad",
                name: "ad",
                meta: {
                    title: "广告",
                    // permiss: "2",
                },
                component: () =>
                    import(/* webpackChunkName: "ad" */ "../views/ad"),
            },
            {
                path: "/code",
                name: "code",
                meta: {
                    title: "溯源",
                    // permiss: "2",
                },
                component: () =>
                    import(/* webpackChunkName: "code" */ "../views/code"),
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/login')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


router.afterEach(() => {
    NProgress.done();
});

// router.onError((error) => {
//     const pattern = /Loading chunk (\d)+ failed/g;
//     const isChunkLoadFailed = error.message.match(pattern);
//     const targetPath = router.history.pending.fullPath;
//     if (isChunkLoadFailed) {
//         router.replace(targetPath);
//     }
// })


export default router;
