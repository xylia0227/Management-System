<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="username">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="submit" type="primary" class="login-in">登录</el-button>
  </div>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
  name: "AppLogin",

  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    };
  },

  mounted() {},

  methods: {
    submit() {
      // // 返回token信息
      // const token = Mock.Random.guid();
      // //    将token信息存入cookie
      // Cookie.set("token",token);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          getMenu(this.ruleForm).then((data) => {
            if (data.data.code === 20000) {
              Cookie.set("token", data.data.data.token);
              this.$router.push("/home");
              // 获取菜单数据传入store中
              this.$store.commit("setMenu", data.data.data.menu);
              this.$store.commit("addMenu", this.$router);
            }
          });
        }
      });

      // 跳转到首页
      // this.$router.push("/home");
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 420px;
  height: 300px;
  border: 1px solid rgb(215, 215, 215);
  border-radius: 10px;
  margin: 100px auto;
  .demo-ruleForm {
    margin-right: 40px;
    margin-top: 40px;
  }
  .login-in {
    margin-left: 150px;
    margin-top: 70px;
  }
}
</style>