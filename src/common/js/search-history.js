import { loacalStorage } from 'common/js/utils'

const STORAGE_KEY = 'searchHistory'

export function setSearchHistory (val) {
  let oldVals = loacalStorage(STORAGE_KEY)
  if (!oldVals.length) {
    oldVals.push(val)
  } else if (oldVals.length >= 15) {
    oldVals.unshift(val)
    oldVals.pop()
  } else {
    let index = oldVals.indexOf(val)
    if (index !== -1) {
      oldVals.splice(index, 1)
    }
    oldVals.unshift(val)
  }

  loacalStorage(STORAGE_KEY, oldVals)
}

export function deleteSearchHistory (val) {
  let oldVals = loacalStorage(STORAGE_KEY)
  if (!oldVals.length || !val) {
    return
  } else {
    let index = oldVals.indexOf(val)
    if (index !== -1) {
      oldVals.splice(index, 1)
    }
  }

  loacalStorage(STORAGE_KEY, oldVals)
}

export function getSearchHistory () {
  return loacalStorage(STORAGE_KEY)
}

export function clearSearchHistory () {
  loacalStorage(STORAGE_KEY, [])
}
