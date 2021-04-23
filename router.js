const KoaRouter = require("koa-router");
const router = new KoaRouter();
module.exports = app => {
  router.get("/test",async (ctx,next)=>{
    ctx.body = 'test success';
  })
  router.use("/module_a",require("./module_a/router"))
  router.use("/module_b",require("./module_b/router"))
  app.use(router.routes()).use(router.allowedMethods());
}