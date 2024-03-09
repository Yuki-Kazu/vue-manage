import { login as loginApi } from "../../api/index";
import router from "../../router/index";

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem("token") || "",
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
  },
  actions: {
    login({ commit }, userInfo) {
      console.log("zbei login");
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            console.log(res);
            commit("setToken", res.token);
            router.replace("/");
            resolve();
          }).catch((err) => {
            reject(err);
          });
      });
    },
  },
};
