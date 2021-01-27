const { Controller } = require('egg')
const { Prefix, Get, Post } = require('egg-shell-decorators')

@Prefix('/user')
class UserController extends Controller {
  @Get('/list')
  async list () {
    const { ctx, service, logger } = this
    try {
      const users = await service.user.list(ctx.query)
      ctx.returnBody(true, '查询成功', users)
    } catch (error) {
      logger.error(error)
      ctx.returnBody(false, `失败成功：${error}`)
    }
  }

  @Get('/settag')
  async settag () {
    const { ctx, service, logger } = this
    try {
      const users = await service.user.setTag(ctx.query)
      ctx.returnBody(true, '查询成功', users)
    } catch (error) {
      logger.error(error)
      ctx.returnBody(false, `失败成功：${error}`)
    }
  }

  @Get('/del')
  async del () {
    const { ctx, service, logger } = this
    try {
      if (ctx.query.id) {
        const users = await service.user.delete(ctx.query.id)
        ctx.returnBody(true, '查询成功', users)
      } else {
        ctx.returnBody(false, '参数不正确')
      }
    } catch (error) {
      logger.error(error)
      ctx.returnBody(false, `失败成功：${error}`)
    }
  }

  @Post('/logout')
  async logout () {
    const { ctx, logger } = this
    ctx.cookies.set('_scn', '')
    ctx.status = 401
    logger.info('用户登出：', JSON.stringify(ctx.user))
    ctx.returnBody(true, '登出成功')
  }
}

module.exports = UserController
