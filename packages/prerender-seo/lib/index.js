const { join } = require('path')
const fs = require('fs')
const ora = require('ora')
const phantom = require('phantomjs-prebuilt')
const childProcess = require('child_process')
const serverSetup = require('./serverSetup')

module.exports = (staticDir, files, options, proxyTable) => {
  serverSetup(staticDir, proxyTable)
    .then(({ server, port }) => {
      Promise.all(
        files.map(
          file =>
            new Promise((resolve, reject) => {
              const oraTextTemplate = status =>
                status
                  ? `Prerendering File ${status}: ${file}`
                  : `Prerendering Files...`

              const spinner = ora(oraTextTemplate()).start()

              const phantomArguments = [
                join(__dirname, 'phantomRender.js'),
                `http://localhost:${port}${file}`,
                JSON.stringify(options)
              ]

              childProcess.execFile(
                phantom.path,
                phantomArguments,
                { maxBuffer: 1048576 },
                (error, stdout, stderr) => {
                  if (error || stderr) {
                    spinner.fail(oraTextTemplate('Failed'))
                    if (error) throw stdout
                    if (stderr) throw stderr
                  } else {
                    fs.writeFile(join(staticDir, file), stdout, error => {
                      if (error) {
                        spinner.fail(oraTextTemplate('Failed'))
                        return reject(
                          'Could not write file: ' + file + '\n' + error
                        )
                      }
                      spinner.succeed(oraTextTemplate('Successful'))
                      resolve()
                    })
                  }
                }
              )
            })
        )
      )
        .then(() => {
          server.stop()
        })
        .catch(error => {
          setTimeout(() => {
            throw error
          })
        })
    })
    .catch(error => {
      setTimeout(() => {
        throw error
      })
    })
}
