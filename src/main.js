import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import { createPinia } from 'pinia';

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const pinia = createPinia();

const app = createApp(App)
  .use(router)
  .use(store)
  .use(pinia)
  .use(ElementPlus)
  .mount("#app");


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}