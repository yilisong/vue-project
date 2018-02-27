/* eslint-disable */
//倒计时
var addTimer = (function() {
  var list = [],
    interval

  return function(id, time, btnStatus) {
    if (!interval) interval = setInterval(go, 1000)
    list.push({
      ele: id,
      time: time
    })
  }

  function go() {
    for (let i = 0; i < list.length; i++) {
      list[i].ele.innerText = getTimerString(
        list[i].time ? (list[i].time -= 1) : 0
      )
      if (!list[i].time) {
        if (list[i].ele.tagName === 'SPAN' || list[i].ele.tagName === 'span') {
          list[i].ele.parentNode.removeAttribute('disabled')
          list[i].ele.parentNode.className =
            'el-button into-btn el-button--default'
        } else {
          list[i].ele.removeAttribute('disabled')
          list[i].ele.className = 'el-button into-btn el-button--default'
        }

        list.splice(i--, 1)
      }
    }
  }

  function getTimerString(time) {
    var not0 = !!time,
      d = Math.floor(time / 86400),
      h = Math.floor((time %= 86400) / 3600),
      m = Math.floor((time %= 3600) / 60),
      s = time % 60
    if (not0) return s + '秒后重新获取'
    else return '发送验证码'
  }
})()
const validate = {
  email: {
    test: value => /^([\w-_]+(?:\.[\w-_]+)*)@(?:\w+\.)+\w+$/.test(value)
  },
  // email: {
  //   test: value =>
  //     /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(
  //       value
  //     )
  // },
  phone: {
    test: value => /^0?(13|14|15|17|18)[0-9]{9}$/.test(value)
  },
  qq: {
    test: value => /^[0-9]{5,10}$/.test(value)
  },
  code: {
    test: value => /^[0-9]{6}$/.test(value)
  },
  IDnumber: {
    test: value =>
      /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
        value
      )
  },
  companyName: {
    test: value => /^[\u4e00-\u9fa5a-zA-Z0-9\\(\\)\\（\\）]{2,32}$/.test(value)
  },
  socialCode: {
    test: value => /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/.test(value)
  }
}
var asciiValidate = function(value) {
  let Modes = 0,
    modes = 0
  for (let i = 0; i < value.length; i++) Modes |= CharMode(value.charCodeAt(i))
  return bitTotal(Modes)

  function CharMode(type) {
    if (
      type >= 48 &&
      type <= 57 //数字
    )
      return 1
    if (
      type >= 97 &&
      type <= 122 //小写字母
    )
      return 2
    if (
      type >= 65 &&
      type <= 90 //大写字母
    )
      return 4
    if (
      (type >= 33 && type <= 47) ||
      (type >= 58 && type <= 64) ||
      (type >= 91 && type <= 96) ||
      (type >= 123 && type <= 126) //标点符号
    )
      return 8
  }

  function bitTotal(level) {
    for (let i = 0; i < 4; i++) {
      if (level & 1) modes++
      level >>>= 1
    }
    return modes
  }
}
//跨域
var JSONP = {
  // 获取当前时间戳
  now: function() {
    return new Date().getTime()
  },

  // 获取16位随机数
  rand: function() {
    return Math.random().toString().substr(2)
  },

  // 删除节点元素
  removeElem: function(elem) {
    var parent = elem.parentNode
    if (parent && parent.nodeType !== 11) {
      parent.removeChild(elem)
    }
  },

  // url组装
  parseData: function(data) {
    var ret = ''
    if (typeof data === 'string') {
      ret = data
    } else if (typeof data === 'object') {
      for (var key in data) {
        ret += '&' + key + '=' + encodeURIComponent(data[key])
      }
    }
    // 加个时间戳，防止缓存
    ret += '&_time=' + this.now()
    ret = ret.substr(1)
    return ret
  },

  getJSON: function(url, data, func) {
    // 函数名称
    var name

    // 拼装url
    url = url + (url.indexOf('?') === -1 ? '?' : '&') + this.parseData(data)

    // 检测callback的函数名是否已经定义
    var match = /callback=(\w+)/.exec(url)
    if (match && match[1]) {
      name = match[1]
    } else {
      // 如果未定义函数名的话随机成一个函数名
      // 随机生成的函数名通过时间戳拼16位随机数的方式，重名的概率基本为0
      // 如:jsonp_1355750852040_8260732076596469
      name = 'jsonp_' + this.now() + '_' + this.rand()
      // 把callback中的?替换成函数名
      url = url.replace('callback=?', 'callback=' + name)
      // 处理?被encode的情况
      url = url.replace('callback=%3F', 'callback=' + name)
    }

    // 创建一个script元素
    var script = document.createElement('script')
    script.type = 'text/javascript'
    // 设置要远程的url
    script.src = url
    // 设置id，为了后面可以删除这个元素
    script.id = 'id_' + name

    // 把传进来的函数重新组装，并把它设置为全局函数，远程就是调用这个函数
    window[name] = function(json, code, status) {
      // 执行这个函数后，要销毁这个函数
      window[name] = undefined
      // 获取这个script的元素
      var elem = document.getElementById('id_' + name)
      // 删除head里面插入的script，这三步都是为了不影响污染整个DOM
      JSONP.removeElem(elem)
      // 执行传入的的函数
      func(json, code, status)
    }

    // 在head里面插入script元素
    var head = document.getElementsByTagName('head')
    if (head && head[0]) {
      head[0].appendChild(script)
    }
  }
}

function addDisable(e) {
  if (e) {
    if (e.tagName === 'SPAN' || e.tagName === 'span') {
      e.parentNode.setAttribute('disabled', true)
      e.parentNode.className =
        'el-button into-btn el-button--default is-disabled'
    } else {
      e.setAttribute('disabled', true)
      e.className = 'el-button into-btn el-button--default is-disabled'
    }
  }
}

function returnOrigin() {
  if (!window.location.origin) {
    window.location.origin =
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '')
  }
  return window.location.origin
}
export { addTimer, validate, asciiValidate, JSONP, addDisable, returnOrigin }
