import moment from 'moment'

moment.locale('zh-cn')

export default (startDate, endDate) => {
  const start = moment(startDate)
  const end = moment(endDate)
  return end.from(start, true)
}
