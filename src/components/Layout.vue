<template>
  <el-row class="tac">
    <el-menu class="el-menu-demo" mode="horizontal" default-active="3">
      <el-menu-item index="1">主页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"><a href="/about">关于我</a></el-menu-item>
    </el-menu>    

    <el-col :span="3">
      <el-menu
        default-active="2">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
        </el-menu-item>
      </el-menu>
    </el-col>

    <el-col :sm="{span: 20}">
      <el-row>
        <router-view/>
      </el-row>        
    </el-col>
  </el-row>
</template>

</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
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


