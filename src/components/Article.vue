<template>
  <el-row class="content" >
      <el-col v-if="isLogin" :sm="{span: 16,offset: 4}">
        <el-input v-model="article.title"/>
        <markdown-editor
          v-model="article.body" :configs="configs"
          ref="markdownEditor"
          preview-class="markdown-body"
          :highlight="true"
          />
        <span class="pull-right">
          <el-button type="primary" :plain="true" @click="put">保存</el-button>
        </span>
    </el-col>
    <el-col v-else :sm="{span: 16,offset: 4}">
        <div class="title" v-html="compiledTitle"></div>
        <div v-html="compiledBody"></div>
    </el-col>
  </el-row>
</template>

<script>
import { markdownEditor } from "vue-simplemde";
import marked from "marked";
import "simplemde-theme-base/dist/simplemde-theme-base.min.css";
import "highlight.js/styles/solarized-light.css";
import "github-markdown-css";
import hljs from "highlight.js";
window.hljs = hljs;

export default {
  components: {
    markdownEditor
  },
  created() {
    if (this.$route.params.id != "new") {
      this.get();
    }
  },
  data() {
    return {
      article: {},
      configs: {}
    };
  },
  computed: {
    compiledTitle: function() {
      return this.article.title;
      },
    compiledBody: function() {
      return marked(this.article.body);
    },
    isLogin: function() {
      let token = localStorage.getItem("koa-blog");
      if (token != "null" && token != null) {
        return true;
      }
      return false;
    }
  },
  methods: {
    get() {
      this.$http.get(`/api/articles/${this.$route.params.id}`).then(
        response => {
          if (response.status === 200) {
            this.article = response.data;
          } else {
            this.$message.error("获取失败!");
          }
        },
        err => {
          this.$message.error("获取失败");
        }
      );
    },
    put() {
      this.$http
        .put(`/api/articles/${this.$route.params.id}`, this.article)
        .then(
          response => {
            if (response.status === 200) {
              this.$message.success("成功更新");
            } else {
              this.$message.error("更新失败!");
            }
            if (this.$route.params.id == "new") {
              this.$router.push(`/articles/${response.data.id}`);
            }
          },
          err => {
            this.$message.error("更新失败");
          }
        );
    }
  },
  mounted() {
    if (this.$route.params.id != "new") {
      this.get();
    }
  },
  updated() {}
};
</script>

<style scoped>
.content {
  color: #333;
  text-align: left;
  padding-top: 40px;
}
.title {
  text-align: center;
}
</style>
