<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <my-bread sectitle="订单管理" threetitle="订单列表"></my-bread>
    <el-table :data="ordersList" style="width: 100%" border>
      <el-table-column prop="index" label="#" width="40"></el-table-column>
      <el-table-column prop="username" label="订单编号" width="160"></el-table-column>
      <el-table-column prop="email" label="订单价格" width="160"></el-table-column>
      <el-table-column prop="mobile" label="是否付款"></el-table-column>
      <el-table-column prop="mobile" label="是否发货"></el-table-column>
      <el-table-column prop="mobile" label="下单时间"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index,scope.row)"
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
  </div>
</template>

<script>
export default {
  name: "cates",
  data() {
    return {
      // 总条数
      total: 0,
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      ordersList: [{}, {}]
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

    // 页码改变
    sizeChange(size) {
      console.log(size);

      this.sendData.pagesize = size;
      this.search();
    },
    // 也容量改变
    currentChange(current) {
      console.log(current);

      this.sendData.pagenum = current;
      this.search();
    }
  },
  // 接口调用
  created() {
    this.search();
  }
};
</script>

<style>
</style>
