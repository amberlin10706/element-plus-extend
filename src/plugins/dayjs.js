import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import isoWeek from 'dayjs/plugin/isoWeek'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import 'dayjs/locale/zh-tw'

dayjs.locale('zh-tw')

const rocYearPlugin = (option, dayjsClass) => {
  const oldFormat = dayjsClass.prototype.format
  dayjsClass.prototype.format = function (formatStr) {
    let result = oldFormat.bind(this)(formatStr)
    result = result.replace('ROC', this.$y - 1911)
    return result
  }

  const oldParse = dayjsClass.prototype.parse
  dayjsClass.prototype.parse = function (cfg) {
    const { date, args } = cfg
    const format = args && args[1]

    if (typeof date === 'string' && typeof format === 'string' && format.includes('ROC')) {
      const rocIndex = format.indexOf('ROC')
      const potentialYear = date.substring(rocIndex).match(/^\d+/)

      if (potentialYear) {
        const rocYear = potentialYear[0]
        const yearGap = rocYear.length > 3 ? 0 : 1911
        const adYear = parseInt(rocYear, 10) + yearGap
        cfg.date = date.slice(0, rocIndex) + adYear + date.slice(rocIndex + rocYear.length)
      }

      const newFormat = format.replace('ROC', 'YYYY')
      if (cfg.args[1]) cfg.args[1] = newFormat
    }

    return oldParse.bind(this)(cfg)
  }
}

dayjs.extend(rocYearPlugin)
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)
dayjs.extend(isoWeek)
dayjs.extend(duration)
