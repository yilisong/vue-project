export default {
  zero(v) {
    return v >> 0 < 10 ? '0' + v : v
  },
  timeTohous(params) {
    let d = 0
    let h = 0
    let i = 0
    let s = parseInt(params, 10)
    if (s > 60) {
      i = parseInt(s / 60, 10)
      s = parseInt(s % 60, 10)
      if (i > 60) {
        h = parseInt(i / 60, 10)
        i = parseInt(i % 60, 10)
        if (h > 24) {
          d = parseInt(h / 24, 10)
          h = parseInt(h % 24, 10)
        }
      }
    }
    /*显示时间处理*/
    if (this.zero(d) === '00') {
      if (this.zero(h) === '00') {
        if (this.zero(i) === '00') {
          if (this.zero(s) === '00') {
            return '暂无数据'
          } else {
            return this.zero(s) + '秒'
          }
        } else {
          return this.zero(i) + '分' + this.zero(s) + '秒'
        }
      } else {
        return this.zero(h) + '时' + this.zero(i) + '分' + this.zero(s) + '秒'
      }
    } else {
      return (
        this.zero(d) +
        '天' +
        this.zero(h) +
        '时' +
        this.zero(i) +
        '分' +
        this.zero(s) +
        '秒'
      )
    }
  }
}
