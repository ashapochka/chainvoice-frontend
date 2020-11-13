import utils from '@/services/utils'

export const state = () => ({
  payments: [],
})

// noinspection JSUnusedGlobalSymbols
export const mutations = {
  UPDATE_PAYMENTS(state, payments) {
    for (const newPayment of payments) {
      const index = state.payments.findIndex(
        (payment) => payment && payment.uid === newPayment.uid
      )
      if (index < 0) {
        state.payments.push(newPayment)
      } else {
        Object.assign(state.payments[index], newPayment)
      }
    }
  },
}

export const actions = {
  async fetchMany({ commit, dispatch }, invoiceUid) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      const response = await this.$api.getPayments(invoiceUid)
      commit('UPDATE_PAYMENTS', response.data)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
  async create({ commit, dispatch }, { invoiceUid, amount }) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      const response = await this.$api.createPayment(invoiceUid, amount)
      commit('UPDATE_PAYMENTS', [response.data])
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
}

export const getters = {
  getPaymentForInvoice: (state) => (invoiceUid) => {
    return state.payments.find(
      (payment) => payment && payment.invoice_uid === invoiceUid
    )
  },
}
