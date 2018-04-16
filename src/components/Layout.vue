<template>
  <el-row class="content">
    <el-menu class="el-menu" mode="horizontal" :router="true">
      <el-menu-item index="index" :route="{path: '/index'}">主页</el-menu-item>
      <el-menu-item index="articles" :route="{path: '/articles'}">全部文章</el-menu-item>
      <el-menu-item index="new" :route="{path: '/articles/new'}">写文章</el-menu-item>
      <el-menu-item index="about" :route="{path: '/about'}">关于我</el-menu-item>
      <el-menu-item index="logout" v-if="isLogin" @click="logout" class="logout">登出</el-menu-item>
      <el-menu-item index="login" v-else :route="{path: '/login'}" class="login">登录</el-menu-item>
    </el-menu>    

    <el-col class="body">
      <router-view/>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.removeItem("koa-blog");
      this.$notify({
        title: "成功",
        message: "注销",
        type: "success"
      });
    }
  },
  computed: {
    isLogin: function() {
      let token = localStorage.getItem("koa-blog");
      if (token != "null" && token != null) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-header, .el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  height: 100%;
}
.el-menu {
  // 设置高度会导致 选中的menu下划线下沉
  // height: 5%;
}

.content,.body {
  height: 90%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>


