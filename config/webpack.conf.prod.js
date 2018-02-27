const { resolve, join } = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const argv = require('minimist')(process.argv.slice(2))
const Symbol = require('./symbol')
const htmlProducer = require('./htmlProducer')
const forEach = require('lodash/forEach')
const pkg = require(resolve(__dirname, '../package.json'))
const { dependencies } = require('./dll.conf').entry(pkg)

const ExtractVue = new ExtractTextPlugin({
  filename: 'static/styles/[name].[contenthash:7].vue.css',
  allChunks: true
})

const ExtractCSS = new ExtractTextPlugin({
  filename: 'static/styles/[name].[contenthash:7].css',
  allChunks: true
})

const plugins = [
  ExtractVue,
  ExtractCSS,
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks(module, count) {
      // Only extract specific modules from node_modules folder
      if (module.resource && /\.js$/.test(module.resource)) {
        let hasDependency = false

        forEach(dependencies, dependency => {
          if (
            module.resource.indexOf(
              join(__dirname, `../node_modules/${dependency}/`)
            ) === 0
          ) {
            hasDependency = true
            return false
          }
        })

        return hasDependency
      } else {
        return false
      }
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  })
]

module.exports = require('./webpack.conf.base')({
  entry: new Symbol(argv.x).getEntries(),
  output: {
    filename: 'static/scripts/[name].[chunkhash:7].js',
    chunkFilename: 'static/scripts/[id].[chunkhash:7].js'
  },
  module: {
    rules: [
      {
        resource: {
          test(filePath) {
            return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath)
          }
        },
        use: ExtractCSS.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        resource: {
          test: /\.module\.css$/
        },
        use: ExtractCSS.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: true,
                camelCase: true,
                localIdentName: '[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        resource: {
          test: /\.vue$/
        },
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractVue.extract({
                use: 'css-loader'
              })
            }
          }
        }
      }
    ]
  },
  plugins: plugins.concat(
    htmlProducer({
      template: resolve(__dirname, '../public/template.html'),
      chunks: ['vendor', 'manifest'],
      // If you use multiple chunks with commonChunksPlugin, this is the necessary
      // setting in order to put webpack runtime code (manifest) in front of
      // all chunks
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  )
})
