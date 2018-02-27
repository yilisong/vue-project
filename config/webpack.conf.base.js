const path = require('path')
const webpack = require('webpack')
const moduleRoot = '../src/console/modules'

module.exports = options => ({
  entry: options.entry,
  output: Object.assign(
    {
      path: path.resolve(__dirname, '../dist_temp'),
      publicPath: '/'
    },
    options.output
  ),
  module: {
    rules: [
      {
        resource: {
          test: /\.(js|vue)$/,
          include: path.resolve(__dirname, '../src')
        },
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          }
        ]
      },
      {
        resource: {
          test: /\.js$/,
          include: [path.resolve(__dirname, '../src')]
        },
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        resource: {
          test: /\.json$/
        },
        use: [
          {
            loader: 'json-loader'
          }
        ]
      },
      {
        resource: {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/
        },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'static/images/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        resource: {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/
        },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'static/fonts/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ].concat(options.module ? options.module.rules : [])
  },
  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
      'process.env.API': JSON.stringify('/api/V4/')
    }),
    new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /zh-cn/),
    new webpack.NamedModulesPlugin()
  ]),
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      src: path.resolve(__dirname, '../src'),
      common: path.resolve(__dirname, '../src/common'),
      website: path.resolve(__dirname, '../src/website'),
      cloudSpeed: path.resolve(__dirname, `${moduleRoot}/cloud-speed`),
      cloudHost: path.resolve(__dirname, `${moduleRoot}/cloud-host`),
      cloudMonitor: path.resolve(__dirname, `${moduleRoot}/cloud-monitor`),
      cloudResolving: path.resolve(__dirname, `${moduleRoot}/cloud-resolving`),
      doubleMirror: path.resolve(__dirname, `${moduleRoot}/double-mirror`),
      gameShield: path.resolve(__dirname, `${moduleRoot}/game-shield`),
      home: path.resolve(__dirname, `${moduleRoot}/home`),
      messageCenter: path.resolve(__dirname, `${moduleRoot}/message-center`),
      redGuard: path.resolve(__dirname, `${moduleRoot}/red-guard`),
      shieldEye: path.resolve(__dirname, `${moduleRoot}/shield-eye`),
      sslCertificate: path.resolve(__dirname, `${moduleRoot}/ssl-certificate`),
      taichiDdos: path.resolve(__dirname, `${moduleRoot}/taichiDdos`),
      userCenter: path.resolve(__dirname, `${moduleRoot}/userCenter`)
    },
    extensions: ['.js', '.vue', '.json'],
    mainFields: ['browser', 'module', 'main'],
    modules: ['app', 'node_modules'],
    unsafeCache: true
  },
  target: 'web',
  devtool: options.devtool,
  performance: options.performance || {}
})
