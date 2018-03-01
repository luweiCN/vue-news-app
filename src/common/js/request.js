import axios from 'axios'

export default function request (url, data, methods = 'GET') {
  if (methods === 'GET' || methods === 'get') {
    return axios.get(url, {params: data})
  }
  if (methods === 'POST' || methods === 'post') {
    return axios.post(url, {params: data})
  }
}
