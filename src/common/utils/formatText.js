// format money
// saved to two decimal places
export default (type, val) => {
  let newVal
  switch (type) {
    case 'money':
      newVal = Number(val).toFixed(2)
      if (isNaN(val)) {
        return val
      } else {
        return newVal
      }
      break
    default:
      return val
  }
}
