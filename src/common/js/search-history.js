import { loacalStorage } from 'common/js/utils'

const STORAGE_KEY = 'searchHistory'

export function setSearchHistory (val) {
  let oldVals = loacalStorage(STORAGE_KEY)
  if (!oldVals.length) {
    oldVals.push(val)
  } else {
    let index = oldVals.indexOf(val)
    if (index !== -1) {
      oldVals.splice(index, 1)
    }
    oldVals.unshift(val)
  }

  loacalStorage(STORAGE_KEY, oldVals)
}

export function getSearchHistory () {
  return loacalStorage(STORAGE_KEY)
}

export function clearSearchHistory () {
  loacalStorage(STORAGE_KEY, [])
}
