<template>
    <el-col class="content" :sm="{span: 16, push: 3}" >
      <el-row>
        <el-col :span="8" v-for="article in articles" :key="article.id">
          <el-card :body-style="{ padding: '4px' }">
            <!-- <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image"> -->
            <div style="padding: 14px;">
              <span class="title">{{article.title}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ article.createdAt | format}}</time>
                <el-button type="text" class="button" @click="detail(article.id)" >阅读</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>    
    </el-col>
</template>

<script>
const moment = require("moment");

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
        }
      );
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    detail(id) {
      this.$router.push(`/articles/${id}`);
    }
  },
  filters: {
    format: function(date) {
      return moment(date).format("YYYY/MM/DD HH:mm:ss");
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

.title {
  font-size: 14px;
}

.clearfix:after {
  clear: both;
}

.content {
  margin-top: 50px;
}
</style>


