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
   <!-- 侧边栏 -->
      <el-aside class="aside" width="200px">
        <!-- 使用饿了吗UI 导航栏菜单   -->
        <el-menu default-active="users" class="el-menu-vertical-demo" router>
          <el-submenu :index="item.id+''" v-for="item in menuList">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="it.path" v-for="it in item.children">
              <span class="el-icon-menu">{{it.authName}}</span>
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
  data() {
    return {
      // 菜单列表
      menuList: []
    };
  },
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
  },
  // 钩子函数
  async created() {
    let res = await this.$axios.get("menus");
    console.log(res);
    
    this.menuList = res.data.data;
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
