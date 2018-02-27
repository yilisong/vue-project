const path = require('path')
const defaults = require('lodash/defaults')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Symbol = require('./symbol')
const argv = require('minimist')(process.argv.slice(2))

module.exports = options =>
  new Symbol(argv.x).getSuitPages().map(
    page =>
      new HtmlWebpackPlugin(
        defaults(
          {
            title: page.title,
            filename: `${page.path}/${page.name}.html`,
            chunks: options.chunks
              ? [...options.chunks, page.name]
              : [page.name],
            inject: 'body',
            favicon: path.resolve(__dirname, '../public/favicon.ico')
          },
          options
        )
      )
  )
