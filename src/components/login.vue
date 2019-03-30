<template>
  <div class="login">
    <div class="box">
      <h2>登录页面</h2>
      <el-form label-position="top" label-width="80px">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang="scss">
.login {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 550px;
    height: 420px;
    background-color: #fff;
    padding: 35px;
    border-radius: 15px;
    .button {
      width: 100%;
    }
  }
}
</style>
