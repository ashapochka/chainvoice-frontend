import ApiService from '@/services/ApiService'
import utils from '@/services/utils'

export const state = () => ({
  parties: [],
})

// noinspection JSUnusedGlobalSymbols
export const mutations = {
  SET_PARTIES(state, parties) {
    state.parties = parties
  },
}

export const actions = {
  async fetchMany({ commit, dispatch }) {
    try {
      const response = await ApiService.getParties()
      commit('SET_PARTIES', response.data)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
}
