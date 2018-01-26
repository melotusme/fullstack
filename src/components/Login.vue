<template>
  <el-row class="content">
    <el-col :sm="{span: 6, offset: 9}">
      <span class="title">请登录</span>
      <el-row>
        <el-input v-model="username" placeholder="username" type="text"></el-input>
        <el-input v-model="password" placeholder="password" type="password"></el-input>
        <el-button type="primary" @click="login">登录</el-button>
      </el-row>  
    </el-col>
  </el-row>  
</template>


<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      console.error("TODO login");
    }
  }
};
</script>

<style lang="stylus" scoped>
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