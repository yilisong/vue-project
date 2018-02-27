const { resolve } = require('path')
const staticRouter = require('express').Router()

staticRouter.get('/js/fingerprint2.js', (req, res) => {
  res.sendFile(resolve(__dirname, '../../../external/fingerprint2.js'))
})

staticRouter.get('/pdf/scan_agreement.pdf', (req, res) => {
  res.sendFile(resolve(__dirname, '../../../external/scan_agreement.pdf'))
})

staticRouter.get('/pdf/migrateTipText.pdf', (req, res) => {
  res.sendFile(resolve(__dirname, '../../../external/migrateTipText.pdf'))
})

module.exports = staticRouter
