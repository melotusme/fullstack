var article = require('./article_controller');
var auth = require('./auth_controller');

module.exports.set = function (router, authRouter, db) {
  article.set(router, db);
  auth.set(authRouter, db);
};
