const moment = require('moment')

// logger
async function logger(ctx, next) {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${moment().format()} ${ctx.method} ${ctx.url} ${ms} ms`)
}

function logIP(mdb) {
  return async function (ctx, next) {
    // ip = ctx.request.ip
    // const ips = mdb.get('ips')
    // ips.find({ip})
    // console.log(ip)
    await next()
  }
}

module.exports = {
  logger,
  logIP
}


