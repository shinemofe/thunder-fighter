const { EggShell } = require('egg-shell-decorators')

module.exports = (app) => {
  EggShell(app, {
    prefix: '/thunder'
  })
  // app.router.get('/gtd/checkstatus', app.controller.home.checkstatus)
}
