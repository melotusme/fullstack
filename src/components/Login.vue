<template>
  <el-row class="content">
    <el-col :sm="{span: 6, offset: 9}">
      <span v-if="isLoginComponent" class="title">请登录</span>
      <span v-else class="title">请注册</span>
      <el-row>
        <el-input v-model="user.username" placeholder="username" type="text"></el-input>
        <el-input v-model="user.password" placeholder="password" type="password"></el-input>
        <el-button v-if="isLoginComponent" type="primary" v-on:click="login">登录</el-button>
        <el-button v-else type="primary" v-on:click="register">注册</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>


<script>
  export default {
    data() {
      return {
        user: {
          username: "",
          password: ""
        },
        isLoginComponent: true
      };
    },
    methods: {
      login() {
        this.$http.post("/api/auth/login", this.user).then(
          resp => {
            if (resp.data.code == "success") {
              localStorage.setItem("koa-blog", resp.data.token);
              this.$router.push("/index");
              this.$message({
                type: "success",
                message: "成功登录"
              });
              return;
            }
            this.$message.error("登陆失败，请重新尝试");
          },
          err => {
            this.$message.error("登陆失败，请重新尝试");
          }
        );
      },
      register() {
        this.$http.post("/api/auth/register", this.user).then(
          resp => {
            if (resp.data.code == "success") {
              localStorage.setItem("koa-blog", resp.data.token);
              this.$message({
                type: "success",
                message: "成功注册，请重新登陆"
              });
              // 成功注册后，需要跳转回登陆，并将当前组建状态修改为登陆组件
              this.isLoginComponent = true;
              this.$router.push('/login');
            } else {
              this.$message.error("注册失败");
            }
          },
          err => {
            this.$message.error("注册失败");
          }
        );
      }
    },
    mounted() {
      if (this.$route.path == "/register") {
        this.isLoginComponent = false;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .content {
    margin-top: 12%;
  }

  .title {
    font-size: 28px;
  }

  .el-input {
    margin: 12px 0;
  }

  .el-button {
    width: 100%;
  }
</style>
