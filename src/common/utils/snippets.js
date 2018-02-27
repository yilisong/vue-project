import SourceWebResource from 'website/static/js/SourceWebResource'

export function isLogined(url) {
  SourceWebResource.getUserInfo().then(response => {
    if (!response.data.email) {
      window.location.href = '/login'
    } else {
      window.location.href = url
    }
  })
}
