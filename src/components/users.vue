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
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-check"
            @click="showRole(scope.row)"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChange"
      @current-change="currentChange"
      :total="total"
    ></el-pagination>

    <!-- 添加用户信息 弹出对话框 -->
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

    <!-- 修改用户信息 -->
    <el-dialog title="修改用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" :rules="addRules" ref="editForm">
        <el-form-item label="用户名" label-width="100px" disabled prop="username">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 角色设置 -->
    <el-dialog title="用户角色" :visible.sync="roleFormVisible">
      <el-form ref="editForm">
        <el-form-item label="当前角色" label-width="100px">{{editUser.username}}</el-form-item>
        <el-form-item label="请选择角色" label-width="100px">
          <el-select v-model="editUser.role_name" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRole('editForm')">确 定</el-button>
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
      // 是否显示添加对话框 默认fasle
      addFormVisible: false,
      // 是否显示修改对话框
      editFormVisible: false,
      // 是否显示角色对话框
      roleFormVisible: false,
      // 当前正在编辑的用户信息
      editUser: {},
      // 用户角色列表
      roleList: [],
      // 添加表单
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 修改表单
      editForm: {
        username: "",
        email: "",
        mobile: ""
      },

      // 验证规则
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
    async handleEdit(index, row) {
      let res = await this.$axios.get(`users/${row.id}`);
      this.editForm = res.data.data;
      if (res.data.meta.status === 200) {
        this.editFormVisible = true;
      }
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
      this.$refs[formName].validate(async valid => {
        console.log(valid);

        if (valid) {
          // 成功调用接口
          let res = await this.$axios.post("users", this.addForm);
          console.log(res);
          // 新增成功就重新获取用户列表
          if (res.data.meta.status === 201) {
            this.search();
            // 关闭对话框
            this.addFormVisible = false;
          }
        } else {
          this.$message.error("大侠，账号或密码格式有误");
          return false;
        }
      });
    },
    // 保存修改
    async submitEdit(formName) {
      let res = await this.$axios.put(`users/${this.editForm.id}`, {
        email: this.editForm.email,
        mobile: this.editForm.mobile
      });
      if (res.data.meta.status == 200) {
        this.search();
        this.editFormVisible = false;
      }
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
          if (res.data.meta.status === 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //
    async showRole(row) {
      // 编辑角色对话框显示
      this.roleFormVisible = true;
      // 保存编辑的用户信息
      this.editUser = row;
      // 获取所有角色的列表
      let res = await this.$axios.get("roles");
      console.log(res);

      this.roleList = res.data.data;
    },
    // 分配角色
    async submitRole() {
      let res = await this.$axios.put(`users/${this.editUser.id}/role`, {
        rid: this.editUser.role_name
      });
      if (res.data.meta.status === 200) {
        this.roleFormVisible = false;
        this.search();
      }
    },
    // 页码改变
    sizeChange(size){
      console.log(size);
      
      this.sendData.pagesize = size;
      this.search();
    },
    // 也容量改变
    currentChange(current){
      console.log(current);

      this.sendData.pagenum = current;
      this.search();
    },
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
