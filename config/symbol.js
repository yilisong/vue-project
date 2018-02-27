const path = require('path')
const { pages } = require(path.resolve(__dirname, './build.conf'))

class Symbol {
  constructor(symbol) {
    // Suitable pages depend on symbol
    this.suitPages = []

    // Auto opened url path in browser depend on symbol
    this.urlPath = ''

    switch (symbol) {
      case 'md1':
        this.urlPath = '/console'

        pages.forEach(page => {
          if (page.path === 'console' || page.required)
            this.suitPages.push(page)
        })
        break
      case 'md2':
        this.urlPath = '/'

        pages.forEach(page => {
          if (page.path === 'website' || page.required)
            this.suitPages.push(page)
        })
        break
      // case 'md3':
      //   this.urlPath = '/payment'

      //   pages.forEach(page => {
      //     if (page.path === 'payment' || page.required)
      //       this.suitPages.push(page)
      //   })
      //   break
      case 'md3':
        this.urlPath = '/'

        pages.forEach(page => {
          this.suitPages.push(page)
        })
        break
      default:
        pages.forEach(page => {
          if (page.symbol === symbol) {
            this.urlPath = `/${page.path}/${page.name}`
            this.suitPages.push(page)
          }

          page.required && this.suitPages.push(page)
        })
    }
  }

  getSuitPages() {
    return this.suitPages
  }

  getUrlPath() {
    return this.urlPath
  }

  getEntries({ hmr = false } = {}) {
    const container = hmr ? ['eventsource-polyfill'] : []

    const entires = {}

    this.suitPages.forEach(page => {
      entires[page.name] = container.concat([page.entry])
    })

    return entires
  }
}

module.exports = Symbol
