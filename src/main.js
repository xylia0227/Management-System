import Vue from "vue";
import store from "./store";
import "./api/mock";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Cookie from "js-cookie";

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  // 页面刷新时，也可以启用addMenu
  created(){
    store.commit('addMenu',router)
  }
}).$mount("#app");

// 添加全局前置路由守卫;
router.beforeEach((to, from, next) => {
  const token = Cookie.get("token");
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } 
  else if (token && to.name === "login") {
    next({ name: "home" });
  }
   else {
    next();
  }
});
