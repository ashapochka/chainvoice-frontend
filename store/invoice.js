import ApiService from '@/services/ApiService'
import utils from '@/services/utils'

export const state = () => ({
  invoices: [],
})

// noinspection JSUnusedGlobalSymbols
export const mutations = {
  SET_INVOICES(state, invoices) {
    state.invoices = invoices
  },
}

export const actions = {
  async fetchMany({ commit, dispatch }, orderUid) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      const response = await ApiService.getInvoices(orderUid)
      const invoices = response.data
      invoices.sort((a, b) => {
        if (a.state !== 'CANCELED') return -1
        else if (b.state !== 'CANCELED') return 1
        else return 0
      })
      const promises = invoices.map(async (invoice) => {
        return {
          invoice,
          response: await ApiService.getInvoiceBlockchainState(invoice.uid),
        }
      })
      const results = await Promise.all(promises)
      for (const result of results) {
        // TODO: handle error responses
        result.invoice.blockchainState = result.response.data
      }
      commit('SET_INVOICES', invoices)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
  async create({ commit, dispatch }, orderUid) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      await ApiService.createInvoice(orderUid)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
  async publish({ commit, dispatch }, invoice) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      await ApiService.publishInvoice(invoice.uid)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
  async cancel({ commit, dispatch }, invoice) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      await ApiService.cancelInvoice(invoice.uid)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
}
