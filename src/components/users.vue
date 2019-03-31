<template>
  <div class="user-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入内容" v-model="sendData.query  " class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search" ></el-button>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="userList" style="width: 100%" border>
      <el-table-column prop="index" label="#" width="40"></el-table-column>
      <el-table-column prop="username" label="姓名" width="160"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="160"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
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
          <el-button type="danger" size="mini" icon="el-icon-delete" plain></el-button>
          <el-button type="warning" size="mini" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="5"
      ></el-pagination>
    </div>
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
      userList: []
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
    },
    async search() {
      let res = await this.$axios.get("users", {
        headers: {
          Authorization: window.sessionStorage.getItem("token")
        },
        params: this.sendData
      });
      this.total = res.data.data.total;
      this.userList = res.data.data.users;
    }
  },
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
