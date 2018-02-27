import SourceWebResource from 'src/website/static/js/SourceWebResource'

export default {
  // copy text
  copyText: text => {
    const flag = true
    const aux = document.createElement('input')
    const content = text
    aux.setAttribute('value', content)
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    document.body.removeChild(aux)
  },
  //open the qq dialog
  linkService: () => {
    window.open(
      'http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDA5MDAwN180NzMxNDZfODAwMDkwMDA3XzJf',
      '_blank',
      'height=514, width=644,toolbar=no,scrollbars=no,menubar=no,status=no'
    )
  },
  //baiduStatistics
  statistics: () => {
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?532dffdcda109cfaeb67d1eb04c4813a'
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  },
  // IE浏览器下面的setInterval方法据说并不支持传参，这个方法为对IE浏览器的兼容
  intervalAddParam: () => {
    if (document.all && !window.setInterval.isPolyfill) {
      const __nativeSI__ = window.setInterval
      window.setInterval = (
        vCallback,
        nDelay /*, argumentToPass1, argumentToPass2, etc. */
      ) => {
        const aArgs = Array.prototype.slice.call(arguments, 2)
        return __nativeSI__(
          vCallback instanceof Function
            ? () => {
                vCallback.call(null, ...aArgs)
              }
            : vCallback,
          nDelay
        )
      }
      window.setInterval.isPolyfill = true
    }
  },
  // if the user is not login，jump to the login page
  verdictLogin: () => {
    SourceWebResource.getUserInfo().then(response => {
      if (!response.data.email) {
        window.location.href = '/login'
      }
    })
  },
  // judege environment of the release
  environment: () => {
    if (Object.is(process.env.APP_ENV, 'release')) {
      return false
    } else {
      return true
    }
  },
  // url complement '/'
  complement: url => {
    if (!url) {
      return
    } else if (url.substr(url.length - 1, 1) !== '/') {
      return `${url}/`
    } else {
      return url
    }
  }
}
