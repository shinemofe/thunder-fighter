'use strict'

exports.sequelize = {
  host: '10.0.10.41',
  username: 'root',
  password: 'shinemo123',
  logging: false
}

exports.adminHost = 'http://admin.jituancaiyun.net'
exports.webHost = 'http://web.jituancaiyun.net'
exports.orgId = '83817'

exports.redis = {
  client: {
    sentinels: [
      {
        host: '10.0.10.86',
        port: 26379
      },
      {
        host: '10.0.10.86',
        port: 26380
      },
      {
        host: '10.0.10.86',
        port: 26381
      }
    ],
    name: 'mymaster',
    password: 'shinemo123',
    db: 0
  },
  agent: true
}
