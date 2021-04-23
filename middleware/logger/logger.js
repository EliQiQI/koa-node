const log4js = require('log4js');
const methods = ["trace","debug","info","warn","error","fatal","mark"];
const logInfo = require("config").get("logInfo");
const access = require("./access");
module.exports = () =>{
  const {env,level,dir} = logInfo;
  const contextLogger = {};
  const appenders = {};
  appenders.nodeLog = {
    type:"dateFile",
    filename:`${dir}/task`,
    pattern:`-yyyy-MM-dd.log`,
    alwaysIncludePattern:true
  };
  if(env === 'dev'){
    appenders.out = {
      type:"console"
    }
  }
  let config = {
    appenders,
    categories:{
      default:{
        appenders:Object.keys(appenders),
        level,
      }
    }
  }
  const logger = log4js.getLogger('nodeLog');
  log4js.configure(config);
  return async (ctx,next) => {
    const commonInfo = {};
    const start = Date.now();
    methods.forEach(method=>{
      contextLogger[method] = message => {
        logger[method](access(ctx,message,commonInfo))
      }
    })
    ctx.log = contextLogger;
    await next();
    const end = Date.now();
    const responseTime = end - start;
    logger.info(access(ctx,{
      responseTime:`响应时间为${responseTime/1000}s`
    },commonInfo))
  }
}