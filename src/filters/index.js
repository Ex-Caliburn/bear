// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'
import {ENV_URL} from '@/utils/const'

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter (num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandslsFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function getMediaPath(url, type) {
  if (/^data:/g.test(url) || !url || url.indexOf('/img/') > -1) {
    return url || ''
  }

  let path = ''
  if (url.indexOf('http') === -1) {
    switch (type) {
      case 'picture':
        path = ENV_URL.prefixImage
        // 避免双斜杠
        if (url[0] === '/') {
          url = url.substr(1)
        }
        break
      default:
        break
    }
  }
  return path + url
}
