// remove url hash when redirct from console
export default () => {
  const loc = window.location.href
  const index = loc.indexOf('#')

  if (index > 0) {
    window.location = loc.substring(0, index)
  }
}
