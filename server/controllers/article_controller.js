'use strict';
module.exports.set = function (router, db) {
  router.get('/articles/', async (ctx, next) => {
    let articles = await db.article.findAll();
    ctx.body = articles;
  });
  router.post('/articles/', async (ctx, next) => {
    let article = await db.article.create(ctx.request.body);
    ctx.body = article;
    ctx.status = 201;
  });
  router.get('/articles/:id', async (ctx, next) => {
    if (ctx.params.id != 'new') {
      let article = await db.article.findById(ctx.params.id);
      if (article != null) {
        ctx.body = article;
      } else {
        ctx.status = 404;
      }
    } else {
      ctx.body = "";
    }
  });
  router.put('/articles/:id', async (ctx, next) => {
    let article = {};
    if (ctx.params.id != 'new') {
      article = await db.article.update(ctx.request.body, {where: {id: ctx.params.id}});
    } else {
      let params = ctx.request.body;
      delete params.id;
      article = await db.article.create(params);
    }
    ctx.body = article;
  });
  router.del('/articles/:id', async (ctx, next) => {
    let article = await db.article.destroy({
      where: {id: ctx.params.id}
    });
    ctx.body = article;
    ctx.status = 204;
  });
};
