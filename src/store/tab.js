import Cookie from "js-cookie";
export default {
  state: {
    isCollapse: false,
    tabsList: [],
    Array: [1, 2, 3, 4],
    menu: [],
  },
  mutations: {
    changeMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 面包屑
    selectMenu(state, value) {
      // 特殊情况：首页不添加
      if (value.name !== "home") {
        const index = state.tabsList.findIndex(
          (item) => item.name === value.name
        );

        if (index === -1) {
          state.tabsList.push(value);
        }
      }
    },
    // 设置menu数据
    setMenu(state, val) {
      this.state.menu = val;
      // state中的数据刷新就没有了，所以需要缓存在cookie或者localstore中
      Cookie.set("menu", JSON.stringify(val));
    },
    // 动态注册路由
    addMenu(state, router) {
      // 判断缓存中是否有数据,如果没有，直接return出去
      if (!Cookie.get("menu")) return;
      const menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      // 组装动态路由的数据
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children.map((item) => {
            item.component = () => import(`../pages/${item.url}`);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`../pages/${item.url}`);
          menuArray.push(item);
        }
      });
      console.log("menuforeach走完了");
      console.log(menuArray);
      // 路由的动态添加
      menuArray.forEach((item) => {
        console.log("1");
        router.addRoute("Main", item);
      });
    },
  },
};
