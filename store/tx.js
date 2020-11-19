import utils from '@/services/utils'

export const state = () => ({
  transactions: [],
})

// noinspection JSUnusedGlobalSymbols
export const mutations = {
  SET_TRANSACTIONS(state, transactions) {
    state.transactions = transactions
  },
}

export const actions = {
  async fetchMany({ commit, dispatch }) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      const response = await this.$api.getTransactionsPaid()
      commit('SET_TRANSACTIONS', response.data)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
}

// export const getters = {
//   getParty: (state) => (uid) => {
//     return state.parties.find((party) => party && party.uid === uid)
//   },
// }
