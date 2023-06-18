import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../pages/Main.vue";
import Home from "../pages/Home.vue";
import User from "../pages/User.vue";
import Products from "../pages/Products.vue";
import Other1 from "../pages/Other1.vue";
import Other2 from "../pages/Other2.vue";
import Login from "../pages/Login.vue";
Vue.use(VueRouter);
// 组件与路径的映射
const routes = [
  {
    path: "/",
    component: Main,
    name:"Main",
    redirect: "/home", //路径的重新定向，当路径为/时，重新定向到/home
    children: [
      // { path: "Home", component: Home, name: "home" },
      // { path: "user", component: User },
      // { path: "mall", component: Products },
      // { path: "page1", component: Other1 },
      // { path: "page2", component: Other2 },
    ],
  },
  { path: "/login", component: Login, name: "login" },
];

// 创建router实例
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});

export default router;
