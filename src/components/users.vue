<template>
  <div class="user-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="#" width="40"></el-table-column>
      <el-table-column prop="name" label="姓名" width="160"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="160"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
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
  data: "users",
  data() {
    return {
      tableData: [
        {
          date: "1",
          name: "王小虎",
          email: 1210670609,
          phone: "17607142398"
        },
        {
          date: "2",
          name: "王小虎",
          email: 1210670609,
          phone: "17607142398"
        },
        {
          date: "3",
          name: "王小虎",
          email: 1210670609,
          phone: "17607142398"
        },
        {
          date: "4",
          name: "王小虎",
          email: 1210670609,
          phone: "17607142398"
        },
        {
          date: "5",
          name: "王小虎",
          email: 1210670609,
          phone: "17607142398"
        }
      ]
    };
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
