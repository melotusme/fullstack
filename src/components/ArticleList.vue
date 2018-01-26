<template>
    <el-col :sm="{span: 16, push: 3}">
    <el-row>
      <el-col :span="8" v-for="article in articles" :key="article.id">
        <el-card :body-style="{ padding: '4px' }">
          <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image">
          <div style="padding: 14px;">
            <span>{{article.title}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ article.createdAt }}</time>
              <el-button type="text" class="button" @click="detail(article.id)" >阅读</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>    
    
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>    
    </el-col>
</template>

<script>
export default {
  created() {
    this.getAll();
  },
  data() {
    return {
      articles: []
    };
  },
  methods: {
    getAll() {
      this.$http.get("/api/articles/").then(
        response => {
          if (response.status === 200) {
            this.$message({
              type: "success",
              message: "成功获取所有文章"
            });
            this.articles = response.data;
          } else {
            this.$message.error("获取失败!");
          }
        },
        err => {
          this.$message.error("获取失败");
          console.log(err);
        }
      );
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    detail(id) {
      this.$router.push(`/articles/${id}`);
    }
  }
};
</script>

<style lang="stylus" scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before, .clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>


