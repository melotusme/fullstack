'use strict';
const config = require('../config/server.json');
const secret = config.secret;
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');


module.exports.set = function (authRouter, db) {
  // auth
  authRouter.post('/login', async (ctx, next) => {
    let params = ctx.request.body;
    let user = await db.user.findOne({where: {username: params.username}});
    if (user == null) {
      ctx.body = {code: "failed"};
      return;
    }
    let payload = {id: user.id, username: user.username};
    let token = jsonwebtoken.sign(payload, secret);

    if (bcrypt.compareSync(params.password, user.password)) {
      ctx.cookies.set("Authorization", "Bearer " + token);
      ctx.body = {
        code: "success",
        token: token
      };
    } else {
      ctx.body = {
        code: "failed"
      };
    }
  });

  authRouter.post('/register', async (ctx, next) => {
    let params = ctx.request.body;
    let salt = bcrypt.genSaltSync(10);
    params.password = bcrypt.hashSync(params.password, salt);

    let user = await db.user.create(params);
    let payload = {id: user.id, username: user.username};
    let token = jsonwebtoken.sign(payload, secret);
    ctx.body = {
      code: "success",
      token,
    };
  });


};
