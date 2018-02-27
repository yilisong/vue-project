var defaultsDeep = require('lodash/defaultsDeep')
var system = require('system')
var page = require('webpage').create()

var url = system.args[1]
var options = JSON.parse(system.args[2])

page.settings.loadImages = false
page.settings.localToRemoteUrlAccessEnabled = true
page.settings.resourceTimeout = 15000

if (options.settings) {
  page.settings = defaultsDeep(options.settings, page.settings)
}

page.onInitialized = function() {
  page.injectJs(page.libraryPath + '/../../core-js/client/core.js')

  if (options.preserveMountNode) {
    page.evaluate(function(preserveMountNode) {
      var mountNode = document.querySelector(preserveMountNode)
      var cloneMountNode = mountNode.cloneNode(true)

      // add prerender-seo mark
      cloneMountNode.setAttribute('data-prerender-seo', '')

      // hide prerendered dom to avoid display issue before initial in browser
      // only make sure prerendered dom is capable for crawler to scratch
      cloneMountNode.setAttribute('style', 'display: none;')

      mountNode.parentNode.insertBefore(cloneMountNode, mountNode.nextSibling)
    }, options.preserveMountNode)
  }
}

page.onResourceRequested = function(requestData, request) {
  if (/\.css$/i.test(requestData.url)) request.abort()
}

page.onError = function(message, trace) {
  if (options.ignoreErrors) return
  var pathname = url.replace(/http:\/\/localhost:\d+/, '')
  console.error(
    'WARNING: JavaScript error while prerendering: ' + pathname + '\n' + message
  )
  phantom.exit(1)
}

if (options.navigationLocked) {
  page.onLoadStarted = function() {
    page.navigationLocked = true
  }
}

if (options.viewportSize) {
  page.viewportSize = options.viewportSize
}

page.open(url, function(status) {
  if (status !== 'success') {
    throw new Error('FAIL to load: ' + url)
  } else {
    // CAPTURE WHEN AN EVENT FIRES ON THE DOCUMENT
    if (options.captureAfterDocumentEvent) {
      page.onCallback = returnResult
      page.evaluate(function(eventName) {
        document.addEventListener(eventName, function() {
          if (preserveMountNode) {
            var mountNode = document.querySelector(preserveMountNode)
            var renderedNode = mountNode.previousSibling
            mountNode.innerHTML = renderedNode.outerHTML
            renderedNode.parentNode.removeChild(renderedNode)
          }

          var doctype = new window.XMLSerializer().serializeToString(
            document.doctype
          )
          var outerHTML = document.documentElement.outerHTML
          window.callPhantom(doctype + outerHTML)
        })
      }, options.captureAfterDocumentEvent)
    }

    // CAPTURE ONCE A SPECIFC ELEMENT EXISTS
    if (options.captureAfterElementExists) {
      setInterval(function() {
        var html = page.evaluate(function(elementSelector) {
          if (document.querySelector(elementSelector)) {
            if (preserveMountNode) {
              var mountNode = document.querySelector(preserveMountNode)
              var renderedNode = mountNode.previousSibling
              mountNode.innerHTML = renderedNode.outerHTML
              renderedNode.parentNode.removeChild(renderedNode)
            }

            var doctype = new window.XMLSerializer().serializeToString(
              document.doctype
            )
            var outerHTML = document.documentElement.outerHTML
            return doctype + outerHTML
          }
        }, options.captureAfterElementExists)
        if (html) returnResult(html)
      }, 100)
    }

    // CAPTURE AFTER A NUMBER OF MILLISECONDS
    if (options.captureAfterTime) {
      setTimeout(function() {
        var html = page.evaluate(function(preserveMountNode) {
          if (preserveMountNode) {
            var mountNode = document.querySelector(preserveMountNode)
            var renderedNode = mountNode.previousSibling
            mountNode.innerHTML = renderedNode.outerHTML
            renderedNode.parentNode.removeChild(renderedNode)
          }

          var doctype = new window.XMLSerializer().serializeToString(
            document.doctype
          )
          var outerHTML = document.documentElement.outerHTML
          return doctype + outerHTML
        }, options.preserveMountNode)
        returnResult(html)
      }, options.captureAfterTime)
    }

    // IF NO SPECIFIC CAPTURE HOOK IS SET, CAPTURE
    // IMMEDIATELY AFTER SCRIPTS EXECUTE
    if (
      !options.captureAfterDocumentEvent &&
      !options.captureAfterElementExists &&
      !options.captureAfterTime
    ) {
      var html = page.evaluate(function() {
        if (preserveMountNode) {
          var mountNode = document.querySelector(preserveMountNode)
          var renderedNode = mountNode.previousSibling
          mountNode.innerHTML = renderedNode.outerHTML
          renderedNode.parentNode.removeChild(renderedNode)
        }

        var doctype = new window.XMLSerializer().serializeToString(
          document.doctype
        )
        var outerHTML = document.documentElement.outerHTML
        return doctype + outerHTML
      })
      returnResult(html)
    }

    function returnResult(html) {
      console.log(html.trim())
      phantom.exit()
    }
  }
})
