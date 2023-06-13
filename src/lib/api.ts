import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('authUser')

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

if (token) {
  api.defaults.headers.authorization = `Bearer ${token}`
}

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const errorMsg = error.response.data.Errors
    const status = error.response.status

    if (status === 402 && errorMsg === 'Invalid token') {
      Cookies.remove('authUser')
      window.location.href = `http://localhost:3000/login`
    }

    return Promise.reject(error)
  },
)
