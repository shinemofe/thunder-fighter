'use strict'

const { Service } = require('egg')

class UserService extends Service {
  async add (params = {}) {
    const { ctx, app } = this
    const { model } = ctx
    const { id } = params

    const user = await model.User.findByPk(id)
    if (!user) {
      const headers = {
        Cookie: ctx.request.headers.cookie,
        'Content-Type': 'application/json'
      }
      ctx.logger.info(`查询用户信息 webHost ${app.config.webHost}`)
      const res = await ctx.helper.request(`${app.config.webHost}/access/Contacts/getUserInfo`, 'post', {
        orgId: app.config.orgId,
        queryUid: String(params.id)
      }, headers)
      if (res.retcode === 0) {
        ctx.logger.info('查询结果 %j', res.data.users)
        const { name } = res.data.users[0]
        params.name = name
        ctx.user.name = name
      } else {
        ctx.logger.info('查询失败 %j', res)
      }
      // let user = await ctx.helper.request(`${app.config.adminHost}/entadmin/loginAdmin.json`, 'get', {
      //   orgId,
      //   orgName: name
      // }, headers)
      // user = user.data
      // ctx.user.mobile = user.mobile
      await model.User.create(params)
    } else {
      ctx.user = user
    }
  }

  async list ({ keyword }) {
    const { ctx, app } = this
    const { Sequelize } = app
    const { model } = ctx

    if (keyword) {
      return await model.User.findAll({
        where: {
          [Sequelize.Op.or]: [
            {
              mobile: {
                [Sequelize.Op.like]: `%${keyword}%`
              }
            },
            {
              name: {
                [Sequelize.Op.like]: `%${keyword}%`
              }
            }
          ]
        }
      })
    }
    return await model.User.findAll()
  }

  // 校验当前用户身份权限
  async checkPermission (tag = []) {
    const { ctx } = this
    const { user, model } = ctx
    if (tag) {
      const currentUser = await model.User.findByPk(user.id)
      return tag.includes(currentUser.tag)
    }
    return false
  }

  async update (uid, params) {
    const { ctx } = this
    const { model } = ctx
    let one = await model.User.findByPk(uid)
    if (one) {
      one = one.toJSON()
      if (!one.name) {
        ctx.logger.info('更新用户信息 %j', params)
        await model.User.update(params, {
          where: {
            id: uid
          }
        })
      }
    }
  }

  async setTag (params) {
    // 校验权限
    const { user, logger, model, app } = this.ctx
    logger.info('修改用户tag %j', params)
    if (app.config.doorUid.includes(String(user.id))) {
      return model.User.update({ tag: params.tag }, {
        where: {
          id: Number(params.id)
        }
      })
    } else {
      throw new Error('无权限修改')
    }
  }

  async delete (id) {
    const { user, logger, model, app } = this.ctx
    logger.info('删除用户 %j', id)
    if (app.config.doorUid.includes(String(user.id))) {
      const one = await model.User.findByPk(id)
      if (one) {
        return one.destroy()
      }
      logger.error('用户不存在 %j', id)
    } else {
      throw new Error('无权限修改')
    }
  }
}

module.exports = UserService
