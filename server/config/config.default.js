const path = require('path')

exports.keys = '123456'
exports.doorUid = ['106144', '10101001191214848']

exports.logger = {
  outputJSON: true,
  level: 'INFO',
  dir: path.join(__dirname, '../logs')
}

// add your middleware config here
exports.middleware = [
  'auth',
  'graphql'
  // 'responseHandle'
]

exports.cluster = {
  listen: {
    port: 9430
  }
}

// add your user config here
exports.auth = {
  open: false
}
exports.security = {
  csrf: {
    enable: false
  }
}

exports.cors = {
  origin: '*',
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  credentials: true
}

exports.validate = {
  convert: true,
  widelyUndefined: true
}

exports.sequelize = {
  dialect: 'mysql',
  database: 'gtdnode',
  port: 3306,
  define: {
    underscored: true,
    timestamps: false,
    freezeTableName: true
  },
  timezone: '+08:00',
  logging: false,
  dialectOptions: {
    dateStrings: true,
    typeCast (field, next) {
      if (field.type === 'DATETIME') {
        return field.string()
      }
      return next()
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
