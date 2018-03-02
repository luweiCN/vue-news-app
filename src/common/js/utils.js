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
