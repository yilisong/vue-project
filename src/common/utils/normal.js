const tabDelPopover = (data, that) => {
  console.log(data)
  const result = data
  result.forEach(v => {
    that.popoverArray.push({
      flag: false
    })
  })
  return result
}
