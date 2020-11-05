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
  setAccessToken(accessToken) {
    if (accessToken === null) {
      delete apiClient.defaults.headers.common.Authorization
    } else {
      apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }
  },
  async login(username, password) {
    const formData = qs.stringify({
      grant_type: 'password',
      username,
      password,
    })
    const response = await apiClient.post('/login/access-token/', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    // noinspection JSUnresolvedVariable
    const accessToken = response.data.access_token
    this.setAccessToken(accessToken)
    return accessToken
  },
  logout() {
    this.setAccessToken(null)
  },
  getCurrentUser() {
    return apiClient.get('/login/me/')
  },
  getOrders(offset = 0, limit = 20) {
    return apiClient.get('/orders/', { params: { offset, limit } })
  },
  createRandomOrder() {
    return apiClient.post('/orders/random/')
  },
  getParties(offset = 0, limit = 100) {
    return apiClient.get('/parties/', { params: { offset, limit } })
  },
}
