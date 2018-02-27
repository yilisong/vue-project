const resolve = require('path').resolve

const pages = [
  {
    path: 'website',
    name: 'login',
    title: '道枢|登录',
    symbol: 'wp1',
    entry: resolve(__dirname, '../src/website/modules/login/main.js'),
    required: true
  },
  // {
  //   path: 'website',
  //   name: 'find-pass',
  //   title: '道枢|密码找回',
  //   symbol: 'wp2',
  //   entry: resolve(__dirname, '../src/website/modules/find-pass/main.js')
  // },
  // {
  //   path: 'website',
  //   name: 'register',
  //   title: '道枢|注册',
  //   symbol: 'wp3',
  //   entry: resolve(__dirname, '../src/website/modules/register/main.js')
  // },
  // {
  //   path: 'website',
  //   name: 'register-suc',
  //   title: '道枢|注册成功',
  //   symbol: 'wp4',
  //   entry: resolve(__dirname, '../src/website/modules/register-suc/main.js')
  // },
  {
    path: 'console',
    name: 'home',
    title: '道枢控制台|云加速',
    symbol: 'cp1',
    entry: resolve(__dirname, '../src/console/modules/cloud-speed/main.js')
  },
  {
    path: 'console',
    name: 'privately-node',
    title: '道枢控制台|私有节点',
    symbol: 'cp2',
    entry: resolve(__dirname, '../src/console/modules/privately-node/main.js')
  },
  {
    path: 'console',
    name: 'cloud-speed',
    title: '云盾控制台|云加速',
    symbol: 'cp3',
    entry: resolve(__dirname, '../src/console/modules/cloud-speed/main.js')
  },
  {
    path: 'console',
    name: 'emergency-resources',
    title: '道枢|应急资源',
    symbol: 'cp3',
    entry: resolve(
      __dirname,
      '../src/console/modules/emergency-resources/main.js'
    ),
    required: true
  }
]

module.exports = {
  pages,
  symbols: ['md1', 'md2', 'md3', ...pages.map(page => page.symbol)]
}
