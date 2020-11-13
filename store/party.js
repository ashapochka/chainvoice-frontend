import utils from '@/services/utils'

export const state = () => ({
  parties: [],
})

// noinspection JSUnusedGlobalSymbols
export const mutations = {
  SET_PARTIES(state, parties) {
    state.parties = parties
  },
  UPDATE_PARTIES(state, parties) {
    for (const newParty of parties) {
      const index = state.parties.findIndex(
        (party) => party && party.uid === newParty.uid
      )
      if (index < 0) {
        state.parties.push(newParty)
      } else {
        Object.assign(state.parties[index], newParty)
      }
    }
  },
}

export const actions = {
  async fetchMany({ commit, dispatch }) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      const response = await this.$api.getParties()
      commit('UPDATE_PARTIES', response.data)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
  async fetchTokenBalances({ commit, dispatch }, partyUids) {
    try {
      const promises = partyUids.map(async (uid) => {
        return await this.$api.getPartyTokenBalance(uid)
      })
      const results = await Promise.all(promises)
      const balances = results.map((response) => response.data)
      commit('UPDATE_PARTIES', balances)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
}

export const getters = {
  getParty: (state) => (uid) => {
    return state.parties.find((party) => party && party.uid === uid)
  },
}
