<template>
  <div class="login">
    <div class="box">
      <h2>登录页面</h2>
      <el-form
        label-position="top"
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('loginForm')" class="button">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {required: true,message: "用户名不能为空",trigger: "blur"},
          {min: 4,max: 16,message: "长度在4-16位",trigger: "blur"}
        ],
        password: [
          {required: true,message: "密码不能为空",trigger: "blur"},
          {min: 6,max: 16,message: "长度在6-16位",trigger: "blur"}
        ]
      }
    };
  },
  methods: {
    submit(formName){
        this.$refs[formName].validate(async valid=>{
            if(valid){
              // 成功 提交数据
              let res = await this.$axios.post("login",this.loginForm);
            if(res.data.meta.status === 400){
              this.$message.error(res.data.meta.msg);
            }else if(res.data.meta.status === 200){
              this.$message.success(res.data.meta.msg);  
              // 成功 缓存数据
              window.sessionStorage.setItem("token",res.data.data.token);
              // 跳转到主页
              this.$router.push("/")
            }
            }else{
                this.$message.error("数据格式错误，请根据提示修改");
                return false
            }
        })
    }
  }
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
