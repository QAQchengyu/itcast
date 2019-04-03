<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <my-bread sectitle="权限管理" threetitle="权限列表"></my-bread>
    <el-row></el-row>
    <el-table :data="rightList" style="width: 100%" border>
      <el-table-column type="index" width="40"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="160"></el-table-column>
      <el-table-column prop="path" label="路径" width="160"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-else-if="scope.row.level==='1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "rights",
  data() {
    return {
      rightList: []
    };
  },
  async created() {
    let res = await this.$axios.get("rights/list");
    console.log(res);
    
    this.rightList = res.data.data;
  }
};
</script>

<style>
</style>
