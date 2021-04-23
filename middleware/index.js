const logger = require("./logger");
const handleError = require("./handleError");
module.exports = app =>{
  app.use(handleError);
  app.use(logger());
  app.use(async (ctx,next)=>{
    await next();
  })
}