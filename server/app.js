'use strict';
const Koa = require('koa');
const _ = require('lodash');
const router = require('koa-router')();
const authRouter = require('koa-router')();

const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const historyApiFallback = require('koa2-connect-history-api-fallback');

const config = require('./config/server.json');
const secret = config.secret;

const db = require('./models');
const mdb = require('./mdb');

const path = require('path');
const koaStatic = require('koa-static');

const app = new Koa();

//use middlewares
const middlewares = require('./middlewares');
app.use(historyApiFallback({whiteList: ['/api']}));
app.use(koaStatic(path.resolve('dist')));
app.use(bodyParser());
app.use(middlewares.logger);
app.use(middlewares.logIP(mdb));


// controllers and routes
const controllers = require("./controllers");
controllers.set(router, authRouter, db);
app.use(jwt({secret}).unless({path: [/static/, /^\/public/, /fav\w*/, /login/, /^\/api\/auth/], method: ["GET"]}));

// routes
router.use('/api', router.routes());
app.use(router.routes());

// auth routes
authRouter.use('/api/auth', authRouter.routes());
app.use(authRouter.routes());

module.exports.app = app;
module.exports.authRouter = authRouter;
module.exports.router = router;
