import request from 'common/js/request'
import { commonParams } from './config'

export function getNewsList (channelId, page = 1, size = 20) {
  const url = 'http://route.showapi.com/109-35'
  let data = Object.assign({}, commonParams, {
    'page': page,
    'needContent': '0',
    'needHtml': '0',
    'needAllList': '0',
    'maxResult': size,
    'channelId': channelId
  })
  return request(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getChannelList (page = 1, size = 20) {
  const url = 'http://route.showapi.com/109-34'
  let data = commonParams
  return request(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
