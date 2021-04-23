module.exports = async (ctx,next)=>{
  await next().catch(err=>{
    // 在日志系统中写入这个错误
    ctx.log.error(err.message)
    //保证能正常返回给前端,注意:这里可能需要判断401或403,根据业务类型,下面的内容也不同
    ctx.status = 200;
    ctx.body = {
      code:-1,
      success:false,
      data:null,
      msg:"中间层异常",
    }
  })
}