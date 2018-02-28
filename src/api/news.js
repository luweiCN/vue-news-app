import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getNewsList (channel, page = 1, size = 20) {
  const url = 'http://api.jisuapi.com/news/get'
  let data = Object.assign({}, commonParams, {
    'start': (page - 1) * size,
    'num': size,
    'channel': channel
  })
  return jsonp(url, data, options)
}

export function getChannelList () {
  const url = 'http://api.jisuapi.com/news/channel'
  let data = commonParams
  return jsonp(url, data, options)
}
