<template>
  <div>
    <el-container >
      <el-aside width="200px">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
  <script>
import Menu from "../components/Menu.vue";
import Header from "../components/Header.vue";
export default {
  name: "Main",

  data() {
    return {};
  },
  components: {
    Menu,
    Header,
  },
};
</script>
  
<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>