'use strict'

require('babel-register')({
  plugins: [
    'transform-decorators-legacy'
  ]
})

module.exports = app => {
  app.messenger.on('worker-start', params => {})

  app.validator.addRule('timestamp', (rule, value) => {
    if (!/^\d+$/.test(value) || String(value).length !== 13) {
      return '时间戳格式不对'
    }
  })
}
