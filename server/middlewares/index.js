const moment = require('moment')

// logger
async function logger(ctx, next) {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${moment().format()} ${ctx.method} ${ctx.url} ${ms} ms`)
}

module.exports =  {
  logger
}


