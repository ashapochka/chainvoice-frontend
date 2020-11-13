import ApiService from '@/services/ApiService'
import utils from '@/services/utils'

export const state = () => ({
  orderItems: [],
})

// noinspection JSUnusedGlobalSymbols
export const mutations = {
  SET_ORDER_ITEMS(state, orderItems) {
    state.orderItems = orderItems
  },
}

export const actions = {
  async fetchMany({ commit, dispatch }, orderUid) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      const response = await ApiService.getOrderItems(orderUid)
      commit('SET_ORDER_ITEMS', response.data)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
}
