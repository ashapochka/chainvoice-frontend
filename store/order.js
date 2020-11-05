import ApiService from '@/services/ApiService'
import utils from '@/services/utils'

export const state = () => ({
  orders: [],
})

// noinspection JSUnusedGlobalSymbols
export const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders
  },
  ADD_ORDER(state, order) {
    state.orders.unshift(order)
  },
}

export const actions = {
  async fetchMany({ commit, dispatch }) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      const response = await ApiService.getOrders()
      commit('SET_ORDERS', response.data)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
  async createRandom({ commit, dispatch }) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      const response = await ApiService.createRandomOrder()
      commit('ADD_ORDER', response.data)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
}
