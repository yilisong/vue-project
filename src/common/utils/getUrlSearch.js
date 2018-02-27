// get url search and transfrom it to Object
import qs from 'qs'

export default () => {
  const searchUrl = window.location.search || window.location.hash
  const index = searchUrl.indexOf('?')

  if (index > 0) {
    const searchQs = searchUrl.substring(index + 1)
    return qs.parse(searchQs)
  } else {
    return ''
  }
}
