const websiteRouter = require('./website')
const consoleRouter = require('./console')
const paymentRouter = require('./payment')
const perceptionRouter = require('./perception')
const staticRouter = require('./static')

module.exports = app => {
  app.use('/', websiteRouter)
  app.use('/console', consoleRouter)
  app.use('/payment', paymentRouter)
  app.use('/perception', perceptionRouter)
  app.use('/static', staticRouter)
}
