import qs from 'qs'

class ApiClient {
  constructor(ax) {
    this.ax = ax
  }

  setAccessToken(accessToken) {
    if (accessToken === null) {
      delete this.ax.defaults.headers.common.Authorization
    } else {
      this.ax.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }
  }

  async login(username, password) {
    const formData = qs.stringify({
      grant_type: 'password',
      username,
      password,
    })
    const response = await this.ax.post('/login/access-token/', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    // noinspection JSUnresolvedVariable
    const accessToken = response.data.access_token
    this.ax.setAccessToken(accessToken)
    return accessToken
  }

  logout() {
    this.ax.setAccessToken(null)
  }

  getCurrentUser() {
    return this.ax.get('/login/me/')
  }

  // =================
  // party api
  // =================
  getParties(offset = 0, limit = 100) {
    return this.ax.get('/parties/', {
      params: { offset, limit, active_only: true },
    })
  }

  getPartyTokenBalance(partyUid) {
    const tokenId = 0
    return this.ax.get(`/parties/${partyUid}/token-balance/${tokenId}/`)
  }

  // =================
  // catalog api
  // =================
  getCatalogs(sellerUid, offset = 0, limit = 20) {
    return this.ax.get(`/catalogs/`, {
      params: { seller_uid: sellerUid, offset, limit },
    })
  }

  // =================
  // catalog item api
  // =================
  getCatalogItems(catalogUid, offset = 0, limit = 100) {
    return this.ax.get(`/catalog-items/`, {
      params: { catalog_uid: catalogUid, offset, limit },
    })
  }

  // =================
  // order api
  // =================
  getOrders(offset = 0, limit = 20) {
    return this.ax.get('/orders/', {
      params: { offset, limit, active_parties_only: true },
    })
  }

  getOrder(uid) {
    return this.ax.get(`/orders/${uid}/`)
  }

  createRandomOrder() {
    return this.ax.post('/orders/random/')
  }

  getOrderItems(orderUid) {
    return this.ax.get(`/order-items/`, { params: { order_uid: orderUid } })
  }

  // =================
  // invoice api
  // =================
  getInvoices(orderUid) {
    return this.ax.get(`/invoices/`, { params: { order_uid: orderUid } })
  }

  createInvoice(orderUid) {
    return this.ax.post(`/invoices/`, { order_uid: orderUid })
  }

  publishInvoice(invoiceUid) {
    return this.ax.post(`/invoices/${invoiceUid}/publish/`)
  }

  cancelInvoice(invoiceUid) {
    return this.ax.post(`/invoices/${invoiceUid}/cancel/`)
  }

  getInvoiceBlockchainState(invoiceUid) {
    return this.ax.get(`/invoices/${invoiceUid}/blockchain-state/`)
  }

  // =================
  // payment api
  // =================
  createPayment(invoiceUid, amount) {
    return this.ax.post(`/payments/`, {
      invoice_uid: invoiceUid,
      amount,
    })
  }

  getPayments(invoiceUid) {
    return this.ax.get(`/payments/`, {
      params: { invoice_uid: invoiceUid },
    })
  }
}

export { ApiClient }
