const path = require('path')
const pullAll = require('lodash/pullAll')
const uniq = require('lodash/uniq')

const dllConfig = {
  exclude: ['normalize.css', 'tween.js', 'vue-dynamic-props', 'gsap.js'],

  include: ['eventsource-polyfill'],

  path: path.join(__dirname, '../node_modules/dlls'),

  entry(pkg) {
    const dependencyNames = Object.keys(pkg.dependencies)
    const exclude = dllConfig.exclude
    const include = dllConfig.include
    const includeDependencies = uniq(dependencyNames.concat(include))

    return {
      dependencies: pullAll(includeDependencies, exclude)
    }
  }
}

module.exports = dllConfig
