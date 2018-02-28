import { formatterDateTime } from 'common/js/utils'
export const commonParams = {
  showapi_timestamp: formatterDateTime(),
  showapi_appid: 57625,
  showapi_sign: 'fc5502f27730447c8edb42aa9d94ffa5'
}

export const options = {
  param: 'jsonpCallback',
  prefix: 'jp'
}

export const ERR_OK = 0
