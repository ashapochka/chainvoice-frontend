import axios from 'axios'
import qs from 'qs'

const apiClient = axios.create({
  baseURL: `http://localhost:8000/api`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  async login(username, password) {
    const formData = qs.stringify({
      grant_type: 'password',
      username,
      password,
    })
    try {
      const response = await apiClient.post('/login/access-token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      apiClient.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`
    } catch (error) {
      console.error(
        `error status: ${error.response.status}, data: ${error.response.data.detail}`
      )
    }
  },
  getOrders() {
    return apiClient.get('/orders/')
  },
}
