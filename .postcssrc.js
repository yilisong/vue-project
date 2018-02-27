// https://github.com/michael-ciniawsky/postcss-load-config
const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-inject')({
      cssFilePath: path.resolve(
        __dirname,
        './src/common/assets/styles/color-conf.css'
      )
    }),
    require('precss'),
    require('autoprefixer')({
      browsers: ['last 2 versions', 'safari >= 7', 'IE >= 9', '> 1%']
    }),
    // http://simplaio.github.io/rucksack/
    require('rucksack-css')
  ]
}
