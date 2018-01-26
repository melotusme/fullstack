const Koa = require('koa')
const _ = require('lodash')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser');
const historyApiFallback = require('koa-history-api-fallback') // 引入依赖

const config = require('./config/server.json')
const db = require('./models')


const app = new Koa()


//use middlewares
const middlewares = require('./middlewares')
app.use(bodyParser())
app.use(middlewares.logger)
// app.use(historyApiFallback()) // 在这个地方加入。一定要加在静态文件的serve之前，否则会失效。


// articles 
router.post('/articles/', async (ctx, next) => {
  article = await db.article.create(ctx.request.body)
  ctx.body = article
})
router.get('/articles/', async (ctx, next) => {
  articles = await db.article.findAll()
  ctx.body = articles
})
router.get('/articles/:id', async (ctx, next) => {
  article = await db.article.findById(ctx.params.id)
  ctx.body = article
})
router.put('/articles/:id', async (ctx, next) => {
  article = await db.article.update(ctx.request.body, { where: { id: ctx.params.id } })
  ctx.body = article
})
router.del('/articles/:id', async (ctx, next) => {
  article = await db.article.destroy({
    where: { id: ctx.params.id }
  })
  ctx.body = article
})

// auth
router.post('/login', async (ctx, next) => {
  params = ctx.request.body
  user = await db.user.findOne({where: {username: params.username}})
  if (user.password == params.password){
    ctx.body = user
  }
})

router.use('/api', router.routes())
app.use(router.routes())

app.listen(config.port, () => {
  console.log(`I'm listening ${config.port}`)
})