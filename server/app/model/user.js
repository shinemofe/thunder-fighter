'use strict'

module.exports = app => {
  const { BIGINT, STRING, INTEGER } = app.Sequelize

  const User = app.model.define('user', {
    id: {
      type: BIGINT(20),
      primaryKey: true
    },
    mobile: {
      type: STRING(11),
      comment: '手机号码',
      unique: true
    },
    name: {
      type: STRING(64),
      comment: '用户姓名'
    },
    tag: {
      type: INTEGER,
      comment: '用户标识：1 管理员、2 团队管理员、3 普通成员',
      default: 3
    }
  })

  return User
}
