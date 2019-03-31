<template>
  <div class="user-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="5">
        <el-input
          placeholder="请输入内容"
          v-model="sendData.query"
          @keyup.native.enter="search"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="success" @click="addFormVisible=true" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="userList" style="width: 100%" border>
      <el-table-column prop="index" label="#" width="40"></el-table-column>
      <el-table-column prop="username" label="姓名" width="160"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="160"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="stateChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index,scope.row)"
            plain
          ></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)" plain></el-button>
          <el-button type="warning" size="mini" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="5"
    ></el-pagination>

    <!-- 弹出对话框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      // 总条数
      total: 0,
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      userList: [],
      // 是否显示对话框 默认fasle
      addFormVisible: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addRules: {
        username: [
          { required: true, message: "用户名不能为空", tigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", tigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码的长度不够（6-16位）",
            tigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
    },
    async search() {
      let res = await this.$axios.get("users", {
        // 已使用拦截器设置token 不用再单独设置
        // headers: {
        //   Authorization: window.sessionStorage.getItem("token")
        // },
        params: this.sendData
      });
      this.total = res.data.data.total;
      this.userList = res.data.data.users;
    },
    stateChange(row) {
      this.$axios.put(`users/${row.id}/state/${row.mg_state}`);
    },
    submitAdd(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid);

        if (valid) {
          // 成功调用接口
          this.$axios.post("users", this.addForm);
          // 新增成功就重新获取用户列表
          if (res.message.status === 201) {
            this.search();
          }
          // 关闭对话框
          this.addFormVisible = false;
        } else {
          this.$message.error("大侠，账号或密码格式有误");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },    
    del(row) {
      this.$confirm("大侠，你真的要删除该用户吗?", "提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "良心发现",
        type: "warning"
      })
        .then(async () => {
          // 发请求
          let res = await this.$axios.delete(`users/${row.id}`);
          console.log(res);
          if(res.data.meta.status === 200){
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  // 接口调用
  created() {
    this.search();
  }
};
</script>

<style lang="scss">
.user-container {
  .nav {
    line-height: 45px;
    font-size: 14px;
    background: #d3dce6;
    padding-left: 10px;
  }
}
</style>
