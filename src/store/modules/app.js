import { login as loginApi } from "@/api";
import router from "@/router";

export default {
    namespaced: true,
    state: () => ({
        token: localStorage.getItem("token") || "",
        number: localStorage.getItem("number") || "",
    }),
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        setNumber(state, number) {
            state.number = number;
            localStorage.setItem("number", number);
        },
    },
    actions: {
        login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginApi(userInfo).then(res => {
                    console.log(res);
                    commit("setToken", res.data.data.token);
                    commit("setNumber", res.data.data.number);
                    router.replace("/");
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            });
        },
    },
};
