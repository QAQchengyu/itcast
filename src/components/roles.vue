<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <my-bread sectitle="权限管理" threetitle="角色列表"></my-bread>
    <el-row>
      <el-col :span="5">
        <el-button type="success" @click="addFormVisible=true" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="rolesList" style="width: 100%" border>
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="roleDesc" label="角色名称" width="160"></el-table-column>
      <el-table-column prop="roleName" label="角色描述" width="160"></el-table-column>

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
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: []
    };
  },
  methods: {
    async search() {
      let res = await this.$axios.get("roles");
      this.rolesList = res.data.data;
      console.log(res);
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
