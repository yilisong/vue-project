const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const dllConfig = require('../config/dll.conf')

const addDevMiddlewares = (app, webpackConfig) => {
  const compiler = webpack(webpackConfig)

  const devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true
    }
  })

  app.get(/\.dll\.js$/, (req, res) => {
    const filename = req.path.replace(/^\//, '')
    res.sendFile(path.join(dllConfig.path, filename))
  })

  // Set output path in webpack
  app.set('outputPath', compiler.outputPath)

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  app.set('fs', devMiddleware.fileSystem)

  app.use(devMiddleware)

  const hotMiddleware = webpackHotMiddleware(compiler)

  // Force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
      hotMiddleware.publish({
        action: 'reload'
      })
      cb()
    })
  })

  app.use(hotMiddleware)
}

module.exports = (app, webpackConfig) => {
  addDevMiddlewares(app, webpackConfig)

  return app
}
