<template>
    <div class="users">
      <el-button @click="handleCreate">新增</el-button>
      <el-dialog
        class="add-dialog"
        title="提示"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <!-- 用户表单 -->
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :inline="true"
          :rules="rules"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-DD"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="location">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.location"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" this.dialogVisible="false;">
          <el-button>取 消</el-button>
          <!-- 点击确定的时候要检验表单  -->
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="sex" label="性别" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.sex == 1 ? "男" : "女"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { getUser, createUser, updateUser, delUser } from "@/api";
  export default {
    name: "User",
    data() {
      return {
        dialogVisible: false,
        form: {
          name: "",
          age: "",
          sex: "",
          birth: "",
          location: "",
        },
        rules: {
          name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
          sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
          birth: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
          location: [{ required: true, message: "请输入地址", trigger: "blur" }],
        },
        tableData: [],
        modalType: 0, //0为新增
      };
    },
    methods: {
      // 提交用户表单时对表单进行校验,使用elementUI中的validate方法
      submit() {
        this.$refs.form.validate((valid) => {
          // 校验成功,关闭对话框,同时清除里面的数据
          if (valid) {
            if (this.modalType === 0) {
              createUser(this.form).then(() => {
                this.getList();
              });
            } else {
              updateUser(this.form).then(() => {
                this.getList();
                console.log(this.form);
              });
            }
            this.dialogVisible = false;
            this.$refs.form.resetFields();
          } else {
          }
        });
      },
      getList() {
        getUser().then(({ data }) => {
          this.tableData = data.list;
        });
      },
      handleCreate() {
        this.dialogVisible = true;
        this.modalType = 0;
      },
      handleEdit(row) {
        this.modalType = 1;
        this.dialogVisible = true;
        // this.form=row //不能直接赋值,要深拷贝，否则会出错
        this.form = JSON.parse(JSON.stringify(row));
      },
      handleDelete(row) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            delUser({ id: row.id }).then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
                
              });
              // 重新获取列表的接口
              this.getList();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
    },
    mounted() {
      this.getList();
    },
  };
  </script>
  
  <style lang="less" scoped>
  </style>