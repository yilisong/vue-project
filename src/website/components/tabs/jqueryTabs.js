import $ from 'jquery'

export default className => {
  const parent = $(className)
  const headLis = parent.find('.tab-hd li')
  const bodyLis = parent.find('.tab-bd li')
  headLis.click(function() {
    $(this).addClass('active').siblings().removeClass('active')
    const index = $(this).index()
    bodyLis.siblings().hide().eq(index).show()
  })
}
