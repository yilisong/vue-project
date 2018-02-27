const axios = require('axios')
const querystring = require('querystring')
const winston = require('winston')
const es6ClassBindAll = require('es6-class-bind-all')
const proxyTable = require('../config/proxy-table')

winston.level = 'debug'

/*
class Auth {
  constructor() {
    this.resource = {
      getToken: `${proxyTable.get('/api')}/api/sso/V4/attach`,
      getUserInfo: `${proxyTable.get('/api')}/api/sso/V4/getUserInfo`
    }

    this.token = {
      key: 'sso_token_daoshuv1',
      value: ''
    }

    es6ClassBindAll(this)
  }

  getToken() {
    return axios({
      url: this.resource.getToken,
      method: 'get'
    }).then(response => {
      const { responseUrl } = response.request.res
      this.token.value = querystring.parse(responseUrl).token
    })
  }

  async setToken(req, res, next) {
    // token already exist
    if (req.cookies[this.token.key]) next()
    else {
      // token not exist
      try {
        await this.getToken()
        res.cookie(this.token.key, this.token.value, {
          expires: new Date(Date.now() + 86400 * 1000),
          httpOnly: true
        })
        next()
      } catch (err) {
        new Error(err)
      }
    }
  }

  getUserInfo() {
    return axios({
      url: this.resource.getUserInfo,
      method: 'get',
      headers: { Cookie: `${this.token.key}=${this.token.value}` }
    })
  }

  async loginDetect(req, res, next) {
    // get cookie from use client
    this.token.value = req.cookies[this.token.key]

    // token not exist
    if (!this.token.value) {
      res.redirect('/login')
    } else {
      // token outdated
      try {
        const response = await this.getUserInfo()
        if (response.data.http_status_code === 204) res.redirect('/login')
        else next()
      } catch (err) {
        const { response } = err
        winston.log('debug', response.data)
        new Error(err)
        if (response.status === 403 && response.data.error)
          res.redirect('/login')
      }
    }
  }
}

module.exports = new Auth()
*/
