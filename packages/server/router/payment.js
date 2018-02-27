const path = require('path')
const paymentRouter = require('express').Router()
const sendFile = require('../utils/sendFile')
const setupEnv = require('../controller/setupEnv')
// const auth = require('../controller/auth')

paymentRouter.all('*', setupEnv.run)

const resolve = fileName =>
  path.join(`${setupEnv.outputPath}/payment`, `${fileName}.html`)

paymentRouter.get('/', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('purchase'))
})

module.exports = paymentRouter
