<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img src="../assets/logo.png" alt>
        </el-col>
        <el-col :span="19">
          <h2>又黄又焖又辣鸡</h2>
        </el-col>
        <el-col :span="1">
          <el-button type="success" @click="logout">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="botton-container">
      <el-aside class="aside" width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
              <span class="el-icon-menu"></span>用户列表
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  methods: {
    logout() {
      // 退出清除缓存
      window.sessionStorage.removeItem("token");
      // 跳转到登录页
      this.$router.push("/login");
    }
  },
  // 不需要获取组件中的数据 只是判断是否有缓存数据 尽可能早即可 使用最早执行的钩子
  beforeCreate() {
    if (!window.sessionStorage.getItem("token")) {
      this.$message.error("请先登录");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss">
.container {
  height: 100%;
  .header {
    background-color: #b3c0d1;
    line-height: 60px;
    h2 {
      text-align: center;
    }
  }
  .botton-container {
    .main {
      padding-top: 0;
      background-color: #e9eef3;
    }
  }
}
</style>
