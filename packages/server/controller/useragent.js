const useragent = require('useragent')

class Useragent {
  ie9banned(req, res, next) {
    const ua = useragent.is(req.headers['user-agent'])
    ua.ie &&
    (ua.version === '8.0' || ua.version === '7.0' || ua.version === '6.0')
      ? res.redirect('/browser-tip')
      : next()
  }
}

module.exports = new Useragent()
