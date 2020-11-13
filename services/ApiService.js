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
  // =================
  // party api
  // =================
  getParties(offset = 0, limit = 100) {
    return apiClient.get('/parties/', {
      params: { offset, limit, active_only: true },
    })
  },
  getPartyTokenBalance(partyUid) {
    const tokenId = 0
    return apiClient.get(`/parties/${partyUid}/token-balance/${tokenId}/`)
  },
  // =================
  // catalog api
  // =================
  getCatalogs(sellerUid, offset = 0, limit = 20) {
    return apiClient.get(`/catalogs/`, {
      params: { seller_uid: sellerUid, offset, limit },
    })
  },
  // =================
  // catalog item api
  // =================
  getCatalogItems(catalogUid, offset = 0, limit = 100) {
    return apiClient.get(`/catalog-items/`, {
      params: { catalog_uid: catalogUid, offset, limit },
    })
  },
  // =================
  // order api
  // =================
  getOrders(offset = 0, limit = 20) {
    return apiClient.get('/orders/', {
      params: { offset, limit, active_parties_only: true },
    })
  },
  getOrder(uid) {
    return apiClient.get(`/orders/${uid}/`)
  },
  createRandomOrder() {
    return apiClient.post('/orders/random/')
  },
  getOrderItems(orderUid) {
    return apiClient.get(`/order-items/`, { params: { order_uid: orderUid } })
  },
  // =================
  // invoice api
  // =================
  getInvoices(orderUid) {
    return apiClient.get(`/invoices/`, { params: { order_uid: orderUid } })
  },
  createInvoice(orderUid) {
    return apiClient.post(`/invoices/`, { order_uid: orderUid })
  },
  publishInvoice(invoiceUid) {
    return apiClient.post(`/invoices/${invoiceUid}/publish/`)
  },
  cancelInvoice(invoiceUid) {
    return apiClient.post(`/invoices/${invoiceUid}/cancel/`)
  },
  getInvoiceBlockchainState(invoiceUid) {
    return apiClient.get(`/invoices/${invoiceUid}/blockchain-state/`)
  },
  // =================
  // payment api
  // =================
  createPayment(invoiceUid, amount) {
    return apiClient.post(`/payments/`, {
      invoice_uid: invoiceUid,
      amount,
    })
  },
  getPayments(invoiceUid) {
    return apiClient.get(`/payments/`, { params: { invoice_uid: invoiceUid } })
  },
}
