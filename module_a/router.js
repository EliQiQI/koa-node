const router = require("koa-router")();
router.get("/test",async (ctx,next)=>{
  ctx.body = "module_a test";
  await next();
})
module.exports = router.routes();