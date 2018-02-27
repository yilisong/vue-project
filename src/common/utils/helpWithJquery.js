import $ from 'jquery'
export default {
  bindScroll: name => {
    const elm = $(`#${name}`)
    const ul = $(`#${name} > ul`)
    const startPos = elm.offset().top
    $.event.add(window, 'scroll', () => {
      const p = $(window).scrollTop()
      elm.css('position', p > startPos ? 'fixed' : 'absolute')
      elm.css('top', p > startPos ? '0px' : '')
      ul.css('background', p > startPos ? '#333333' : '')
    })
  },
  position: pname => {
    const mao = $(`#${pname}`)
    if (mao.length > 0) {
      const pos = mao.offset().top
      $('html,body').animate(
        {
          scrollTop: pos - 40
        },
        1000
      )
    }
  }
}
