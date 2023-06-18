<template>
  <div class="header">
    <div class="left">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
      ></el-button>
      <!-- 面包屑 -->
      <div class="location">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="item in tags"
            :key="item.path"
            :to="{ path: item.path }"
            >{{ item.label }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
    </div>
    <div class="right">
      <el-dropdown @command="logOut">
        <span class="el-dropdown-link">
          <img src="../assets/images/admin.jpg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
  name: "Header",

  data() {
    return {};
  },
  methods: {
    handleMenu() {
      this.$store.commit("changeMenu");
    },
    // 退出登录清空缓存
    logOut(command) {
      if (command === "cancel") {
        Cookie.remove("token");
        Cookie.remove("menu");
        this.$router.push("/login")
      }
    },
  },
  computed: {
    ...mapState({ tags: (state) => state.tab.tabsList }),
  },
};
</script>

<style lang="less">
.header {
  height: 60px;
  width: 100%;
  background-color: rgb(91, 91, 91);
  .left {
    float: left;
    button {
      margin: 17px;
    }
    .location {
      display: inline-block;
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          color: #ffffff;
        }
        .is-link {
          color: rgb(255, 208, 75);
          font-weight: bold;
        }
      }
    }
  }
  .right {
    float: right;
    img {
      margin: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>