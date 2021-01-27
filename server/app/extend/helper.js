'use strict'

const R = require('ramda')
// const Excel = require('exceljs')
const urllib = require('urllib')

module.exports = {
  clearObject (params) {
    if (params) {
      const newParams = JSON.parse(JSON.stringify(params))
      R.mapObjIndexed((value, key, obj) => {
        if (['', null].includes(value)) {
          delete obj[`${key}`]
        }
      })(newParams)
      return newParams
    }
  },

  exportExcel () {

  },

  request (url, method, data, headers) {
    return new Promise((resolve, reject) => {
      urllib.request(url, {
        method,
        data,
        dataType: true,
        headers
      }, (err, body, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(body.toString()))
        }
      })
    })
  }
}
