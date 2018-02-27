const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.conf.prod')
const rimraf = require('rimraf')
const prerenderSEO = require('../packages/prerender-seo/lib')
const ora = require('ora')
const spinner = ora('Start Building...').start()

const distPath = path.resolve(process.cwd(), 'dist')
const distTempPath = path.resolve(process.cwd(), 'dist_temp')
const assetsPath = path.join(distTempPath, 'static')

if (fs.existsSync(distTempPath)) {
  rimraf.sync(distTempPath)
}

fs.mkdirSync(distTempPath)
fs.mkdirSync(assetsPath)

webpack(webpackConfig, (err, stats) => {
  if (err) {
    rimraf.sync(distTempPath)
    spinner.fail('Building Failed')
    throw err
  } else {
    rimraf.sync(distPath)
    fs.renameSync(distTempPath, distPath)

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n'
    )

    spinner.succeed('Building Successful')

    prerenderSEO(
      path.resolve(__dirname, '../dist'),
      [
        '/website/index.html',
        //'/website/hatch-plan.html',
        '/website/guide.html',
        '/website/about.html',
        '/website/cloudHost.html',
        '/website/cloudMonitor.html',
        '/website/cloudResolving.html',
        '/website/cloudSpeed.html',
        '/website/doubleMirror.html',
        '/website/messageCenter.html',
        '/website/redGuard.html',
        '/website/riskDetect.html',
        '/website/serverGuard.html',
        '/website/sslCertificate.html',
        '/website/stargaze.html',
        '/website/taichiddosApp.html',
        '/website/taichiddosDns.html',
        '/website/taichiddosPlus.html',
        '/website/taichiddosWeb.html',
        '/website/assess.html',
        '/website/consult.html',
        '/website/guarantor.html',
        '/website/polling.html',
        '/website/respond.html',
        '/website/service.html',
        '/website/verify.html',
        '/website/solve-scheme-chess.html',
        '/website/solve-scheme-finance.html',
        '/website/solve-scheme-government.html',
        '/website/solve-scheme-internet.html',
        '/website/special.html'
      ],
      {
        ignoreErrors: true,
        preserveMountNode: '#root',
        captureAfterTime: 5000
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
  }
})
