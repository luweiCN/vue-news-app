export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function removeClass (el, className) {
  if (!hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  let t = newClass.indexOf(className)
  if (t !== -1) {
    newClass.splice(t, 1)
    el.className = newClass.join(' ')
  }
}
