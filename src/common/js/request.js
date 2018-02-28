import axios from 'axios'

export default function request (url, data, methods = 'GET') {
  if (methods === 'GET' || methods === 'get') {
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: data
    })
  }
  if (methods === 'POST' || methods === 'post') {
    return axios.post(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: data
    })
  }
}
