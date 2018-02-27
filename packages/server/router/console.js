const path = require('path')
const consoleRouter = require('express').Router()
const sendFile = require('../utils/sendFile')
const setupEnv = require('../controller/setupEnv')
// const auth = require('../controller/auth')

consoleRouter.all('*', setupEnv.run)

const resolve = fileName =>
  path.join(`${setupEnv.outputPath}/console`, `${fileName}.html`)

consoleRouter.get('/', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('home'))
})

consoleRouter.get('/:name', (req, res) => {
  const fileName = req.params.name

  sendFile(res, setupEnv.fs, resolve(fileName))
})

module.exports = consoleRouter
