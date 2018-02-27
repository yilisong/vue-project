const path = require('path')
const websiteRouter = require('express').Router()
const sendFile = require('../utils/sendFile')
const setupEnv = require('../controller/setupEnv')
// const auth = require('../controller/auth')
const useragent = require('../controller/useragent')

websiteRouter.all('*', setupEnv.run)

const resolve = fileName =>
  path.join(`${setupEnv.outputPath}/website`, `${fileName}.html`)

websiteRouter.get('/browser-tip', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('browser-tip'))
})

websiteRouter.all('*', useragent.ie9banned)

websiteRouter.get('/', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('index'))
})

websiteRouter.get('/about', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('about'))
})

websiteRouter.get('/register-suc', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('register-suc'))
})

websiteRouter.get('/register', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('register'))
})

websiteRouter.get('/login', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('login'))
})

websiteRouter.get('/help', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('help'))
})

websiteRouter.get('/find-pass', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('find-pass'))
})

websiteRouter.get('/hatch-plan', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('hatch-plan'))
})

websiteRouter.get('/guide', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('guide'))
})

websiteRouter.get('/assess', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('assess'))
})

websiteRouter.get('/consult', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('consult'))
})

websiteRouter.get('/guarantor', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('guarantor'))
})

websiteRouter.get('/polling', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('polling'))
})

websiteRouter.get('/respond', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('respond'))
})

websiteRouter.get('/service', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('service'))
})

websiteRouter.get('/verify', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('verify'))
})

websiteRouter.get('/chess', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('solve-scheme-chess'))
})

websiteRouter.get('/finance', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('solve-scheme-finance'))
})

websiteRouter.get('/government', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('solve-scheme-government'))
})

websiteRouter.get('/internet', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('solve-scheme-internet'))
})

websiteRouter.get('/special', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('special'))
})

// production
websiteRouter.get('/cloud-host', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('cloudHost'))
})

websiteRouter.get('/cloud-monitor', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('cloudMonitor'))
})

websiteRouter.get('/cloud-resolving', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('cloudResolving'))
})

websiteRouter.get('/cloud-speed', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('cloudSpeed'))
})

websiteRouter.get('/double-mirror', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('doubleMirror'))
})

websiteRouter.get('/red-guard', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('redGuard'))
})

websiteRouter.get('/server-guard', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('serverGuard'))
})

websiteRouter.get('/risk-detect', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('riskDetect'))
})

websiteRouter.get('/ssl-certificate', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('sslCertificate'))
})

websiteRouter.get('/stargaze', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('stargaze'))
})

websiteRouter.get('/taichiddosApp', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('taichiddosApp'))
})

websiteRouter.get('/taichiddosDns', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('taichiddosDns'))
})

websiteRouter.get('/taichiddosPlus', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('taichiddosPlus'))
})

websiteRouter.get('/taichiddosWeb', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('taichiddosWeb'))
})
// attached to production
websiteRouter.get('/emailResponse/:param', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('messageCenter'))
})

websiteRouter.get('/activity', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('activity'))
})

websiteRouter.get('/personal-game-protect', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('personal-game-protect'))
})

websiteRouter.get('/yearly-custom-made', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('yearly-custom-made'))
})

module.exports = websiteRouter
