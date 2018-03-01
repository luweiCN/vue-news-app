import axios from 'axios'

export default function request (url, data, methods = 'GET') {
  if (methods === 'GET' || methods === 'get') {
<<<<<<< HEAD
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
=======
    return axios.get(url, {params: data})
  }
  if (methods === 'POST' || methods === 'post') {
    return axios.post(url, {params: data})
>>>>>>> 6bafb0857e6f30ee3ed703cea3bfd42eaac20dcf
  }
}
