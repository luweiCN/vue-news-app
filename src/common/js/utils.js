export function formatterDateTime () {
  var date = new Date()
  var month = date.getMonth() + 1
  var datetime = date.getFullYear() +
  '' + // "年"
  (month >= 10 ? month : '0' + month) + // "月"
  '' +
  (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
  '' +
  (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
  '' +
  (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
  '' +
  (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return datetime
}

export function debounce (func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 验证字符串是否含有特殊字符，包括空格
export function hasSpecailchar (str) {
  let regEn = /[`~!@#$%^&*()_+<>?:"{},./;'\s[\]]/im
  let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】\s[\]]/im

  if (regEn.test(str) || regCn.test(str)) {
    return true
  }
  return false
}

export function loacalStorage (key, val = null) {
  if (val === null) {
    return JSON.parse(localStorage.getItem(key) || '[]')
  } else {
    localStorage.setItem(key, JSON.stringify(val))
  }
}
