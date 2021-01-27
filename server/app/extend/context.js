'use strict'

const helper = require('./helper')

module.exports = {
  returnBody (success, msg, data) {
    this.body = helper.clearObject({
      success,
      msg: success ? '' : msg,
      data: helper.clearObject(data)
    })
  }
}
