module.exports = (options) => {
  return async (ctx, next) => {
    if (!options.open) {
      await next()
    } else {
      // 解析用户信息
      const { cookies } = ctx
      const userId = cookies.get('uid', { signed: false }) || cookies.get('userId', { signed: false })
      ctx.logger.info('userId:', userId)
      if (userId) {
        ctx.user = {
          id: Number(userId),
          name: '',
          mobile: cookies.get('mobile', { signed: false }) || '',
          tag: 3
        }
        // 保存当前登陆用户信息
        await ctx.service.user.add(ctx.user)
        await next()
      } else {
        ctx.status = 401
        ctx.returnBody(false, '用户校验失败，请先登录')
      }
    }
  }
}
