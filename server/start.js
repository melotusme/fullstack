const app = require('./app').app;
const router = require('./app').router;
const authRouter = require('./app').authRouter;
const config = require('./config/server.json');

app.listen(config.port, () => {
  let routes = authRouter.stack.concat(router.stack).map(i => `${i.methods[0]} ${i.path}`);
  console.log(routes);
  console.log(`I'm listening ${config.port}`);
});
