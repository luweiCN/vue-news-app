<<<<<<< HEAD
// import { formatterDateTime } from 'common/js/utils'

export const commonParams = {
  appkey: '84e054dc47dd7894'
}

export const options = {
  callback: 'jsonpCallback',
=======
import { formatterDateTime } from 'common/js/utils'
export const commonParams = {
  showapi_timestamp: formatterDateTime(),
  showapi_appid: 57625,
  showapi_sign: 'fc5502f27730447c8edb42aa9d94ffa5'
}

export const options = {
  param: 'jsonpCallback',
>>>>>>> 6bafb0857e6f30ee3ed703cea3bfd42eaac20dcf
  prefix: 'jp'
}

export const ERR_OK = 0
