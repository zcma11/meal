import axios from 'axios'

export default function ajax (url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    axios.defaults.baseURL = '/api'
    if (type === 'GET') {
      let query = url + '?'
      Object.keys(data).forEach(item => {
        query += `${item}=${data[item]}&`
      })
      url = query.slice(1, -1)
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise.then(response => {
      resolve(response.data)
    }, error => {
      reject(error)
    })
  })
}
