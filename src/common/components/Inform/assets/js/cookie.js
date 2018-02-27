export default {
  get(name) {
    const cookieName = encodeURIComponent(name) + '='
    const cookieStart = document.cookie.indexOf(cookieName)
    let cookieValue = null
    let cookieEnd = null
    if (cookieStart > -1) {
      cookieEnd = document.cookie.indexOf(';', cookieStart + cookieName.length)
      if (cookieEnd === -1) cookieEnd = document.cookie.length
    }
    cookieValue = decodeURIComponent(
      document.cookie.substr(cookieStart + cookieName.length, cookieEnd)
    )
    return cookieValue
  },
  set(name, value, path, domain, day) {
    let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)
    // if(expires instanceof Date)cookieText+=';expires='+expires.toGMTString()
    if (path) cookieText += ';path=' + path
    if (domain) cookieText += ';domain=' + domain
    day = day || 24
    const expires = new Date()
    expires.setTime(expires.getTime() + day * 60 * 60 * 1000)
    cookieText += ';expires=' + expires.toGMTString()
    document.cookie = cookieText
  }
}
