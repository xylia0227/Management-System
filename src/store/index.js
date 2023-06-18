import Vue from "vue";
import vuex from "vuex";
import tab from "./tab";

Vue.use(vuex);

export default new vuex.Store({
  modules: { tab },
});
