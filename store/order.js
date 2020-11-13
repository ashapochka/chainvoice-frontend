import utils from '@/services/utils'

export const state = () => ({
  orders: [],
  currentOrder: {},
})

// noinspection JSUnusedGlobalSymbols
export const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders
  },
  ADD_ORDER(state, order) {
    state.orders.unshift(order)
  },
  SET_CURRENT_ORDER(state, order) {
    state.currentOrder = order
  },
}

export const actions = {
  async fetchMany({ commit, dispatch }) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      const response = await this.$api.getOrders()
      commit('SET_ORDERS', response.data)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
  async fetchOne({ commit, dispatch }, orderUid) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      const response = await this.$api.getOrder(orderUid)
      commit('SET_CURRENT_ORDER', response.data)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
  async createRandom({ commit, dispatch }) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      const response = await this.$api.createRandomOrder()
      commit('ADD_ORDER', response.data)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
}
