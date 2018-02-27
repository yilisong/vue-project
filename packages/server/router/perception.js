const path = require('path')
const perceptionRouter = require('express').Router()
const sendFile = require('../utils/sendFile')
const setupEnv = require('../controller/setupEnv')
// const auth = require('../controller/auth')

perceptionRouter.all('*', setupEnv.run)

const resolve = fileName =>
  path.join(`${setupEnv.outputPath}/perception`, `${fileName}.html`)

perceptionRouter.get('/', (req, res) => {
  res.redirect('/perception/chongqing')
})

perceptionRouter.get('/chongqing', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('chongqing-perception'))
})

module.exports = perceptionRouter
