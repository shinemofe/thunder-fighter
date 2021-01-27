'use strict'

module.exports = agent => {
  // worker 启动
  agent.messenger.on('egg-ready', () => {
    console.log('worker egg-ready')
    agent.messenger.sendToApp('worker-start', 'I am agent')
  })
}
