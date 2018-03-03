import { formatterDateTime } from 'common/js/utils'
import md5 from 'js-md5'

export const jisuParams = {
  appkey: '84e054dc47dd7894'
}

export const jisuOptions = {
  callback: 'jsonpCallback',
  prefix: 'jp'
}

let accessKey = 'Awuc3kejL3yPYokb'
let secretKey = 'ffd06ba0a0b14fddb063833202be03dc'
let timestamp = formatterDateTime()
export const shuwenParams = {
  'access_key': accessKey,
  'timestamp': timestamp,
  'signature': md5(secretKey + timestamp + accessKey)
}

export const toutiaoParams = {
  format: 'json_raw',
  as: 'A125A8CEDCF8987',
  cp: '58EC18F948F79E1',
  ac: 'wap',
  min_behot_time: '1520046267',
  jsonpCallback: 'jsonpCallback'
}

export const showapiParams = {
  showapi_appid: '57625',
  showapi_sign: 'fc5502f27730447c8edb42aa9d94ffa5',
  showapi_timestamp: timestamp
}

export const ERR_OK = 0
