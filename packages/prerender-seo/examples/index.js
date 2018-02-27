const path = require('path')
const prerenderSEO = require('../lib')

prerenderSEO(
  path.resolve(__dirname, './dist'),
  [
    '/website/guide.html',
    '/website/about.html',
    '/website/redGuard.html',
    '/website/index.html'
  ],
  {
    ignoreErrors: true
  },
  [
    {
      context: '/api',
      proxy: {
        host: 'homev5.test.nodevops.cn',
        port: '80',
        protocol: 'http'
      }
    }
  ]
)
