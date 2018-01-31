<template>
  <el-row class="content">
    <el-menu class="el-menu-demo" mode="horizontal" :router="true">
      <el-menu-item index="index" :route="{path: '/index'}">主页</el-menu-item>
      <el-menu-item index="articles" :route="{path: '/articles'}">全部文章</el-menu-item>
      <el-menu-item index="about" :route="{path: '/about'}">关于我</el-menu-item>
      <el-menu-item index="logout" @click="logout">登出</el-menu-item>
    </el-menu>    

    <el-col>
      <el-row v-bind:style="{borderColor: 'red'}">
        <router-view/>
      </el-row>        
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
      localStorage.removeItem("koaBlog");
      this.$notify({
        title: "成功",
        message: "注销",
        type: "success"
      });
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

</style>


