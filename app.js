const Koa = require("koa");
const config = require("config");
const router = require("./router");
const middleware = require("./middleware");
const app = new Koa();
const PORT = config.get("port");
middleware(app);
router(app);
app.listen(PORT,()=>{
  console.log(`App is running at http://127.0.0.1:${PORT}`);
})