import jsonp from 'common/js/jsonp'
import { jisuParams, jisuOptions, showapiParams } from './config'
import request from 'common/js/request'

export function getNewsList (channel, page = 1, size = 20) {
  const url = 'http://api.jisuapi.com/news/get'
  let data = Object.assign({}, jisuParams, {
    'start': (page - 1) * size,
    'num': size,
    'channel': channel
  })
  return jsonp(url, data, jisuOptions)
}

export function getChannelList () {
  const url = 'http://api.jisuapi.com/news/channel'
  let data = jisuParams
  return jsonp(url, data, jisuOptions)
}

export function getHot () {
  const url = 'http://route.showapi.com/109-35'
  let data = Object.assign({}, showapiParams, {
    channelId: '5572a10bb3cdc86cf39001f8',
    page: 1,
    maxResult: 100
  })

  return request(url, data)
}

export function searchNews (key) {
  const url = 'http://api.jisuapi.com/news/search'
  let data = Object.assign({}, jisuParams, {
    keyword: key
  })
  return jsonp(url, data, jisuOptions)
}
