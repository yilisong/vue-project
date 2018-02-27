const hapi = require('hapi')
const inert = require('inert')
const h2o2 = require('h2o2')
const portfinder = require('portfinder')

module.exports = (staticDir, proxyTable = []) =>
  new Promise((resolve, reject) => {
    portfinder
      .getPortPromise()
      .then(port => {
        const server = new hapi.Server({
          connections: {
            routes: {
              files: {
                relativeTo: staticDir
              }
            }
          }
        })

        server.connection({ port })

        server.register([inert, h2o2], error => {
          if (error) return reject(error)

          // setup static files
          server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
              directory: {
                path: '.',
                redirectToSlash: true,
                index: true
              }
            }
          })

          // setup proxy configuration
          proxyTable.forEach(proxyUnit => {
            const { context, proxy } = proxyUnit

            server.route({
              method: ['PUT', 'GET', 'POST', 'DELETE'],
              path: '/api/{param*}',
              handler: {
                proxy
              }
            })
          })

          server.start(error => {
            if (error) return reject(error)
            resolve({ server, port })
          })
        })
      })
      .catch(error => {
        reject(error)
      })
  })
