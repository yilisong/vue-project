const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const cheerio = require('cheerio')
const argv = require('minimist')(process.argv.slice(2))
const Symbol = require('./symbol')
const dllConfig = require('./dll.conf')
const logger = require('../packages/dev-utils/logger')
const htmlProducer = require('./htmlProducer')

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrorsPlugin(),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/,
    failOnError: false
  })
]

process.env.ANALYZE &&
  plugins.push(new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin())

module.exports = require('./webpack.conf.base')({
  entry: new Symbol(argv.x).getEntries({ hmr: true }),
  output: {
    filename: '[name].js',
    chunkFilename: '[id].[name].js'
  },
  module: {
    rules: [
      {
        resource: {
          test(filePath) {
            return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath)
          }
        },
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        resource: {
          test: /\.module\.css$/
        },
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        resource: {
          test: /\.vue$/
        },
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: [
                'vue-style-loader',
                {
                  loader: 'css-loader'
                }
              ]
            }
          }
        }
      }
    ]
  },
  plugins: plugins.concat(dependencyHandlers()).concat(
    htmlProducer({
      templateContent: templateContent()
    })
  ),
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false
  }
})

function dependencyHandlers() {
  const manifestPath = path.resolve(dllConfig.path, 'dependencies.json')

  if (!fs.existsSync(manifestPath)) {
    logger.error('The DLL manifest is missing. Please run `npm run build:dll`')
    process.exit(0)
  }

  return new webpack.DllReferencePlugin({
    context: path.resolve(__dirname, '../'),
    manifest: require(manifestPath)
  })
}

function templateContent() {
  const html = fs
    .readFileSync(path.resolve(__dirname, '../public/template.html'))
    .toString()
  const doc = cheerio(html)
  const body = doc.find('body')
  const name = 'dependencies'

  body.append(
    `<script data-dll='true' type='text/javascript' src='/${name}.dll.js'></script>`
  )

  return doc.toString()
}
